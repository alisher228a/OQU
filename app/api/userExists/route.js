import { connectToDB } from '@/app/lib/utils';
import { NextResponse } from "next/server";
import { Users } from "@/app/lib/models";

export async function POST(req) {
    try {
        await connectToDB();
        const {email} = await req.json();
        const user = await Users.findOne({email}).select("_id");
        console.log("user: ", user);
        return NextResponse.json({user});
    } catch (error) {
        console.log(error);
    }
}