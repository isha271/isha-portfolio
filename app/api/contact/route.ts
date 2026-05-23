import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Contact } from "@/lib/models/Contact";
export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();
    if (!name || !email || !message) return NextResponse.json({ error: "All fields required." }, { status: 400 });
    const db = await connectDB();
    if (db) await Contact.create({ name, email, message });
    else console.log("Contact:", { name, email, message });
    return NextResponse.json({ success: true });
  } catch (e) { console.error(e); return NextResponse.json({ error: "Server error." }, { status: 500 }); }
}
