export async function fetchData(input: RequestInfo | URL, init?: RequestInit) {
    try {
        const resp = await fetch(input, init)
        if (resp.ok) {
            return resp.json()
        } else {
            throw new Error(`${resp.status} ${resp.statusText}`)
        }
    } catch (err) {
        throw err
    }
}

export function getCookie(key: string) {
    for (const cookie of document.cookie.split(';')) {
        if (cookie.includes(key)) {
            return cookie.trim().slice(key.length + 1)
        }
    }
    return ''
}
