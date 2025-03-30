import { NextResponse } from "next/server";
import { skillCategories } from "@/data/skills";

export async function GET() {
  try {
    return NextResponse.json(skillCategories);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch skills data" },
      { status: 500 }
    );
  }
}
