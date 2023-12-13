import { NextResponse } from 'next/server'
import { readFileSync, writeFileSync } from 'fs';

export async function POST(request) {
    const data = await request.json()
    try{
        const fileContent = readFileSync("data/admins.txt");
        const admins = JSON.parse(fileContent)
        const admin = admins.find(
            (a) => a.username == data.username && a.password == data.password
        );
        if (admin) {
            return NextResponse.json({
                exists: true,
                adminId: admin.id,
                status: 200
            })
        } else {
            return NextResponse.json({
                message: "This admin does not exist", 
                exists: false, 
                status: 400
            })
        }
    } catch(e){
        return NextResponse.json({
            message: "Error checking admin existence", 
            status: 500
        })
    }
}