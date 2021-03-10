import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleAllTodo } from '../actions/todo';
import Footer from '../components/Footer';
import Header from '../components/Header';
import TodoItem from '../components/TodoItem';

HomePage.propTypes = {

}

function HomePage(props) {

    const disPatch = useDispatch();
    const todoList = useSelector(state => state.todo.list);
    const filters = useSelector(state => state.todo.filters);
    const filter = useSelector(state => state.todo.filter);
    const toggleAll = (event) => {
        disPatch(toggleAllTodo(event.target.checked))
    }

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
                            <TodoItem key={todo.id} todo={todo}></TodoItem>
                        );
                    })}
                </ul>
            </section>
            {todoList.length > 0 && <Footer></Footer>}
        </section>
    );
}

export default HomePage;