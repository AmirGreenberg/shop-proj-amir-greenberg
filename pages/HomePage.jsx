const { useState } = React
const { useSelector, useDispatch } = ReactRedux


export function HomePage() {
    // DONE: move to storeState
    const dispatch = useDispatch()
    // const [count, setCount] = useState(10)
    const count = useSelector(storeState => storeState.count)

    function changeCount(diff) {
        console.log('Changing count by:', diff)
        // DONE: use dispatch
        // setCount(count + diff)
        // dispatch({ type: 'INCREMENT' })
        dispatch({ type: 'CHANGE_BY', diff })
    }

    return (
        <section>
            <h2>
                Count {count}
                <button onClick={() => {
                    changeCount(1)
                }}>+</button>
                <button onClick={() => {
                    changeCount(10)
                }}>+10</button>
            </h2 >
            <img src="assets/img/logo.png" />
        </section >
    )
}