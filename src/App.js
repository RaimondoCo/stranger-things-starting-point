
import React from "react";
import { hot } from 'react-hot-loader/root';
import PostList from "./PostList";
import Login from "./Login";
import RegisterLogin from "./RegisterLogin";
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";

const isLoggedIn = !!localStorage.getItem("stranger_things_JWT");

console.log(isLoggedIn);



const App = (props) => {
  const { name } = props;
  if (!isLoggedIn) return (<p>Please Log In!</p>)
  return (
    <>
      <Main />
      <h1 className="welcome">Welcome, {name}</h1>
      <Postform/>
      <button onClick={()=> localStorage.removeItem("stranger_things_JWT")}>Log Out</button>
      {isLoggedIn && <PostList />}
      {isLoggedIn ? <PostList/> : <p>Please log in...</p>}
      
    </>
  );
}

const Main = () => {
  return (
    <BrowserRouter>
      <div id="Container"> 
      
        <div className="Navbar">
          <h2>Stranger Thing's</h2>
          <Link to= "/register">Sign Up </Link>
          <Link to= "/login">Login</Link>
              
        </div>

    <Switch>
        <Route path= "/login">
          <Login />
        </Route>

        <Route path= "/register">
          <RegisterLogin />
        </Route>

        <Route path = "/">
         
        </Route>

      </Switch>
      </div>
      </BrowserRouter>
  )
}

export default hot(App);
