import { useEffect, useMemo, useState } from 'react'
import './App.css'

import {
  CURRENT_MONTH,
  CURRENT_USER_ID,
  CURRENT_YEAR,
  TODAY_DAY,
  dateKey,
} from './constants/data'
import {
  createTodo,
  fetchCategories,
  fetchFriends,
  fetchTodos,
  updateTodo,
} from './api/todomateApi'

import FriendList from './components/FriendList'
import ProfileSection from './components/ProfileSection'
import Calendar from './components/Calendar'
import TodoList from './components/TodoList'
import BottomNav from './components/BottomNav'

const MY_PROFILE = {
  id: CURRENT_USER_ID,
  name: '나',
  profileImg: null,
  bio: '내 할 일',
  isMe: true,
}

function groupTodosByCategoryName(todos, categories) {
  const categoryNameMap = new Map(categories.map((c) => [c.id, c.name]))
  const grouped = {}

  categories.forEach((category) => {
    grouped[category.name] = []
  })

  todos.forEach((todo) => {
    const categoryName = todo.categoryId
        ? categoryNameMap.get(todo.categoryId) || '미분류'
        : '미분류'

    if (!grouped[categoryName]) {
      grouped[categoryName] = []
    }

    grouped[categoryName].push({
      id: todo.id,
      text: todo.text,
      done: todo.done,
      categoryId: todo.categoryId,
    })
  })

  return grouped
}

export default function App() {
  const [selFriend, setSelFriend] = useState(CURRENT_USER_ID)
  const [year, setYear] = useState(CURRENT_YEAR)
  const [month, setMonth] = useState(CURRENT_MONTH)
  const [selDay, setSelDay] = useState(TODAY_DAY)

  const [friends, setFriends] = useState([MY_PROFILE])
  const [categories, setCategories] = useState([])
  const [todosByDate, setTodosByDate] = useState({})
  const [currentDayTodos, setCurrentDayTodos] = useState([])

  const [addingTo, setAddingTo] = useState(null)
  const [newText, setNewText] = useState('')
  const [activeNav, setActiveNav] = useState('home')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const selKey = dateKey(year, month, selDay)

  const selectedFriend = useMemo(
      () => friends.find((f) => f.id === selFriend) || MY_PROFILE,
      [friends, selFriend]
  )

  const dayData = useMemo(
      () => groupTodosByCategoryName(currentDayTodos, categories),
      [currentDayTodos, categories]
  )

  async function loadFriends() {
    try {
      const data = await fetchFriends(CURRENT_USER_ID)

      const mapped = data.map((friend) => ({
        id: friend.friendId,
        name: friend.nickname,
        profileImg: friend.profileImg,
        bio: friend.bio,
      }))

      setFriends([MY_PROFILE, ...mapped])
    } catch (e) {
      console.error(e)
      setError(e.message)
    }
  }

  async function loadCategories(userId) {
    try {
      const data = await fetchCategories(userId)
      const normalized = [...data.map((item) => ({
        id: item.id,
        name: item.name,
        icon: item.icon,
        orderIndex: item.orderIndex,
      }))]

      if (!normalized.some((c) => c.name === '미분류')) {
        normalized.push({
          id: 'uncategorized',
          name: '미분류',
          icon: null,
          orderIndex: 9999,
        })
      }

      setCategories(normalized)
    } catch (e) {
      console.error(e)
      setCategories([{ id: 'uncategorized', name: '미분류', icon: null, orderIndex: 9999 }])
      setError(e.message)
    }
  }

  async function loadTodos(userId, key) {
    try {
      setLoading(true)
      const data = await fetchTodos(userId, key)

      setCurrentDayTodos(data)

      setTodosByDate((prev) => ({
        ...prev,
        [key]: groupTodosByCategoryName(data, categories.length ? categories : [{ id: 'uncategorized', name: '미분류' }]),
      }))
    } catch (e) {
      console.error(e)
      setCurrentDayTodos([])
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadFriends()
  }, [])

  useEffect(() => {
    loadCategories(selFriend)
  }, [selFriend])

  useEffect(() => {
    loadTodos(selFriend, selKey)
  }, [selFriend, selKey])

  function handlePrevMonth() {
    if (month === 1) {
      setYear((y) => y - 1)
      setMonth(12)
    } else {
      setMonth((m) => m - 1)
    }
    setSelDay(1)
  }

  function handleNextMonth() {
    if (month === 12) {
      setYear((y) => y + 1)
      setMonth(1)
    } else {
      setMonth((m) => m + 1)
    }
    setSelDay(1)
  }

  async function handleToggleTodo(id) {
    const target = currentDayTodos.find((todo) => todo.id === id)
    if (!target) return

    try {
      setError('')

      await updateTodo(id, {
        userId: selFriend,
        done: true,
      })

      setCurrentDayTodos((prev) =>
          prev.map((todo) =>
              todo.id === id ? { ...todo, done: !todo.done } : todo
          )
      )

      setTodosByDate((prev) => {
        const current = prev[selKey]
        if (!current) return prev

        const next = Object.fromEntries(
            Object.entries(current).map(([categoryName, items]) => [
              categoryName,
              items.map((todo) =>
                  todo.id === id ? { ...todo, done: !todo.done } : todo
              ),
            ])
        )

        return {
          ...prev,
          [selKey]: next,
        }
      })
    } catch (e) {
      console.error(e)
      setError(e.message)
    }
  }

  async function handleAddTodo(category) {
    if (!newText.trim()) return

    try {
      const payload = {
        userId: selFriend,
        text: newText.trim(),
        todoDate: selKey,
        categoryId: category.id === 'uncategorized' ? null : category.id,
      }

      await createTodo(payload)
      setNewText('')
      setAddingTo(null)
      await loadTodos(selFriend, selKey)
    } catch (e) {
      console.error(e)
      setError(e.message)
    }
  }

  return (
      <div className="app-container">
        <div className="top-bar">
          <button aria-label="메뉴">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path d="M3 6h16M3 11h16M3 16h16" stroke="#222" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <FriendList
            friends={friends}
            selectedId={selFriend}
            onSelect={setSelFriend}
        />

        <div className="scroll-body">
          <ProfileSection friend={selectedFriend} />

          <Calendar
              year={year}
              month={month}
              todayDay={TODAY_DAY}
              selectedDay={selDay}
              todos={todosByDate}
              onSelectDay={setSelDay}
              onPrevMonth={handlePrevMonth}
              onNextMonth={handleNextMonth}
          />

          {error && (
              <div style={{ color: 'crimson', fontSize: 13, margin: '8px 0' }}>
                {error}
              </div>
          )}

          {loading ? (
              <div style={{ padding: '12px 0', color: '#888' }}>불러오는 중...</div>
          ) : (
              <TodoList
                  categories={categories}
                  dayData={dayData}
                  addingTo={addingTo}
                  newText={newText}
                  onSetAddingTo={setAddingTo}
                  onNewTextChange={setNewText}
                  onAddTodo={handleAddTodo}
                  onToggleTodo={handleToggleTodo}
              />
          )}
        </div>

        <BottomNav activeNav={activeNav} onNavChange={setActiveNav} />
      </div>
  )
}