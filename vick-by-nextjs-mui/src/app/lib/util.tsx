import { createHash } from "crypto";

export function renderUncapContent(data: string) {
    if (data) {
        return String(data)
            .replace(/&amp;/g, '&')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&quot;/g, '"');
    } else {
        return "";
    }
}

export function renderDegrees(value: string) {
    return value.split(';').map((item, index) => (
        <p key={index}>{item.trim()}</p>
    ));
}

export async function sha256(password: string) {
    return createHash('sha256').update(password).digest('hex')
}