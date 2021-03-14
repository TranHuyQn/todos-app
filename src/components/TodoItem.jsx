import axios from 'axios';
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { delTodo, editTodo, startEdit } from '../actions/todo';
import { urlStore } from '../utils/Api';

TodoItem.propTypes = {

}

function TodoItem(props) {
    let todo = props.todo;
    const itemEditing = useSelector(state => state.todo.itemEditing)

    const dispatch = useDispatch();

    const handleDoubleClick = () => {
        let action = startEdit(todo._id);
        dispatch(action);
    }

    const handleEndEdit = (event) => {
        if (event.type == 'keyup' && event.keyCode == 13) {
            todo.name = event.target.value;
            axios.put(`${urlStore}/${todo._id}`, todo).then(res => {
                let action = editTodo(res.data);
                dispatch(action);
            })
        }
    }

    const handleCheck = (event) => {
        todo.completed = event.target.checked;
        axios.put(`${urlStore}/${todo._id}`, todo).then(res => {
            let action = editTodo(res.data);
            dispatch(action);
        })
    }

    const handleDelTodo = () => {
        axios.delete(`${urlStore}/${todo._id}`);
        let action = delTodo(todo._id);
        dispatch(action)
    }

    return (
        // <!-- These are here just to show the structure of the list items -->
        //             <!-- List items should get the class `editing` when editing and `completed` when marked as completed -->
        <li className={`${todo.completed && "completed"} ${todo._id === itemEditing && "editing"}`} draggable="true">
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