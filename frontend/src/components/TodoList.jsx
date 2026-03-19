// components/TodoList.jsx
import { TODO_CATEGORIES } from '../constants/data'

function CategoryIcon({ cat }) {
    if (cat === '과제') {
        return (
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <circle cx="6.5" cy="6.5" r="5.5" stroke="#777" strokeWidth="1.3" />
                <path d="M4.5 6.5h4M6.5 4.5v4" stroke="#777" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
        )
    }
    return (
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <rect x="1" y="2" width="11" height="9" rx="2" stroke="#777" strokeWidth="1.3" />
            <path d="M1 6h11" stroke="#777" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
    )
}

function TodoItem({ todo, onToggle }) {
    return (
        <div className="todo-row" onClick={() => onToggle(todo.id)}>
            <div className={`todo-checkbox${todo.done ? ' done' : ''}`}>
                {todo.done && (
                    <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                        <path
                            d="M2 5.5l2.5 2.5 4.5-5"
                            stroke="#fff"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                )}
            </div>
            <span className={`todo-text${todo.done ? ' done' : ''}`}>
        {todo.text}
      </span>
        </div>
    )
}

export default function TodoList({ dayData, addingTo, newText, onSetAddingTo, onNewTextChange, onAddTodo, onToggleTodo }) {
    return (
        <div className="todo-list-wrapper">
            {TODO_CATEGORIES.map((cat) => {
                const items = dayData[cat] || []
                const isAdding = addingTo === cat

                return (
                    <div key={cat} className="todo-category">
                        {/* 카테고리 헤더 */}
                        <div className="todo-category-header">
                            <div className="todo-category-badge">
                                <CategoryIcon cat={cat} />
                                <span>{cat}</span>
                            </div>
                            <button
                                className="todo-add-btn"
                                onClick={() => onSetAddingTo(isAdding ? null : cat)}
                                aria-label={`${cat} 추가`}
                            >
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path d="M8 3v10M3 8h10" stroke="#999" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                            </button>
                        </div>

                        {/* 입력창 */}
                        {isAdding && (
                            <div className="todo-add-input-row">
                                <input
                                    autoFocus
                                    value={newText}
                                    onChange={(e) => onNewTextChange(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && onAddTodo()}
                                    placeholder={`${cat} 입력...`}
                                />
                                <button onClick={onAddTodo}>추가</button>
                            </div>
                        )}

                        {/* 빈 상태 */}
                        {items.length === 0 && !isAdding && (
                            <div className="todo-empty">아직 {cat}이 없어요</div>
                        )}

                        {/* 할일 목록 */}
                        {items.map((todo) => (
                            <TodoItem
                                key={todo.id}
                                todo={todo}
                                onToggle={(id) => onToggleTodo(cat, id)}
                            />
                        ))}
                    </div>
                )
            })}
        </div>
    )
}