import { useState } from 'react'
import './App.css'

import { FRIENDS, INITIAL_TODOS, CURRENT_YEAR, CURRENT_MONTH, TODAY_DAY, dateKey } from './constants/data'
import FriendList from './components/FriendList'
import ProfileSection from './components/ProfileSection'
import Calendar from './components/Calendar'
import TodoList from './components/TodoList'
import BottomNav from './components/BottomNav'

export default function App() {
  // ── 상태 ──────────────────────────────────────────────────
  const [selFriend, setSelFriend] = useState(0)
  const [year, setYear] = useState(CURRENT_YEAR)
  const [month, setMonth] = useState(CURRENT_MONTH)
  const [selDay, setSelDay] = useState(TODAY_DAY)
  const [todos, setTodos] = useState(INITIAL_TODOS)
  const [addingTo, setAddingTo] = useState(null)   // '과제' | '할일' | null
  const [newText, setNewText] = useState('')
  const [activeNav, setActiveNav] = useState('home')

  // ── 파생 값 ────────────────────────────────────────────────
  const selKey = dateKey(year, month, selDay)
  const dayData = todos[selKey] || { 과제: [], 할일: [] }

  // ── 핸들러 ─────────────────────────────────────────────────
  function handlePrevMonth() {
    if (month === 1) { setYear((y) => y - 1); setMonth(12) }
    else setMonth((m) => m - 1)
    setSelDay(1)
  }

  function handleNextMonth() {
    if (month === 12) { setYear((y) => y + 1); setMonth(1) }
    else setMonth((m) => m + 1)
    setSelDay(1)
  }

  function handleToggleTodo(cat, id) {
    setTodos((prev) => {
      const day = prev[selKey] || { 과제: [], 할일: [] }
      return {
        ...prev,
        [selKey]: {
          ...day,
          [cat]: day[cat].map((t) => (t.id === id ? { ...t, done: !t.done } : t)),
        },
      }
    })
  }

  function handleAddTodo() {
    if (!newText.trim() || !addingTo) return
    const id = Date.now()
    setTodos((prev) => {
      const day = prev[selKey] || { 과제: [], 할일: [] }
      return {
        ...prev,
        [selKey]: {
          ...day,
          [addingTo]: [...(day[addingTo] || []), { id, text: newText.trim(), done: false }],
        },
      }
    })
    setNewText('')
    setAddingTo(null)
  }

  // ── 렌더 ───────────────────────────────────────────────────
  return (
      <div className="app-container">

        {/* 상단 메뉴 */}
        <div className="top-bar">
          <button aria-label="메뉴">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path d="M3 6h16M3 11h16M3 16h16" stroke="#222" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* 친구 목록 */}
        <FriendList
            friends={FRIENDS}
            selectedId={selFriend}
            onSelect={setSelFriend}
        />

        {/* 스크롤 영역 */}
        <div className="scroll-body">

          {/* 프로필 */}
          <ProfileSection friend={FRIENDS[selFriend]} />

          {/* 캘린더 */}
          <Calendar
              year={year}
              month={month}
              todayDay={TODAY_DAY}
              selectedDay={selDay}
              todos={todos}
              onSelectDay={setSelDay}
              onPrevMonth={handlePrevMonth}
              onNextMonth={handleNextMonth}
          />

          {/* 할일 목록 */}
          <TodoList
              dayData={dayData}
              addingTo={addingTo}
              newText={newText}
              onSetAddingTo={setAddingTo}
              onNewTextChange={setNewText}
              onAddTodo={handleAddTodo}
              onToggleTodo={handleToggleTodo}
          />
        </div>

        {/* 하단 네비게이션 */}
        <BottomNav activeNav={activeNav} onNavChange={setActiveNav} />
      </div>
  )
}