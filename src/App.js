import './App.css';
import { useAuth0 } from '@auth0/auth0-react';

function App() {
  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0()
  console.log(user)
  return (
    <div className="App">
      <header className="App-header">
        <h1>Auth0 Test</h1>
        {isAuthenticated ? <div>
          <p>{user.email}</p>
          <p>SAML ATTRIBUTE: {user[process.env.REACT_APP_REDIRECT_URL]?.p_tal}</p>
          <button onClick={() => logout({
            federated: true,
          })}>logout</button>
        </div> : <button onClick={() => loginWithRedirect()}>login</button>}
      </header>
    </div>
  );
}

export default App;
