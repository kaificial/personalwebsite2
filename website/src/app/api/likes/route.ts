import { kv } from "@vercel/kv";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const count = await kv.get<number>("love-count") || 0;
        return NextResponse.json({ count });
    } catch (error) {
        console.error("Failed to fetch count:", error);
        return NextResponse.json({ count: 0 }, { status: 500 });
    }
}

export async function POST() {
    try {
        const count = await kv.incr("love-count");
        return NextResponse.json({ count });
    } catch (error) {
        console.error("Failed to increment count:", error);
        return NextResponse.json({ error: "Failed to update count" }, { status: 500 });
    }
}
