import { NextResponse } from "next/server";
import { v4 } from "uuid";


export async function GET(req:Request){
    const id = v4()

    console.log(id)
    return NextResponse.json({message:id})
}