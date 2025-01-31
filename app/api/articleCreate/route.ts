import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from '@/app/lib/utils';
import { Posts } from "@/app/lib/models";
import { writeFile } from "fs/promises";
import { join } from "path";

export async function POST(request: NextRequest) {
    try {
        const data = await request.formData();
        const img: File | null = data.get('file') as unknown as File;
        const desc = data.get('desc');
        const explanation = data.get('explanation');
        const unitId = data.get('unitId');
        const userId = data.get('userId');

        if (!img) {
            return NextResponse.json({ message: "Image file is required" }, { status: 400 });
        }

        const bytes = await img.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Save image in the 'public/uploads' directory
        const uploadPath = join(process.cwd(), 'public/posts', img.name);
        await writeFile(uploadPath, buffer);

        // Store the relative path in the database
        const imagePath = `/posts/${img.name}`;

        await connectToDB();
        await Posts.create({ desc, explanation, img: imagePath, unitId, userId });

        return NextResponse.json({ message: "Post created successfully" }, { status: 201 });
    } catch (error) {
        console.error("Error creating post:", error);
        return NextResponse.json({ message: "Error occurred while creating article" }, { status: 500 });
    }
}
