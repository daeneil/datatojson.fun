import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"

let storedApiKey: string | null = null

const apiKeySchema = z.object({
  apiKey: z.string().nonempty(),
})

export const POST = async (req: NextRequest) => {
  const body = await req.json()
  const { apiKey } = apiKeySchema.parse(body)

  // Store the API key securely
  storedApiKey = apiKey

  return NextResponse.json({ message: "API key stored successfully" }, { status: 200 })
}
