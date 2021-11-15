import './App.css';
import { useAuth0 } from '@auth0/auth0-react';

function App() {
  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0()

  console.log("user", user)
  return (
    <div className="App">
      <header className="App-header">
        <h1>Shibboleth Test</h1>
        {isAuthenticated ? <div>
          <p>{user.email}</p>
          <button onClick={() => logout()}>logout</button>
        </div> : <button onClick={() => loginWithRedirect()}>login</button>}
      </header>
    </div>
  );
}

export default App;
