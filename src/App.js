import React, {useState, useEffect} from "react";
import {hot} from 'react-hot-loader/root';
import PostList from "./PostList";
import Login from "./Login";
import RegisterLogin from "./RegisterLogin";
import {BrowserRouter, Route, Link, Switch} from "react-router-dom";
import PostForm from "./PostForm";
import {getMe} from "./api";
import Profile from "./Profile";
// import UpdateForms from "./UpdateForms";


const App = () => {
    const [posts, setPosts] = useState([]);
    const [loggedIn, setLoggedIn] = useState(false);
    const [userData, setUserData] = useState({});

    useEffect(() => {
        setLoggedIn(!!localStorage.getItem("UserToken"))
    }, []);

    // creategetMe function that takes data once user is logged in - populate prrofile, etc.

    useEffect(async () => {
        const user = await getMe()
        setUserData(user);
    }, [loggedIn])

    return (
       <>
            <BrowserRouter>

                <div id="Container">

                    


                    <div className="Navbar">
                        <h2>Stranger Things</h2>
{/* add home button */}
                        <Link to="/register">Sign Up</Link>
                        
                        <Link to="/login">Login</Link>
                        <Link to="/profile">Profile</Link>
                    </div>

                    <h1 className="welcome">Welcome, {
                        userData.username
                    }</h1>

                        <Switch>

                            <Route exact path="/">
                                <PostList posts={posts}
                                    setPosts={setPosts}
                                    loggedIn={loggedIn}/>
                            </Route>

                            <Route path="/register">
                                <RegisterLogin setLoggedIn={setLoggedIn}
                                    loggedIn={loggedIn}/> {loggedIn } </Route>


                            <Route path="/login">
                                <Login setLoggedIn={setLoggedIn}
                                    loggedIn={loggedIn}/> {loggedIn } </Route>

                            <Route exact path="/posts">
                                <PostList posts={posts}
                                    setPosts={setPosts}/>
                            </Route>

                            <Route path="/profile">
                                <Profile />
                            </Route>

                        </Switch>

                    

                </div>
                </BrowserRouter>
                
                <PostForm posts={posts}
                    setPosts={setPosts}
                    loggedIn={loggedIn}/>
           </>
    )
}

export default hot(App);
