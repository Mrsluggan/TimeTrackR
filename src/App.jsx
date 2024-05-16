import { useState, useEffect } from 'react'
import './App.css'
import FetchData from './components/FetchData'
import Navbar from './components/Navbar'
import AdminPage from './components/AdminPage'

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const CheckIfAuthenticated = async () => {
    const requestHeaders = {
      'Content-Type': 'application/json',
    };

    console.log('Request Headers:', requestHeaders);

    fetch('https://walrus-app-fc7zi.ondigitalocean.app/check', {
      method: 'GET',
      credentials: 'include',
    })
      .then(response => response.json())
      .then(data => {
        console.log('Response from server:', data);
        if (data.authenticated === true) {
          setCurrentUser(data.username);
          if (data.isAdmin === true) {
            setIsAdmin(true);
          }
          setIsLoggedIn(true);
        }
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }

  useEffect(() => {
    if (!isLoggedIn) {
      CheckIfAuthenticated();
    }
  }, [isLoggedIn]); // Kör bara när isLoggedIn ändras


  return (
    <>
      {
        isLoggedIn === false ?
          <h1>Välkommen till TimeTracker!</h1>

          :
          <h1>Välkommen tillbaka {currentUser}!</h1>
      }
      <Navbar isLoggedIn={isLoggedIn} isAdmin={isAdmin} />
      <header></header>
      {
        isLoggedIn === false ?
          <div style={{ textAlign: 'center' }}>
            <h2>Logga in för upptäcka hur mycket tid du slösar i livet</h2>
          </div>
          :
          isAdmin === true ?
            <AdminPage />
            :
            <FetchData isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setCurrentUser={setCurrentUser} />
      }
    </>
  )
}

export default App
