const { useState, useEffect } = React
const { useSelector, useDispatch } = ReactRedux

import { todoService } from '../services/todo.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { ADD_TODO, ADD_TODO_TO_CART, REMOVE_TODO, SET_TODOS, UPDATE_TODO } from '../store/store.js'

export function TodoIndex() {
    const dispatch = useDispatch()


    // DONE: move to storeState
    // const [todos, setTodos] = useState([])
    const todos = useSelector(storeState => storeState.todos)
    const cart = useSelector(storeState => storeState.shoppingCart)


    useEffect(() => {
        todoService.query()
            // TODO: use dispatch
            .then(todos => {
                // setTodos(todos)
                dispatch({ type: SET_TODOS, todos })
            })
    }, [])

    function onRemoveTodo(todoId) {
        todoService.remove(todoId)
            .then(() => {
                showSuccessMsg('Todo removed')
                // DONE: use dispatch
                dispatch({ type: REMOVE_TODO, todoId })
                // setTodos(todos.filter(c => c._id !== todoId))
            })
            .catch(err => {
                console.log('Cannot remove todo', err)
                showErrorMsg('Cannot remove todo')
            })
    }

    function onAddTodo() {
        const todoToSave = todoService.getEmptyTodo()

        todoService.save(todoToSave)
            .then((savedTodo) => {
                showSuccessMsg(`Todo added (id: ${savedTodo._id})`)

                // setTodos(prevTodos => [...prevTodos, savedTodo])
                // DONE: use dispatch
                dispatch({ type: ADD_TODO, todo: savedTodo })
            })
            .catch(err => {
                console.log('Cannot add todo', err)
                showErrorMsg('Cannot add todo')
            })


    }
    function onEditTodo(todo) {
        const price = +prompt('New price?')
        const todoToSave = { ...todo, price }

        todoService.save(todoToSave)
            .then((savedTodo) => {
                // DONE: use dispatch
                // setTodos(todos.map(c => (c._id === todo._id) ? todoToSave : c))
                dispatch({ type: UPDATE_TODO, todo: savedTodo })
                showSuccessMsg(`Todo updated to price: $${savedTodo.price}`)
            })
            .catch(err => {
                console.log('Cannot update todo', err)
                showErrorMsg('Cannot update todo')
            })
    }

    function addToCart(todo) {
        console.log(`Adding ${todo.vendor} to Cart`)
        // TODO: use dispatch
        // setCart([...cart, todo])
        dispatch({ type: ADD_TODO_TO_CART, todo })
        showSuccessMsg('Added to Cart')
    }

    return (
        <div>
            <h3>Todos App</h3>
            <main>
                <button onClick={onAddTodo}>Add Todo ⛐</button>
                <ul className="todo-list">
                    {todos.map(todo =>
                        <li className="todo-preview" key={todo._id}>
                            <h4>{todo.vendor}</h4>
                            <h1>⛐</h1>
                            <p>Price: <span>${todo.price.toLocaleString()}</span></p>
                            <p>Owner: <span>{todo.owner && todo.owner.fullname}</span></p>
                            <div>
                                <button onClick={() => {
                                    onRemoveTodo(todo._id)
                                }}>x</button>
                                <button onClick={() => {
                                    onEditTodo(todo)
                                }}>Edit</button>
                            </div>
                            <button className="buy" onClick={() => {
                                addToCart(todo)
                            }}>Add to Cart</button>

                        </li>)}
                </ul>
                <hr />
                <pre>{JSON.stringify(cart, null, 2)}</pre>
            </main>
        </div>
    )

}