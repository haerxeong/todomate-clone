export const CURRENT_USER_ID = '7912f6e0-235e-11f1-babe-079bf6001c8b'

export const TODAY_DAY = 19
export const CURRENT_YEAR = 2026
export const CURRENT_MONTH = 3

export const DOW_LABELS = ['월', '화', '수', '목', '금', '토', '일']

export function pad(n) {
    return String(n).padStart(2, '0')
}

export function dateKey(year, month, day) {
    return `${year}-${pad(month)}-${pad(day)}`
}

export function getDaysInMonth(year, month) {
    return new Date(year, month, 0).getDate()
}

/** 월 첫날의 요일 (월요일 = 0 기준) */
export function getFirstDow(year, month) {
    const d = new Date(year, month - 1, 1).getDay()
    return d === 0 ? 6 : d - 1
}

/** 특정 날짜의 완료/전체 할일 수 반환 */
export function dayStats(todos, year, month, day) {
    const key = dateKey(year, month, day)
    const dayData = todos[key]
    if (!dayData) return { done: 0, total: 0 }

    const all = Object.values(dayData).flat()

    return {
        done: all.filter((t) => t.done).length,
        total: all.length,
    }
}