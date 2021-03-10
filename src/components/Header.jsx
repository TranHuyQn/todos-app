import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import uniqid from 'uniqid';
import { addNewTodo } from '../actions/todo';

Header.propTypes = {

}

function Header(props) {
    const dispatch = useDispatch();
    const handleEnterPress = (event) => {
        if (event.keyCode === 13 && event.target.value) {
            let todo = {
                id: uniqid(),
                name: event.target.value,
                completed: false
            }

            const action = addNewTodo(todo);
            dispatch(action);
            event.target.value = '';
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