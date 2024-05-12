import React from 'react'

export default function Navbar({ isLoggedIn }) {
    return (

        <nav id='navBar' >

            {
                isLoggedIn === false ?
                    <div style={{ display: 'flex' }}>
                        <li> <a href="http://localhost:8080/login">Logga in</a></li>
                        <li> <a href="http://localhost:8080/login">Skapa konto</a></li>
                    </div>
                    :
                    <li> <a href="http://localhost:8080/logout">Logga ut</a></li>
            }
        </nav>

    )
}
