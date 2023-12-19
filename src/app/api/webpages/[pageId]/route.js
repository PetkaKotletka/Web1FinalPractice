import { NextResponse } from "next/server";
import { readFileSync } from 'fs';

export async function GET(request, {params}) {
    const { pageId } = params;

    const fileContent = readFileSync("data/pages.txt");
    const pages = JSON.parse(fileContent);
    const page = pages.find(
        (p) => p.id === pageId
    );

    return NextResponse.json(page)
}