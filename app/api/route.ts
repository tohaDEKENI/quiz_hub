import { NextResponse } from "next/server"


export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const avec = searchParams.get('avec');
    const meme = searchParams.get('meme');
    const lui = searchParams.get("lui");
    return NextResponse.json({ avec, meme ,lui})
}