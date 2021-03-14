export const addNewTodo = (todo) => {
    return {
        type: 'ADD_TODO',
        payload: todo
    }
}

export const startEdit = (todoId) => {
    return {
        type: 'START_EDIT',
        payload: todoId
    }
}

export const editTodo = (todo) => {
    return {
        type: 'EDIT_TODO',
        payload: todo
    }
}

export const delTodo = (todoId) => {
    return {
        type: 'DEL_TODO',
        payload: todoId
    }
}

export const filterTodo = (type) => {
    return {
        type: 'FILTER_TODO',
        payload: type
    }
}

export const toggleAllTodo = (completed) => {
    return {
        type: 'TOGGLE_ALL',
        payload: completed
    }
}

export const getListTodo = (todos) => {
    return {
        type: 'GET_TODOS',
        payload: todos
    }
}