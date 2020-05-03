import React from 'react'
import './App.css'
import ListItems from "./ListItems"
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

library.add(faTrash)

class App extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      items: [],
      currentItem: {
        text: "",
        key: ""
      }
    }

    this.handleInput = this.handleInput.bind(this)
    this.addItem = this.addItem.bind(this)
    this.deleteItem = this.deleteItem.bind(this)
    this.setUpdate = this.setUpdate.bind(this)
  }

  //This method is used to set change the text while we are entering the new task
  handleInput(e) {
    this.setState({
      currentItem: {
        text: e.target.value,
        key: Date.now()   //We are adding this key field as this will serve as a timestamp
        //when we will delete the items from the list 
      }
    })
  }

  //This method is called when the submit button is pressed.
  //This assigns the value of the current item to the text and key fields and
  //adds a new item into the list
  addItem(e) {
    //This prevents the default action of the event which refreshes the page.
    e.preventDefault()
    //Now taking the new item into a variable and assigninng its value to the respective text and key field
    const newItem = this.state.currentItem
    //console.log(newItem)   This is just to test whether the value is correctly received or not

    if (newItem.text !== "") {
      //this adds the current item object into the array of items and create a new item with empty fields
      //to store any other task 
      const newItems = [...this.state.items, newItem]
      this.setState({
        items: newItems,
        currentItem: {
          text: "",
          key: ""
        }

      })
    }

  }

  deleteItem(key) {

    //Here we are making use of a function called filter which filter all those items whose key value is not equal
    //to the key value of the item which we want to delete and then return an array

    const filteredItems = this.state.items.filter(item => item.key !== key)
    this.setState({ items: filteredItems })

  }

  //this method updates the text value in the list item by matching items with the key value that 
  //this method has received

  setUpdate(text, key) {
    console.log("items:" + this.state.items);
    const items = this.state.items;
    items.map(item => {
      if (item.key === key) {
        console.log(item.key + "    " + key)
        item.text = text;
      }
    })
    this.setState({
      items: items
    })
  }

  //We have passed items in ListItems component which is the array of items stored in the items state
  //Ite will be received as props in the ListItems functional component and then returned back in a list form
  render() {
    return (
      <div className="App">
        <h1>My Todo</h1>
        <header>
          <form id="to-do-form" onSubmit={this.addItem}>
            <input
              type="text"
              placeholder="Enter new task"
              value={this.state.currentItem.text}
              onChange={this.handleInput}
            />

            <button type="submit">Add</button>
          </form>
        </header>
        <ListItems
          items={this.state.items}
          deleteItem={this.deleteItem}
          setUpdate={this.setUpdate}
        />
      </div>
    )
  }
}

export default App;
