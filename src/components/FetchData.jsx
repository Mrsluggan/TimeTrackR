import React from 'react'
import { useState, useEffect } from 'react'
export default function FetchData() {

    const [data, setData] = useState([])

    useEffect(() => {
        fetch('http://localhost:8080/tasks/gettasks')
            .then(response => response.json())
            .then(data => setData(data))

    }, [])

    const handleIsActive = (task) => {
        console.log(task.isActive);
        if (task.isActive == true) {
            fetch(`http://localhost:8080/tasks/stop/${task.id}`, {
                method: 'POST',

            })
        } else if (task.isActive == false) {
            fetch(`http://localhost:8080/tasks/start/${task.id}`, {
                method: 'POST',

            })
        }
    }


    const printData = () => {
        console.log(data);
        return data.map(item =>
            <li key={item.id} >
                {item.taskName}
                <p>{item.isActive}</p>
                <p>{item.totalTime} Timmar </p>

                {
                    item.isActive === true ? <button onClick={() => handleIsActive(item)}> Stop </button> : <button onClick={() => handleIsActive(item)}> Start </button>
                }
                
            </li>
        )
    }



    return (
        <div>

            <div>
                {printData()}
            </div>


        </div>

    )
}
