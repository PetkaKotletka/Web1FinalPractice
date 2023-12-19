import { NextResponse } from 'next/server';
import { readFileSync, writeFileSync } from 'fs';

export async function GET() {
    try {
        const fileContent = readFileSync("data/reviews.txt");
        if (fileContent.length == 0) {
            return NextResponse.json([])
        }
        const reviews = JSON.parse(fileContent);
        return NextResponse.json(reviews);
    } catch (e) {
        return NextResponse.json({
            message: 'Error optaining reviews',
            status: 500 
        });
    }
}

export async function POST(request) {
    const data = await request.json();
    try {
        const fileContent = readFileSync("data/reviews.txt");
        if (fileContent.length == 0) {
            writeFileSync('data/reviews.txt', JSON.stringify([data]));
            return NextResponse.json({
                message: 'Creating a new review...',
                status: 200
            })
        }
        const reviews = JSON.parse(fileContent);
        writeFileSync('data/reviews.txt', JSON.stringify([...reviews, data]));
        return NextResponse.json({
            message: 'Creating a new review...',
            status: 200
        });
    } catch (e) {
        return NextResponse.json({
            message: 'Error creating a new review',
            status: 500,
        });
    }
}