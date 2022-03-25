import React, {useState, useEffect} from "react";
import {hot} from 'react-hot-loader/root';
import PostList from "./PostList";
import Login from "./Login";
import RegisterLogin from "./RegisterLogin";
import {BrowserRouter, Route, Link, Switch} from "react-router-dom";
import PostForm from "./PostForm";
import {getMe} from "./api";
import Profile from "./Profile";

import SearchPost from "./Search";


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

    const logOut =  () => {
      localStorage.removeItem("UserToken");
      setLoggedIn(false);
     
    }

    return (
       <>
            <BrowserRouter>

                <div id="Container">

                    


                    <div className="Navbar">
                        <h2>Stranger Things</h2>

                        <Link to="/"><button >Home</button></Link>
                        <Link to="/profile"><button >Profile</button></Link>
                        <Link to="/register"><button >Sign Up</button></Link>
                        <Link to="/login"><button >Login</button></Link>
                        <button className="LogOut" onClick={logOut}>Log out</button>
                    </div>
                        {/* <div><SearchPost/></div> */}

                    <h1 className="welcome">Welcome to Stranger Things!
                      </h1>

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

                                <Profile posts={posts}
                                    setPosts={setPosts}
                                    loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>

                            </Route>

                        </Switch>

                    

                </div>
                </BrowserRouter>
                <div id="sideBar">
                <PostForm posts={posts}
                    setPosts={setPosts}
                    loggedIn={loggedIn}/>
                </div>
           </>
    )
}

export default hot(App);
