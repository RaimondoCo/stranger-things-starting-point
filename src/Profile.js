import React, {useEffect, useState} from "react";
import { getMe, deletePost, getPosts } from "./api"; 
import UpdateForms from "./UpdateForms"



// user (object)
// posts (array of post): an array of post objects made by the user
// messages (array of message): an array of messages made on posts made to or by the user
// _id (string): the database identifier of the user
// username (string): the username of the user




const Profile =  (props) => {

    
    const [userPosts, setUserPosts] = useState([]);
    const [userMessages, setUserMessages] = useState([]);

    const [userUsername, setUserUsername] = useState(""); 
    const {loggedIn} = props

    const [editOpen, setEditOpen] = useState(false)
    
    const handleDelete = (postid, event) => {
        event.preventDefault();
        deletePost(postid);
        const remainingPosts = userPosts.filter((post) => postid !== post._id);
        setUserPosts(remainingPosts);
    }

    useEffect(async () => {
        const posts = await getPosts();
        console.log("these are the users posts: ", posts.data.posts)
        setUserPosts(posts.data.posts);
    }, []);

    useEffect(async () => {
        const userMessages = await getMe();
        console.log("these are the user's messages:", userMessages.data.messages)
        setUserMessages(userMessages.data.messages);
    }, []);

   

    useEffect(async () => {
        const username = await getMe();
        console.log("username: ", username.data.username)
        setUserUsername(username.data.username);
    }, []);

   console.log("this is user posts" + userPosts)

    return (
     <>  
     {loggedIn ? <>
<p>Welcome to your profile, {userUsername}</p>
        <div>
            {userPosts.map(post =>
                <div key={ post._id}>
                    <h2>{post.isAuthor && post.title}</h2>
                    <p>{post.isAuthor && post.description}</p>
                    {post.isAuthor && <p {...post.price} >  $</p>}
                    {post.isAuthor && <button onClick={() => {setEditOpen(!editOpen)}} editOpen={editOpen}>Edit</button>}
                    {post.isAuthor && editOpen ? <UpdateForms postId={post._id}/> : null}
                    {post.isAuthor && <button onClick = {(event)=> {handleDelete(post._id, event)}}>Delete</button>}
                </div>
            )}
        </div>
        <div id="profileMessages">
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