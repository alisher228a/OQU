import { NextResponse } from "next/server";
import { connectToDB } from '@/app/lib/utils';
import { Users } from "@/app/lib/models";

export async function POST(req) {
    try{
        const {name, surname, email, password, base64} = await req.json();
        await connectToDB();
        await Users.create({ name, surname, email, password:hashedPassword, image:base64 });
        req.send({Status:"ok"})

        return NextResponse.json({message:"User registered"}, {status: 201});
    } catch(error) {
        return NextResponse.json({message:"Error occured while registering the user"}, {status: 500})
    }
}