import type { NextAuthConfig } from "next-auth";
import GitHub from "next-auth/providers/github";

export const authConfig = { 
    providers: [GitHub], 
    callbacks: {
    authorized({auth,request:{nextUrl} }){
        const isLoggedIn = !!auth?.user;
        const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
        if(isOnDashboard){
            return isLoggedIn;
        }else{
            return true
        }
    }}   
} satisfies NextAuthConfig

