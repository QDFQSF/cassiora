import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { adresse } = await request.json()

  const origin = 'Saint-Paul-de-Loubressac, 46170, France'
  const key = process.env.GOOGLE_MAPS_API_KEY

  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(adresse)}&key=${key}&units=metric`

  const res = await fetch(url)
  const data = await res.json()

  const distanceMetres = data.rows?.[0]?.elements?.[0]?.distance?.value
  const distanceKm = distanceMetres ? Math.round(distanceMetres / 1000) : null

  return NextResponse.json({ distanceKm })
}
