import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getListTodo, toggleAllTodo } from '../actions/todo';
import Footer from '../components/Footer';
import Header from '../components/Header';
import TodoItem from '../components/TodoItem';
import axios from 'axios';
import { urlGetAll, urlStore } from '../utils/Api';

HomePage.propTypes = {

}

function HomePage(props) {

    const disPatch = useDispatch();
    const todoList = useSelector(state => state.todo.list);
    const filters = useSelector(state => state.todo.filters);
    const filter = useSelector(state => state.todo.filter);
    const toggleAll = (event) => {
        todoList.map(todo => {
            if (todo.completed != event.target.checked) {
                todo.completed = event.target.checked
                checkItem(todo)
            }
        });
        disPatch(toggleAllTodo(event.target.checked))
    }

    const getTodos = () => {
        axios.get(urlGetAll).then(res => {
            disPatch(getListTodo(res.data));
        })
    }

    const checkItem = (todo) => {
        axios.put(`${urlStore}/${todo._id}`, todo)
    }

    useEffect(() => {
        getTodos();
    }, []);

    return (
        <section className="todoapp">
            <Header></Header>
            {/* <!-- This section should be hidden by default and shown when there are todos --> */}
            <section className="main">
                <input
                    id="toggle-all"
                    className="toggle-all"
                    type="checkbox"
                    checked={todoList.every(filters.completed)}
                    onChange={toggleAll}
                ></input>
                <label htmlFor="toggle-all">Mark all as complete</label>
                <ul className="todo-list">
                    {todoList.filter(filters[filter]).map(todo => {
                        return (
                            <TodoItem key={todo._id} todo={todo}></TodoItem>
                        );
                    })}
                </ul>
            </section>
            {todoList.length > 0 && <Footer></Footer>}
        </section>
    );
}

export default HomePage;