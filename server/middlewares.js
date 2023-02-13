import jwt from 'jsonwebtoken'

export function myLogger(req, res, next) {
  console.log('LOGGED')
  next()
}

export async function authValidator(req, res, next) {
  try {
    const token = req.cookies.access_token
    const userInfo = await jwt.verify(token, 'jwtkey')
    req.state = userInfo
  } catch {
    throw new Error('Invalid cookies')
  }
  next();
}

export async function cookieValidator(cookies) {
  try {
    console.log('validate cookie middle')
    // await externallyValidateCookie(cookies.testCookie)
    await new Promise(resolve => resolve())
  } catch {
    throw new Error('Invalid cookies')
  }
}

export async function validateCookies(req, res, next) {
  await cookieValidator(req.cookies)
  next()
}
