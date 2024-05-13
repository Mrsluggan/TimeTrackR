import React from 'react'
import CreateAccount from './CreateAccount'
export default function Navbar({ isLoggedIn, isAdmin }) {
    return (

        <nav id='navBar' >

            <div>TimeTrackR</div>
            {
                isLoggedIn === false ?
                    <div style={{ display: 'flex' }}>
                        <li> <a href="https://walrus-app-fc7zi.ondigitalocean.app/login">Logga in</a></li>
                        <CreateAccount />
                    </div>
                    :
                    <li> <a href="https://walrus-app-fc7zi.ondigitalocean.app/logout">Logga ut</a></li>
            }
        </nav>

    )
}
