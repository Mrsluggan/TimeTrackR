import React from 'react'
import { useState, useEffect } from 'react'
import CreateTask from './CreateTask'
import RemoveTask from './RemoveTask'
export default function FetchData() {

    const [data, setData] = useState([])


    const getData = () => {
        fetch('http://localhost:8080/tasks/gettasks')
            .then(response => response.json())
            .then(data => setData(data))
    }

    useEffect(() => {
        getData()
    }, [])


    const handleIsActive = (task) => {
        console.log(data);

        console.log(task.isActive);
        fetch(`http://localhost:8080/tasks/${task.isActive ? 'stop' : 'start'}/${task.id}`, {
            method: 'POST',
        })
            .then(() => {
                getData();
            });
    };


    const printData = () => {
        return data.map(item =>
            <li key={item.id} >
                {item.taskName}
                <p>{item.isActive}</p>
                <p>{item.totalTime} Timmar </p>
                {item.isActive === true ?
                    <div>Aktiv</div>
                    :
                    <div>Inaktiv</div>

                }
                {
                    item.isActive === true ?
                        <button onClick={() => handleIsActive(item)}> Stop </button>
                        :
                        <button onClick={() => handleIsActive(item)}> Start </button>
                }
                <RemoveTask task={item} setData={setData} data={data} />
            </li>
        )
    }



    return (
        <div>
            <CreateTask setData={setData} />
            <div>
                {printData()}
            </div>


        </div>

    )
}
