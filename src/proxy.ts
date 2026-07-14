import {NextResponse, type NextRequest} from "next/server"

export default function proxy (request: NextRequest){
    if(request.cookies.has("authjs.session-token")){
        return NextResponse.next()
    }
    return NextResponse.redirect(new URL("/api/auth/signin", request.url))

}

export const config = {
    matcher: ["/dashboard/:path*"],
};