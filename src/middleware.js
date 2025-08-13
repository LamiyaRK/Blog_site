import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"

export const middleware =async(req) => {

   /* const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
        secureCookie: process.env.NODE_ENV === "production" ? true : false,
    })*/
      const token=await getToken({req})
    if (token) {

        return NextResponse.next()
    } else {
        return NextResponse.redirect(new URL('/login', req.url))
    }
return NextResponse.next()
}

export const config = {
    matcher: [
       '/myBlogs',
        '/myBlogs/:path*',
        '/addBlogs',
        '/updateBlogs',
        '/updateBlogs/:path*',

        
    ],
}