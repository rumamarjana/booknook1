import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth } from "./app/lib/auth"
import { headers } from 'next/headers'
 



// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {

const session = await auth.api.getSession({
    headers: await headers() // you need to pass the headers object.
})
   
console.log(session)
 const user =session?.user
 if(!user){
     return NextResponse.redirect(new URL('/register', request.url))
 }
console.log(user)

}

// Alternatively, you can use a default export:
// export default function proxy(request: NextRequest) { ... }

export const config = {
   matcher: [
        "/add-book/:path*",
        "/my-books/:path*",
        "/my-borrows/:path*",
    ],
}