import React, {useEffect, useState} from "react";
import { getMe, getPosts } from "./api"; 
import UpdateForms from "./UpdateForms"


const Profile =  (props) => {

    const [userPosts, setUserPosts] = useState([]);
    const [userMessages, setUserMessages] = useState([]);
    const [userUsername, setUserUsername] = useState(""); 
    const {loggedIn} = props
   

    useEffect(async () => {
        const posts = await getPosts();
        setUserPosts(posts.data.posts);
    }, []);

    useEffect(async () => {
        const userMessages = await getMe();
        setUserMessages(userMessages.data.messages);
    }, []);

    useEffect(async () => {
        const username = await getMe();
        setUserUsername(username.data.username);
    }, []);

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
                    {post.isAuthor && <UpdateForms postId={post._id}/>}
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