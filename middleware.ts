
import NextAuth from "next-auth";
import authConfig from "./auth.config";

import { DEFAULT_LOGIN_REDIRECT,apiRoutePrefix,authRoutes,publicRoutes } from "./route"

const {auth} =NextAuth(authConfig)

export default auth((req) => {
  const {nextUrl} =req
  const isLogedIn = !!req.auth
  // console.log(isLogedIn)

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiRoutePrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if(isApiAuthRoute){
    return 
  }
  if(isAuthRoute){
    if(isLogedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT,nextUrl))
    }
    return 
  }
  if(!isLogedIn && !isPublicRoute){
    let callBackUrl = nextUrl.pathname
    if(nextUrl.search){
      callBackUrl += nextUrl.search
    }
    const encodedCallbackUrl= encodeURIComponent(callBackUrl)
   
    return Response.redirect(new URL(`/auth/login?callbackUrl=${encodedCallbackUrl}`
    ,nextUrl))
  } 

return
  }
  

)

// Optionally, don't invoke Middleware on some paths
// Read more: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],

  }