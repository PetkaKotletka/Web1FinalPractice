import { NextResponse } from "next/server"
import { readFileSync } from 'fs'

export async function GET(request, {params}) {
    const { merchantId } = params

    const fileContent = readFileSync("data/merchants.txt")
    const merchants = JSON.parse(fileContent)
    const merchant = merchants.find(
        (m) => m.id === merchantId
    )

    return NextResponse.json(merchant)
}