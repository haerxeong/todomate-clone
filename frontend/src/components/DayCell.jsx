import { dayStats } from '../constants/data'

export default function DayCell({ day, year, month, todayDay, selected, todos, onClick }) {
    const dow = new Date(year, month - 1, day).getDay()
    const isSat = dow === 6
    const isSun = dow === 0
    const isToday = todayDay === day
    const isSel = selected === day

    const { done, total } = dayStats(todos, year, month, day)
    const allDone = total > 0 && done === total
    const partDone = total > 0 && done > 0 && !allDone
    const hasTodo = total > 0

    // 날짜 숫자 색상 클래스
    const numColorClass = isSel
        ? 'selected'
        : isToday
            ? 'today'
            : isSat
                ? 'sat'
                : isSun
                    ? 'sun'
                    : 'default'

    // 버블 배경
    const bubbleBg = isSel || allDone ? '#111' : 'transparent'
    const bubbleBorder = isToday && !isSel ? '2px solid #111' : '2px solid transparent'

    return (
        <div className="day-cell" onClick={() => onClick(day)}>
            <div
                className={`day-bubble${isSel ? ' selected' : ''}${allDone && !isSel ? ' all-done' : ''}${isToday && !isSel ? ' today' : ''}`}
                style={{ background: bubbleBg, border: bubbleBorder }}
            >
                {allDone && !isSel ? (
                    // 전체 완료 — 흰색 체크
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                        <path
                            d="M2.5 6.5l3 3 5-5.5"
                            stroke="#fff"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                ) : partDone && !isSel ? (
                    // 일부 완료 — 회색 체크
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                        <path
                            d="M2.5 6.5l3 3 5-5.5"
                            stroke="#ccc"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                ) : (
                    <span
                        className={`day-number ${numColorClass}`}
                        style={{ fontWeight: isSel || isToday ? 800 : 500 }}
                    >
            {day}
          </span>
                )}
            </div>

            {hasTodo && (
                <div className={`day-dot${allDone ? ' done' : ''}`} />
            )}
        </div>
    )
}