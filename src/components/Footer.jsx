import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { filterTodo, toggleAllTodo } from '../actions/todo';

Footer.propTypes = {

}

function Footer(props) {

    const dispatch = useDispatch();
    const todoList = useSelector(state => state.todo.list);
    const filters = useSelector(state => state.todo.filters);
    const filter = useSelector(state => state.todo.filter);
    const [numberOfItemLeft, setNumberOfItemLeft] = useState(0);
    const calcNumberOfItemLeft = () => {
        let todoLeft = todoList.filter(todo => todo.completed === false)
        return todoLeft.length;
    }

    useEffect(() => {
        setNumberOfItemLeft(calcNumberOfItemLeft())
    }, [todoList])

    return (
        // <!-- This footer should hidden by default and shown when there are todos -->
        < footer className="footer" >
            {/* <!-- This should be `0 items left` by default --> */}
            < span className="todo-count" > <strong>{numberOfItemLeft}</strong> item left</ span>
            {/* <!-- Remove this if you don't implement routing --> */}
            <ul className="filters" >
                {Object.keys(filters).map((type, index) => {
                    return (
                        <li key={index} onClick={() => {
                            dispatch(filterTodo(type));
                        }}>
                            <a className={type === filter ? 'selected' : ''} href="#/">{type[0].toUpperCase() + type.slice(1)}</a>
                        </li>
                    );
                })}
            </ul>
            {/* <!-- Hidden if no completed items are left ↓ --> */}
            {numberOfItemLeft < todoList.length ? <button onClick={() => dispatch(toggleAllTodo(false))} className="clear-completed" > Clear completed</button> : ''}
        </footer >
    );
}

export default Footer;