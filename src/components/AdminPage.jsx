import React, { useState, useEffect } from 'react'

export default function AdminPage() {

    const [users, setUsers] = useState([])
    const getUsers = async () => {
        fetch('https://walrus-app-fc7zi.ondigitalocean.app/admin/getAllUsers', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setUsers(data);
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }
    useEffect(() => {
        getUsers();
    }, [])



    const printUsers = () => {
        return (
            <ul style={{listStyle: 'none'}}>
                {users.map(user =>
                    <li key={user.userId} >
                        {user.name}
                        {user.isAdmin ? <span> Admin</span> : <span> User</span>}
                        <ul >
                            {user.listOfTasks.map(task =>
                                <li key={task.id}>
                                    {"Uppgift " + task.taskName + " Totala tiden: " + task.totalTime + " Timmar"}
                                </li>
                            )}
                        </ul>
                    </li>
                )}
            </ul>
        );
    }



    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>


            <div>
                <h2>Alla användare</h2>
                <div >
                    {printUsers()}

                </div>
            </div>





        </div>
    )
}
