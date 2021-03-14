import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addNewTodo } from '../actions/todo';
import { urlStore } from '../utils/Api';

Header.propTypes = {

}

function Header(props) {
    const dispatch = useDispatch();
    const handleEnterPress = (event) => {
        if (event.keyCode === 13 && event.target.value) {
            let todo = {
                name: event.target.value,
                completed: false
            }

            axios.post(urlStore, todo).then(res => {
                const action = addNewTodo(res.data);
                dispatch(action);
                event.target.value = '';
            })
        }
    }

    return (
        <header className="header">
            <h1>todos</h1>
            <input onKeyUp={handleEnterPress} className="new-todo" placeholder="What needs to be done?" autoFocus></input>
        </header>
    );
}

export default Header;