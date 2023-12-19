import { NextResponse } from 'next/server'
import { readFileSync, writeFileSync } from 'fs';

export async function POST(request) {
    const data = await request.json()
    try{
        const fileContent = readFileSync("data/merchants.txt");

        if (fileContent.length == 0) {
            return NextResponse.json({
                message: "This merchant doesn't exists", 
                exists: false, 
                status: 400
            })
        }

        const merchants = JSON.parse(fileContent)
        const merchant = merchants.find(
            (a) => a.name == data.username && a.password == data.password
        );
        if (merchant) {
            return NextResponse.json({
                exists: true,
                merchantId: merchant.id,
                status: 200
            })
        } else {
            return NextResponse.json({
                message: "This merchant does not exist", 
                exists: false, 
                status: 400
            })
        }
    } catch(e){
        return NextResponse.json({
            message: "Error checking merchant existence",
            status: 500
        })
    }
}