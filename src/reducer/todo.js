const initialState = {
    list: [],
    itemEditing: null,
    filter: 'all',
    filters: {
        all: () => true,
        active: todo => !todo.completed,
        completed: todo => todo.completed
    }
};

const todoReducer = (state = initialState, action) => {
    let newList = [...state.list];
    switch (action.type) {
        case "ADD_TODO":
            newList.unshift(action.payload);
            return { ...state, list: newList };
        case "START_EDIT":
            let itemEditing = action.payload;
            return { ...state, itemEditing };
        case "EDIT_TODO":
            for (let todo of newList) {
                if (todo.id === action.payload.id) {
                    todo.name = action.payload.name;
                    todo.completed = action.payload.completed
                }
            }
            return { ...state, list: newList, itemEditing: null };
        case "DEL_TODO":
            let listAfter = newList.filter(todo => todo.id !== action.payload);
            return { ...state, list: listAfter };
        case "FILTER_TODO":
            let typeFilter = action.payload;
            return { ...state, filter: typeFilter }
        case "TOGGLE_ALL":
            let completed = action.payload;
            newList.forEach(todo => todo.completed = completed)
            return { ...state, list: newList }
        default:
            return state;
    }
}

export default todoReducer;