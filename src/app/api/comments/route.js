import {Comment} from '@/utils/models/Schema'
import dbConnect from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
    await dbConnect();
    try {
        const comments = await Comment.find({});
        return NextResponse.json({ data: comments });
    } catch (error) {
        console.error("GET Error:", error);
        return NextResponse.status(500).json({ error: error.message });
    }
}

export async function POST(request) {
    try {
        const body = await request.json();
        const { firstName,lastName,message, email } = body;
        await dbConnect();
        const comment = await Comment.create({ firstName,lastName,message, email });
        console.log("Saved comment:", comment);
        return NextResponse.json({ data: comment });
    } catch (error) {
        console.error("POST Error:", error);
        return NextResponse.status(500).json({ error: error.message });
    }
}