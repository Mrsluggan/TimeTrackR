import React from 'react'
import { useState, useEffect } from 'react'
import CreateTask from './CreateTask'
import RemoveTask from './RemoveTask'
export default function FetchData({ setIsLoggedIn, isLoggedIn }) {

    const [data, setData] = useState([])

    const getData = async () => {
        fetch('http://localhost:8080/task/getTasks', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setData(data);
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }

    useEffect(() => {

        if (isLoggedIn) {
            getData();
        }
    }, [isLoggedIn]);

    const handleIsActive = (task) => {

        fetch(`http://localhost:8080/task/${task.isActive ? 'stop' : 'start'}?id=${task.id}`, {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify({ id: task.id }),

        })
            .then(() => {

                getData();
            });
    };


    const printData = () => {
        if (!Array.isArray(data)) {
            return null; // eller hantera annorlunda om det inte är en array
        }

        return data.map(item =>
            <li id='taskList' key={item.id} style={{ listStyle: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <h3>{item.taskName}</h3>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <p>{item.isActive} </p>
                    <p>{item.totalTime} Timmar </p>

                    {item.isActive === true ?
                        <button onClick={() => { handleIsActive(item) }}> Stop </button>
                        :
                        <button onClick={() => handleIsActive(item)}> Start </button>
                    }
                    <RemoveTask task={item} setData={setData} data={data} />
                </div>
            </li>
        )
    }



    return (
        <div>
            <CreateTask setData={setData} />
            <div>
                {isLoggedIn && printData()}
            </div>


        </div>

    )
}
