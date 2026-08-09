import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const origin = request.nextUrl.origin || 'https://winder-enterprise.vercel.app'
  const response = NextResponse.redirect(new URL('/admin/login', origin))
  response.cookies.delete('admin_token')
  return response
}
