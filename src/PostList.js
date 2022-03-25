import React, { useEffect, useState } from 'react';
import { getPosts, deletePost } from './api';
import UpdateForms from "./UpdateForms"
import MessagesForm from './MessagesForm';

const PostList = (props) => {
    const [editOpen, setEditOpen] = useState(false)
    const [messageOpen, setMessageOpen] = useState(false)
    const {posts, setPosts, loggedIn} = props;



const handleDelete = async (postid, event) => {
    event.preventDefault();
    await deletePost(postid);
    const remainingPosts = posts.filter((post) => postid !== post._id);
    setPosts(remainingPosts);
}

const sortItems = (array) => {
    return array.createdAt.sort()
}

    useEffect(async () => {
        const posts = await getPosts();
        setPosts(posts.data.posts);
sortItems(posts);
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
                    {post.isAuthor && <button key={post._id} onClick={() => {setEditOpen({open:!editOpen, id: post._id})}} editOpen={editOpen}>Edit</button>}
                    {post.isAuthor && editOpen.open && editOpen.id === post._id ? <UpdateForms loggedIn={loggedIn} postid={post.id}/> : null}
                    {post.isAuthor && <button onClick = {(event)=> {handleDelete(post._id, event)}}>Delete</button>}
                   {!post.isAuthor && <button key={post._id} onClick = {()=> {setMessageOpen({open:!messageOpen, id:post._id})}} messageOpen={messageOpen}> Message the author</button>}
                   {!post.isAuthor && messageOpen.open && messageOpen.id === post._id ? <MessagesForm loggedIn={loggedIn} postid={post._id} /> : null }
                </div>
            )}
        </div>
    );


};

export default PostList;