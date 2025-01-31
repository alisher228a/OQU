import { Users } from "@/app/lib/models";
import crypto from "crypto";
import { NextResponse } from "next/server";
import { connectToDB } from "@/app/lib/utils";

export async function GET(request: Request){
    try {
        await connectToDB();

        const {searchParams} = new URL(request.url);
        const verificationToken = searchParams.get("verifyToken") as string;
        const userId = searchParams.get("id");

        const verifyToken = crypto
                .createHash("sha256")
                .update(verificationToken)
                .digest("hex");

        const user = await Users.findOne({
            _id: userId,
            verifyToken,
            verifyTokenExpire: {$gt: new Date()},
        });


        if (!user) {
            return NextResponse.json(
                {message: "Invalid or expired token"},
                {status: 400}
            );
        }

        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpire = undefined;

        await user.save();

        return NextResponse.json(
            {verified: true},
            {status: 200},
        )

    } catch (error) {
        return NextResponse.json(
            {message: "Something went wrong" + error},
            {status: 500}
        )
    }
}