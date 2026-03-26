import { NextResponse } from 'next/server'
import { client, queries } from '@/lib/sanity'
import { getOffresLancementActives } from '@/lib/offres-lancement'

const DEBUT = new Date('2026-03-30T00:00:00')
const FIN = new Date('2026-04-30T23:59:59')

export async function GET() {
  const now = new Date()
  const enPeriode = now >= DEBUT && now <= FIN
  const bientot = now < DEBUT
  try {
    const offres = await client.fetch(queries.offresActives)
    const lancement = getOffresLancementActives()
    const hasOffres = (offres && offres.length > 0) || lancement.length > 0
    return NextResponse.json({ hasOffres, enPeriode, bientot })
  } catch {
    const lancement = getOffresLancementActives()
    return NextResponse.json({ hasOffres: lancement.length > 0, enPeriode, bientot })
  }
}
