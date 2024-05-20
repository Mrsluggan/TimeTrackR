import React from 'react'
import { useState } from 'react'

export default function CreateTask({ setData }) {

    const [taskName, setTaskName] = useState("")

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(taskName);
        fetch('https://walrus-app-fc7zi.ondigitalocean.app/task/add', {
            method: 'POST',
            credentials: 'include',
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
            <input type="text" id="taskName" name='taskName' required minLength={1} onChange={event => setTaskName(event.target.value)} />
            <button type='submit'> submit </button>
        </form>
    )
}
