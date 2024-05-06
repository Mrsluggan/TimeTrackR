import React from 'react'
import { useState } from 'react'

export default function CreateTask() {

    const [data, setdata] = useState("")

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(data);
        fetch('http://localhost:8080/tasks/newtask', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "taskName": data
            })
        })

    }


    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' , margin: '50px'}}>
            <div>
                <label htmlFor="taskName">Task name</label>
                <input type="text" id="taskName" name='taskName' onChange={event => setdata(event.target.value)} />
            </div>
            <button type='submit'> submit </button>
        </form>
    )
}
