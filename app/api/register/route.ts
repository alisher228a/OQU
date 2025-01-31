import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from '@/app/lib/utils';
import bcrypt from "bcryptjs";
import { Users } from "@/app/lib/models";
import { writeFile } from "fs/promises";
import { join } from "path";
import { sendEmail } from "@/utils/sendEmail";
import crypto from "crypto";
import { verificationEmailTemplate } from "@/utils/verificationEmailTemplate";

export async function POST(request: NextRequest) {
    try {
        const data = await request.formData();
        const img: File | null = data.get('file') as unknown as File;
        const name = data.get('name');
        const surname = data.get('surname');
        const email = data.get('email');
        const password = data.get('password');
        

        if (!name || !email || !password) {
            return NextResponse.json({ message: "All fields are required" }, { status: 400 });
        }

        if (!img) {
            return NextResponse.json({ message: "Image file is required" }, { status: 400 });
        }

        const bytes = await img.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Save image in the 'public/uploads' directory
        const uploadPath = join(process.cwd(), 'public/avatars', img.name);
        await writeFile(uploadPath, buffer);

        // Store the relative path in the database
        const imagePath = `/avatars/${img.name}`;

        const hashedPassword = await bcrypt.hash(password, 10);
        
        await connectToDB();

        const newUser = await Users.create({
            name,
            surname,
            email,
            password: hashedPassword, 
            image: imagePath,       
        });

        newUser.getVerificationToken = function () {
            const verificationToken = crypto.randomBytes(20).toString('hex');
        
            this.verifyToken = crypto
                .createHash("sha256")
                .update(verificationToken)
                .digest("hex");
        
            this.verifyTokenExpire = new Date(Date.now() + 30 * 60 * 1000);
        
            return verificationToken;
        };
        
        const verificationToken = newUser.getVerificationToken();

        await newUser.save();

        const verificationLink = `${process.env.NEXT_PUBLIC_URL}/verify-email?verifyToken=${verificationToken}&id=${newUser?._id}`;
        const message = verificationEmailTemplate(verificationLink);

        await sendEmail(newUser.email, "Email Verification", message)

        return NextResponse.json({ message: "User registered successfully" }, { status: 201 });

    } catch (error) {
        console.error("Error during user registration:", error);
        return NextResponse.json({ message: "Error occurred while registering the user", error: error.message }, { status: 500 });
    }
}
