import React from "react"
import "./ListItems.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import FlipMove from 'react-flip-move';


function ListItems(props) {

    const items = props.items
    //Now we are going to retrieve the array elements with the help of a map and then return them as a list
    //to the ListItems component in App.js

    const listItems = items.map((item) => {
        //We are going to return the array items as div so that we can individually style or manage the list items
        return (
            <div className="list" key={item.key}>
                <p>
                    <input
                        type="text"
                        id={item.key}
                        value={item.text}
                        onChange={(e) => {
                            props.setUpdate(e.target.value, item.key)
                        }}
                    //Here we are adding the onChange listener to allow us to edit the value of the list items
                    //This is done by receiving a method called setUpdate via props
                    //We are going to pass in the value and the id of the list item that is to be edited 
                    />
                    <span>
                        <FontAwesomeIcon
                            className="faicons"
                            icon="trash"
                            onClick={() => {
                                props.deleteItem(item.key)
                            }}
                        />
                    </span>
                </p>
            </div>
        )
    })

    return (
        //Return the list items created above back to the ListItems component
        <div>
            <FlipMove duration={300} easing="ease-in-out">
                {listItems}
            </FlipMove>
        </div>
    )
}

export default ListItems