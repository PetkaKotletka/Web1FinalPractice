import { NextResponse } from 'next/server';
import { readFileSync, writeFileSync } from 'fs';

export async function GET() {
    try {
        const fileContent = readFileSync("data/merchants.txt");
        if (fileContent.length == 0) {
            return NextResponse.json([])
        }
        const merchants = JSON.parse(fileContent);
        return NextResponse.json(merchants);
    } catch (e) {
        return NextResponse.json({
            message: 'Error optaining merchants',
            status: 500 
        });
    }
}

export async function POST(request) {
    const data = await request.json()
    try {
        const fileContent = readFileSync("data/merchants.txt")
        if (fileContent.length == 0) {
            writeFileSync('data/merchants.txt', JSON.stringify([data]))
            return NextResponse.json({
                message: 'Creating a new merchant',
                status: 200
            })
        }
        const merchants = JSON.parse(fileContent)
        writeFileSync('data/merchants.txt', JSON.stringify([...merchants, data]))
        return NextResponse.json({
            message: 'Creating a new umerchant',
            status: 200
        })
    } catch (e) {
        return NextResponse.json({
            message: 'Error creating a new merchant',
            status: 500
        })
    }
}

export async function PUT(request) {
    const data = await request.json()
    try {
        const merchants = JSON.parse(readFileSync('data/merchants.txt'))
        const updatedMerchants = merchants.map((merchant) =>
            merchant.id === data.id ? { ...merchant, ...data } : merchant
        )
        writeFileSync('data/merchants.txt', JSON.stringify(updatedMerchants))
        return NextResponse.json({
            message: 'Updating the merchant',
            status: 200
        })
    } catch (e) {
        return NextResponse.json({
            message: 'Error updating the merchant',
            status: 500
        })
    }
}

export async function DELETE(request) {
    const data = await request.json()
    try {
        const merchants = JSON.parse(readFileSync('data/merchants.txt'))
        const updatedMerchants = merchants.filter((merchant) => merchant.id !== data.id)
        writeFileSync('data/merchants.txt', JSON.stringify(updatedMerchants))
        return NextResponse.json({
            message: 'Deleting the merchant',
            status: 200
        })
    } catch (e) {
        return NextResponse.json({
            message: 'Error deleting the merchant',
            status: 500
        })
    }
}