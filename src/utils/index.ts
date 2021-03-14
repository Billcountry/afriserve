const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Nov",
    "Dec",
]

export function formatDate(date: Date, format: string) {
    const parts: { [partId: string]: any } = {
        M: date.getMonth() + 1,
        n: months[date.getMonth()],
        d: date.getDate(),
        h: date.getHours(),
        m: date.getMinutes(),
        s: date.getSeconds(),
    }
    format = format.replace(/(M+|n+|d+|h+|m+|s+)/g, function (v: string) {
        return ((v.length > 1 ? "0" : "") + parts[v.slice(-1)]).slice(-2)
    })

    return format.replace(/(y+)/g, function (v) {
        return date.getFullYear().toString().slice(-v.length)
    })
}

export const uniqueId = () =>
    (
        Date.now().toString(36) + Math.random().toString(36).substr(2, 9)
    ).toLowerCase()

export function getValidPhone(phone: string): string | null {
    if (phone.match(/^(\+254|254|0)[1|7]\d{8}$/) === null) {
        return null
    }
    if (phone.length === 10) {
        phone = `+254${phone.substr(1)}`
    }
    if (phone.length === 12) {
        phone = `+${phone}`
    }
    return phone
}
