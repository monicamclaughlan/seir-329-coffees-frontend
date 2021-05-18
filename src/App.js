import React, {useState, useEffect} from 'react'
import './App.css';
import {Route, Link, Switch} from 'react-router-dom'
import Display from './Display'
import Form from './Form'

function App() {

  const url = "https://seir-329-coffees-mkm.herokuapp.com"

  //Create state to hold list of all coffees
  const [coffees, setCoffees] = useState([])

  const emptyCoffee = { 
    name: "", 
    img: "", 
    description: ""
  }

  // create another state for selected coffees when updating
  const [selectedCoffee, setSelectedCoffee] = useState(emptyCoffee)

  //function to get all the coffees 
  const getCoffees = () => { 
    fetch(url + '/coffees/')
    .then((response) => response.json())
    .then((data) => setCoffees(data))
  }

  // when screen loads, get list of all coffees
  useEffect(() => { 
    getCoffees()
  }, [])



// handleCreate - function for when create is submitted
const handleCreate = (newCoffee) => { 
  fetch(url + '/coffees', { 
    method: "POST", 
    headers: { 
      "Content-type": "application/json"
    }, 
    body: JSON.stringify(newCoffee)
  })
  .then(() => getCoffees())
}

// handleUpdate - function for when edited form is submitted
const handleUpdate = (coffee) => { 
  fetch(url + "/coffees/" + coffee._id, { 
    method: "PUT", 
    headers: { 
      "Content-Type": "application/json"
    }, 
    body: JSON.stringify(coffee)
  })
  .then(() => { 
    getCoffees()
  })
}

// function to specify which coffee we are updating
const selectCoffee = (coffee) => { 
  setSelectedCoffee(coffee)
}


const deleteCoffee = (coffee) => { 
  fetch (url + "/coffees/" + coffee._id, { 
    method: "delete"
  })
  .then(() => getCoffees())
}


  return (
    <div className="App">
      <h1>Coffees of The World</h1>
      <hr/>
      <Link to="/create">
      <button>Add Another Coffee!</button>
      </Link>
      <main>
        <Switch>
          <Route exact path='/' render={(rp) => <Display {...rp} coffees={coffees} selectCoffee={selectCoffee} deleteCoffee={deleteCoffee} />}/>
          <Route exact path='/create' render={(rp) => <Form {...rp} label="create" coffee={emptyCoffee}  handleSubmit={handleCreate} />} />
          <Route exact path='/edit' render={(rp) => <Form {...rp} label="update"  coffee={selectedCoffee} handleSubmit={handleUpdate} />} />


        </Switch>

      </main>

    </div>
  );
}

export default App;
