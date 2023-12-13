import { NextResponse } from 'next/server'
import { readFileSync } from 'fs';

export async function POST(request) {
    const data = await request.json()
    try{
        const users = JSON.parse(readFileSync("data/commerces.txt"))
        const user = users.filter(user => user.username == data.username && user.password == data.password)
        if (user.length > 0) {
            return NextResponse.json({message: "User exists...", status: 200})
        } else {
            return NextResponse.json({message: "User does not exist...", status: 400})
        }
    } catch(e){  
        return NextResponse.json({message: "User does not exist...", status: 400})
    }
}