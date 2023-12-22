const { useState, useEffect } = React
const { useSelector, useDispatch } = ReactRedux

import { UserMsg } from './UserMsg.jsx'
import { ShoppingCart } from './ShoppingCart.jsx'
import { SET_CART_IS_SHOWN } from '../store/store.js'

export function AppFooter() {

    const dispatch = useDispatch()
    // const [isCartShown, setIsCartShown] = useState(false)
    const isCartShown = useSelector(storeState => storeState.isCartShown)
    const count = useSelector(storeState => storeState.count)
    const todosCount = useSelector(storeState => storeState.todos.length)


    // TODO: move to storeState
    // const count = 101
    // const todosCount = 0
    const cart = []

    return (
        <footer>
            <h5>
                Currently {todosCount} todos in the shop
            </h5>
            <p>
                Coffeerights to all - Count: {count}
            </p>
            <h5>
                <span>{cart.length}</span> Products in your Cart
                <a href="#" onClick={(ev) => {
                    ev.preventDefault()
                    dispatch({ type: SET_CART_IS_SHOWN, isCartShown: !isCartShown })
                }}>
                    ({(isCartShown) ? 'hide' : 'show'})
                </a>
            </h5>
            
            <ShoppingCart isCartShown={isCartShown} />
            <UserMsg />
        </footer>
    )
}
