import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(_request: NextRequest) {
  // if (request.url.includes('/images/')) {
  //   console.log("----------------------------------------------------------")
  //   console.log(request.url)
  //   console.log(request.headers)
  //   console.log("----------------------------------------------------------\n")
  // }

  return NextResponse.next()
}
