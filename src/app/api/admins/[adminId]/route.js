import { NextResponse } from "next/server";
import { readFileSync } from 'fs';

export async function GET(request, {params}) {
    const { adminId } = params;

    const fileContent = readFileSync("data/admins.txt");
    const admins = JSON.parse(fileContent);
    const admin = admins.find(
        (a) => a.id === adminId
    );

    return NextResponse.json({
        data: admin
    })
}