// components/Calendar.jsx
import DayCell from './DayCell'
import { getDaysInMonth, getFirstDow, DOW_LABELS } from '../constants/data'

export default function Calendar({ year, month, todayDay, selectedDay, todos, onSelectDay, onPrevMonth, onNextMonth }) {
    const daysInMonth = getDaysInMonth(year, month)
    const firstDow = getFirstDow(year, month)

    // 캘린더 그리드 생성
    const cells = []
    for (let i = 0; i < firstDow; i++) cells.push(null)
    for (let d = 1; d <= daysInMonth; d++) cells.push(d)
    while (cells.length % 7 !== 0) cells.push(null)

    const weeks = []
    for (let i = 0; i < cells.length; i += 7) {
        weeks.push(cells.slice(i, i + 7))
    }

    return (
        <div className="calendar-wrapper">
            {/* 헤더: 년월 + 이전/다음 버튼 */}
            <div className="calendar-header">
                <div className="calendar-title">
                    <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
                        <rect x="1.5" y="3" width="14" height="12" rx="2" stroke="#555" strokeWidth="1.4" />
                        <path d="M5.5 1.5v3M11.5 1.5v3M1.5 7.5h14" stroke="#555" strokeWidth="1.4" strokeLinecap="round" />
                    </svg>
                    <span>{year}년 {month}월</span>
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                        <path d="M3.5 5.5l4 4 4-4" stroke="#666" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>

                <div className="calendar-nav">
                    <button onClick={onPrevMonth} aria-label="이전 달">
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                            <path d="M9.5 11.5L5.5 7.5l4-4" stroke="#555" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                    <button onClick={onNextMonth} aria-label="다음 달">
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                            <path d="M5.5 3.5l4 4-4 4" stroke="#555" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* 요일 헤더 */}
            <div className="calendar-dow-header">
                {DOW_LABELS.map((d, i) => (
                    <div
                        key={d}
                        className={`dow-cell${i === 5 ? ' sat' : i === 6 ? ' sun' : ''}`}
                    >
                        {d}
                    </div>
                ))}
            </div>

            {/* 날짜 그리드 */}
            {weeks.map((week, wi) => (
                <div key={wi} className="calendar-week-row">
                    {week.map((day, di) => (
                        <div key={di} style={{ textAlign: 'center' }}>
                            {day ? (
                                <DayCell
                                    day={day}
                                    year={year}
                                    month={month}
                                    todayDay={todayDay}
                                    selected={selectedDay}
                                    todos={todos}
                                    onClick={onSelectDay}
                                />
                            ) : (
                                <div className="calendar-empty-cell" />
                            )}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    )
}