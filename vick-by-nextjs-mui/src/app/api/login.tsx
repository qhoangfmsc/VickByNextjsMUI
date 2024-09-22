'use client'
import { sha256 } from "@/app/lib/util";

export default async function login(loginusername: string, password: string) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify(
        {
            "username": loginusername,
            "password": await sha256(password)
        }
    );

    return fetch("/login", {
        method: "POST",
        headers: myHeaders,
        body: raw,
    })
        .then((res) => res.json())
        .then((data) => {
            if (data.result === 'fail') {
                console.warn(data.errorcode)
                return false;
            }
            else {
                return true;
            }
        })
}
