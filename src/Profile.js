import React, {useEffect, useState} from "react";
import { getMe } from "./api"; 
import { deletePost } from './api';
import UpdateForms from "./UpdateForms"



// user (object)
// posts (array of post): an array of post objects made by the user
// messages (array of message): an array of messages made on posts made to or by the user
// _id (string): the database identifier of the user
// username (string): the username of the user




const Profile =  (props) => {

    
    const [userPosts, setUserPosts] = useState([]);
    const [userMessages, setUserMessages] = useState([]);
    const [userId, setUserId] = useState([]);
    const [userUsername, setUserUsername] = useState(""); 
    const {loggedIn, setLoggedIn} = props

    const [editOpen, setEditOpen] = useState(false)
    
    const handleDelete = (postid, event) => {
        event.preventDefault();
        deletePost(postid);
        const remainingPosts = userPosts.filter((post) => postid !== post._id);
        setUserPosts(remainingPosts);
    }

    useEffect(async () => {
        const userPosts = await getMe();
        console.log("these are the users posts: ", userPosts.data.posts)
        setUserPosts(userPosts.data.posts);
    }, []);

    useEffect(async () => {
        const userMessages = await getMe();
        console.log("these are the user's messages:", userMessages.data.messages)
        setUserMessages(userMessages.data.messages);
    }, []);

    useEffect(async () => {
        const userId = await getMe();
        console.log("user ID: ", userId.data._id)
        setUserId(userId.data._id);
    }, []);

    useEffect(async () => {
        const username = await getMe();
        console.log("username: ", username.data.username)
        setUserUsername(username.data.username);
    }, []);

   

    return (
     <>  
     {loggedIn ? <>
<p>Welcome to your profile, {userUsername}</p>
        <div>
            {userPosts.map(post =>
                <div key={post._id}>
                    <h2>{post.title}</h2>
                    <p>{post.description}</p>
                    <p>{post.price} $</p>
                    <button onClick={() => {setEditOpen(!editOpen)}} editOpen={editOpen}>Edit</button>
                    { editOpen ? <UpdateForms postId={post._id}/> : null}
                    <button onClick = {(event)=> {handleDelete(post._id, event)}}>Delete</button>
                </div>
            )}
        </div>
        <div>
            {userMessages.map(message =>
                <div key={message._id}>
                    <h2>{message.fromUser.username}</h2>
                    <p>{message.content}</p>
                </div>
            )}
        </div> </> :  
            <p> Register or login to see your profile!</p>}
        </>
    );
};

export default Profile;