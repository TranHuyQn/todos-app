import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { delTodo, editTodo, startEdit } from '../actions/todo';

TodoItem.propTypes = {

}

function TodoItem(props) {
    let todo = props.todo;
    const itemEditing = useSelector(state => state.todo.itemEditing)

    const dispatch = useDispatch();

    const handleDoubleClick = () => {
        let action = startEdit(todo.id);
        dispatch(action);
    }

    const handleEndEdit = (event) => {
        if (event.type == 'blur' || event.type == 'keyup' && event.keyCode == 13) {
            todo.name = event.target.value;
            let action = editTodo(todo);
            dispatch(action);
        }
    }

    const handleCheck = (event) => {
        todo.completed = event.target.checked;
        let action = editTodo(todo);
        dispatch(action);
    }

    const handleDelTodo = () => {
        let action = delTodo(todo.id);
        dispatch(action)
    }

    return (
        // <!-- These are here just to show the structure of the list items -->
        //             <!-- List items should get the class `editing` when editing and `completed` when marked as completed -->
        <li className={`${todo.completed && "completed"} ${todo.id === itemEditing && "editing"}`} draggable="true">
            <div className="view">
                <input className="toggle" type="checkbox" checked={todo.completed} onChange={handleCheck}></input>
                <label onDoubleClick={handleDoubleClick}>{todo.name}</label>
                <button className="destroy" onClick={handleDelTodo}></button>
            </div>
            <input className="edit" defaultValue={todo.name} onBlur={handleEndEdit} onKeyUp={handleEndEdit}></input>
        </li>
    );
}

export default TodoItem;