function CategoryIcon() {
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

export default function TodoList({
                                     categories,
                                     dayData,
                                     addingTo,
                                     newText,
                                     onSetAddingTo,
                                     onNewTextChange,
                                     onAddTodo,
                                     onToggleTodo,
                                 }) {
    return (
        <div className="todo-list-wrapper">
            {categories.map((cat) => {
                const items = dayData[cat.name] || []
                const isAdding = addingTo === cat.id

                return (
                    <div key={cat.id} className="todo-category">
                        <div className="todo-category-header">
                            <div className="todo-category-badge">
                                <CategoryIcon />
                                <span>{cat.name}</span>
                            </div>
                            <button
                                className="todo-add-btn"
                                onClick={() => onSetAddingTo(isAdding ? null : cat.id)}
                                aria-label={`${cat.name} 추가`}
                            >
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path d="M8 3v10M3 8h10" stroke="#999" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                            </button>
                        </div>

                        {isAdding && (
                            <div className="todo-add-input-row">
                                <input
                                    autoFocus
                                    value={newText}
                                    onChange={(e) => onNewTextChange(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && onAddTodo(cat)}
                                    placeholder={`${cat.name} 입력...`}
                                />
                                <button onClick={() => onAddTodo(cat)}>추가</button>
                            </div>
                        )}

                        {items.length === 0 && !isAdding && (
                            <div className="todo-empty">아직 {cat.name}이 없어요</div>
                        )}

                        {items.map((todo) => (
                            <TodoItem
                                key={todo.id}
                                todo={todo}
                                onToggle={onToggleTodo}
                            />
                        ))}
                    </div>
                )
            })}
        </div>
    )
}