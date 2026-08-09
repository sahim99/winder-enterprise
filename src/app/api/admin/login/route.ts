import { NextRequest, NextResponse } from 'next/server'

const VALID_USER_IDS = [
  'admin',
  'winderenterprise.admin@gmail.com',
  'sahim9733@gmail.com',
  'WINDER-ADMIN-01',
]

export async function POST(request: NextRequest) {
  try {
    const { userId, username, password } = await request.json()
    const inputId = (userId || username || '').trim().toLowerCase()
    const adminPassword = process.env.ADMIN_PASSWORD || 'Sahim@7001'

    const isUserValid = VALID_USER_IDS.some(id => id.toLowerCase() === inputId)
    const isPassValid = password === adminPassword

    if (!isUserValid || !isPassValid) {
      return NextResponse.json({ error: 'Invalid User ID or Password' }, { status: 401 })
    }

    const response = NextResponse.json({ success: true })
    response.cookies.set('admin_token', adminPassword, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    })
    return response
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
