const BASE_URL = 'http://localhost:8080/api'

async function request(url, options = {}) {
    const response = await fetch(url, {
        headers: {
            'Content-Type': 'application/json',
            ...(options.headers || {}),
        },
        ...options,
    })

    if (!response.ok) {
        let message = '요청에 실패했습니다.'
        try {
            const data = await response.json()
            message = data.message || message
        } catch (_) {}
        throw new Error(message)
    }

    if (response.status === 204) return null
    return response.json()
}

export async function fetchFriends(userId) {
    return request(`${BASE_URL}/friendships/friends?userId=${userId}`)
}

export async function fetchCategories(userId) {
    return request(`${BASE_URL}/categories?userId=${userId}`)
}

export async function fetchTodos(userId, todoDate, categoryId) {
    const params = new URLSearchParams({ userId })

    if (todoDate) params.append('todoDate', todoDate)
    if (categoryId) params.append('categoryId', categoryId)

    return request(`${BASE_URL}/todos?${params.toString()}`)
}

export async function createTodo(payload) {
    return request(`${BASE_URL}/todos`, {
        method: 'POST',
        body: JSON.stringify(payload),
    })
}

export async function updateTodo(todoId, payload) {
    return request(`${BASE_URL}/todos/${todoId}`, {
        method: 'PATCH',
        body: JSON.stringify(payload),
    })
}