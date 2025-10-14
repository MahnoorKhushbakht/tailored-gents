
import dbConnect from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import { setSessionCookie } from '@/lib/auth';
import {  hash } from 'bcrypt';
import { Sign } from '@/utils/models/Schema';
export async function GET() {
    await dbConnect();
    try {
        const sign = await Sign.find({});
        return NextResponse.json({ data: sign });
    } catch (error) {
        console.error("GET Error:", error);
        return NextResponse.status(500).json({ error: error.message });
    }
}

export async function POST(request) {
    try {
        const body = await request.json();
        const { name,email,password } = body;
        
        const passwordHash = await hash(password, 10);
        await setSessionCookie({ name,email})
        await dbConnect();
        const sign = await Sign.create({ name,email,passwordHash});
        console.log("Saved sign:", sign);
        
        return NextResponse.json({ data: sign });
    } catch (error) {
        console.error("POST Error:", error);
        return NextResponse.status(500).json({ error: error.message });
    }
}