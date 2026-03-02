import { NextResponse } from 'next/server'
import { client, queries } from '@/lib/sanity'

export async function GET() {
  try {
    const offres = await client.fetch(queries.offresActives)
    return NextResponse.json({ hasOffres: offres && offres.length > 0 })
  } catch {
    return NextResponse.json({ hasOffres: false })
  }
}
