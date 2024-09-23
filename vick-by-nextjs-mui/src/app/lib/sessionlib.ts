'use server'
// import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { RedirectType, redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function logout() {
    cookies().set("SNBSESSION", "", { maxAge: 0, httpOnly: true, secure: true, sameSite: "none", domain: process.env.DOMAIN });
    redirect("/pages/public/login")
}

export async function isAuthen() {
    const session = await getSession();
    return session != null && !!session.length;
}

export async function getSession() {
    const session = cookies().get("SNBSESSION")?.value;
    return session;
}

export async function updateSession(request: NextRequest) {
    const session = request.cookies.get("SNBSESSION")?.value;
    if (!session) return;

    const res = NextResponse.next();
    const r = (Math.random() + 1).toString(36).substring(7);
    res.cookies.set({
        name: "session",
        value: r,
        httpOnly: true,
        expires: new Date(Date.now() + 10 * 1000),
    });
    return res;
}

export async function loginSuccess() {
    console.log("login success");
    // revalidatePath("/pages/system/user")
    // redirect("/pages/system/user")
}

export async function redirectPage(url: string, type?: RedirectType) {
    redirect(url, type)

}