import { NextResponse } from 'next/server'
import { client, queries } from '@/lib/sanity'
import { getOffresLancementActives } from '@/lib/offres-lancement'

export async function GET() {
  try {
    const offres = await client.fetch(queries.offresActives)
    const lancement = getOffresLancementActives()
    const hasOffres = (offres && offres.length > 0) || lancement.length > 0
    return NextResponse.json({ hasOffres })
  } catch {
    const lancement = getOffresLancementActives()
    return NextResponse.json({ hasOffres: lancement.length > 0 })
  }
}
