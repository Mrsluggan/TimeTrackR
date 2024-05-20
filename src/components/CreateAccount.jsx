import React, { useState } from 'react';

export default function CreateAccount({ setIsLoggedIn }) {
    const [open, setOpen] = useState(false);
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(username + "  " + password);

        fetch('https://walrus-app-fc7zi.ondigitalocean.app/users/add/newuser', {
            method: 'POST',
            cors : 'no-cors',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',

            },
            body: JSON.stringify({
                "name": username,
                "password": password,
                "listOfTasks": [

                ]
            })

        })
            .then(response => console.log(response))
        setPassword("")
        setUsername("")
        setOpen(false)
        event.target.reset();
    }

    return (
        <li>
            <a onClick={() => setOpen(true)}>Skapa konto</a>
            {open && (
                <div className="popup-container">
                    <div className="popup-body">
                        <form id='taskSubmit' onSubmit={handleSubmit}>
                            <label htmlFor="username">Username  </label>
                            <input
                                type="text"
                                id="username"
                                name='username'
                                required
                                minLength={1}
                                value={username}
                                onChange={event => setUsername(event.target.value.toLowerCase())}
                            />
                            <label htmlFor="password">Password </label>
                            <input
                                type="password"
                                id="password"
                                name='password'
                                required
                                minLength={1}
                                value={password}
                                onChange={event => setPassword(event.target.value)}
                            />
                            <button type='submit'>Submit</button>
                        </form>
                        <button onClick={() => setOpen(false)}>Close X</button>
                    </div>
                </div>
            )}
        </li>
    );
}
