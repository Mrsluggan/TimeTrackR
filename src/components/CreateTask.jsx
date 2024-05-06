import React from 'react'
import { useState } from 'react'

export default function CreateTask({ setData }) {

    const [taskName, setTaskName] = useState("")

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(taskName);
        fetch('http://localhost:8080/tasks/newtask', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "taskName": taskName
            })

        })
            .then(response => response.json())
            .then(data => setData(prevTodos => [...prevTodos, data])
            )
        setTaskName("")
        event.target.reset();

    }


    return (
        <form id='taskSubmit' onSubmit={handleSubmit}>
                <label htmlFor="taskName">Task name: </label>
                <input type="text" id="taskName" name='taskName' onChange={event => setTaskName(event.target.value)} />
            <button type='submit'> submit </button>
        </form>
    )
}
