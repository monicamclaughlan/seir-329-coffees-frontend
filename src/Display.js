import React from 'react'

const Display = ({coffees, selectCoffee, history, deleteCoffee}) => {

    const loaded = () => (
        <>
        {coffees.map((coffee) => (
            <article key={coffee._id}> 
                <h1>{coffee.name}</h1>
                <img src={coffee.img}/>
                <h2>{coffee.description}</h2>
                <button onClick={() => {selectCoffee(coffee) 
                    history.push('/edit')}}>Edit</button>
                <button onClick={() => {deleteCoffee(coffee)}}>Delete</button>
            </article>
        ))}
        </>
    )

    const loading = () => <h1>Loading...</h1>

    return coffees.length > 0 ? loaded() : loading()
}

export default Display
