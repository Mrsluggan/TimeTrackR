import React from 'react'
import { useState, useEffect } from 'react'
import CreateTask from './CreateTask'
import RemoveTask from './RemoveTask'
export default function FetchData({ setIsLoggedIn, isLoggedIn }) {

    const [data, setData] = useState([])

    const getData = async () => {
        fetch('https://walrus-app-fc7zi.ondigitalocean.app/task/getTasks', {
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
    fetch(`https://walrus-app-fc7zi.ondigitalocean.app/task/${task.isActive ? 'stop' : 'start'}?id=${task.id}`, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({ id: task.id }),
        headers: {
            'Content-Type': 'application/json' // Se till att ange rätt content-type header
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json(); // Om du förväntar dig JSON-svar
    })
    .then(data => {
        console.log('Success:', data); // Debugging information
        getData();
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
};

    const printData = () => {
        if (!Array.isArray(data)) {
            return <p>Error fetching data...</p>;
        }
        if (data.length === 0) {
            return <p>Loading...</p>;
        }

        return data.map(item => (
            <li key={item.id} style={{ listStyle: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <h3>{item.taskName}</h3>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <p>{item.totalTime} Timmar </p>
                    {item.isActive === true ?
                        <button onClick={() => { handleIsActive(item) }}> Stop </button>
                        :
                        <button onClick={() => handleIsActive(item)}> Start </button>
                    }
                    <RemoveTask task={item} setData={setData} data={data} />
                </div>
            </li>
        ));
    };



    return (
        <div>
            <CreateTask setData={setData} />
            <div>
                {isLoggedIn && printData()}
            </div>


        </div>

    )
}
