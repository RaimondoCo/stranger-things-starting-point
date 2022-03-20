import React, { useEffect, useState } from 'react';
import { getPosts, deletePost } from './api';
import UpdateForms from "./UpdateForms"
import MessagesForm from './MessagesForm';

const PostList = (props) => {
    const [editOpen, setEditOpen] = useState(false)
    const [messageOpen, setMessageOpen] = useState(false)
    const {posts, setPosts, loggedIn} = props;

const handleDelete = (postid, event) => {
    event.preventDefault();
    deletePost(postid);
    const remainingPosts = posts.filter((post) => postid !== post._id);
    setPosts(remainingPosts);
}

    useEffect(async () => {
        const posts = await getPosts();
        setPosts(posts.data.posts);
    }, []);

    console.log(posts)
    return (
        <div>
            {posts.map(post =>
                <div key={post._id}>
                    <h2>{post.title}</h2>
                    <p>{post.description}</p>
                    <p>{post.price} $</p>
                    {/* if the edit button is clicked, i'd want the form to show up below it */}
                    {post.isAuthor && <button onClick={() => {setEditOpen(!editOpen)}} editOpen={editOpen}>Edit</button>}
                    {post.isAuthor && editOpen ? <UpdateForms loggedIn={loggedIn} postId={post.id}/> : null}
                    {post.isAuthor && <button onClick = {(event)=> {handleDelete(post._id, event)}}>Delete</button>}
                   {!post.isAuthor && <button onClick = {()=> {setMessageOpen(!messageOpen)}} messageOpen={messageOpen}> Message the author</button>}
                   {!post.isAuthor && messageOpen ? <MessagesForm loggedIn={loggedIn} /> : null }
                </div>
            )}
        </div>
    );
};

export default PostList;