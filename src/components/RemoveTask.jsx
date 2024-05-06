import React from 'react';

export default function RemoveTask({ task, setData, data }) {

    const handleClick = () => {
        fetch(`http://localhost:8080/tasks/remove/${task.id}`, {
            method: 'Delete',
        })




        const arr = data.filter((item) => item.id !== task.id);
        setData(arr)

    }

    return (
        <button onClick={handleClick}>Ta bort</button>
    )
}
