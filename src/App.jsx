import { useState, useEffect } from 'react'
import './App.css'
import FetchData from './components/FetchData'
import Navbar from './components/Navbar'

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState("");

  const CheckIfAuthenticated = async () => {


    fetch('http://localhost:8080/check', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(response => response.json())
      .then(data => {
        if (data.authenticated === true) {
          setCurrentUser(data.username);
          setIsLoggedIn(true);
        }
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }

  useEffect(() => {

    if (isLoggedIn === false) {
      CheckIfAuthenticated();

    }


  }, []);

  return (
    <>
      {
        isLoggedIn === false ?
          <h1>Välkommen till TimeTracker!</h1>

          :
          <h1>Välkommen tillbaka {currentUser}!</h1>
      }
      <Navbar isLoggedIn={isLoggedIn} />
      <header></header>
      {
        isLoggedIn === false ?
          <div style={{ textAlign: 'center' }}>
            <h2>Logga in för upptäcka hur mycket tid du slösar i livet</h2>
          </div>
          :
          <FetchData isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setCurrentUser={setCurrentUser} />
      }
    </>
  )
}

export default App
