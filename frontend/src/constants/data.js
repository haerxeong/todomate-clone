// ── 친구 목록 ─────────────────────────────────────────────
export const FRIENDS = [
    { id: 0, name: '해령', avatar: null, isMe: true },
    { id: 1, name: '유리', avatar: null },
    { id: 2, name: '갓생민', avatar: null },
    { id: 3, name: '조', avatar: '🎮' },
    { id: 4, name: '채연', avatar: null },
    { id: 5, name: '지애', avatar: '🐱' },
    { id: 6, name: '가은', avatar: null },
    { id: 7, name: '섹시상규', avatar: '🕶️' },
    { id: 8, name: '정민', avatar: '🦊' },
]

// ── 초기 할일 데이터 ────────────────────────────────────────
export const INITIAL_TODOS = {
    '2026-03-04': {
        과제: [{ id: 1, text: '클컴 강의 밀린거', done: false }],
        할일: [{ id: 10, text: '기정 내용정리', done: true }],
    },
    '2026-03-05': {
        과제: [{ id: 2, text: '클컴 실습 못한 거 따라잡기', done: false }],
        할일: [],
    },
    '2026-03-13': {
        과제: [{ id: 3, text: '클컴 과제', done: false }],
        할일: [
            { id: 11, text: '기정 apr', done: false },
            { id: 12, text: '항산개 1주차 내용정리', done: false },
        ],
    },
    '2026-03-19': {
        과제: [],
        할일: [
            { id: 13, text: '항산개 2주차 강의 수강하고 내용정리', done: false },
            { id: 14, text: '캡디 클론코딩 계획짜고 진행', done: false },
            { id: 15, text: '데베스 내용 정리', done: false },
            { id: 16, text: '데베스 강의 듣기', done: false },
            { id: 17, text: '블체 내용정리', done: false },
        ],
    },
}

// ── 날짜 유틸 ───────────────────────────────────────────────
export const TODAY_DAY = 19
export const CURRENT_YEAR = 2026
export const CURRENT_MONTH = 3

export const DOW_LABELS = ['월', '화', '수', '목', '금', '토', '일']
export const TODO_CATEGORIES = ['과제', '할일']

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
    const all = [...(dayData.과제 || []), ...(dayData.할일 || [])]
    return {
        done: all.filter((t) => t.done).length,
        total: all.length,
    }
}