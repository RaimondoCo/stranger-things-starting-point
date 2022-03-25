import React, { useEffect, useState } from 'react';
import { getPosts, deletePost } from './api';
import UpdateForms from "./UpdateForms"
import MessagesForm from './MessagesForm';

const PostList = (props) => {
    const [messageOpen, setMessageOpen] = useState(false)
    const {posts, setPosts, loggedIn} = props;



// const sortItems = (array) => {
//     return array.createdAt.sort()
// }

    useEffect(async () => {
        const posts = await getPosts();
        setPosts(posts.data.posts);
// sortItems(posts);
    }, []);



    console.log(posts)
    return (
        <div>
            {posts.map(post =>
                <div key={post._id}>
                    <h2>{post.title}</h2>
                    <p>{post.description}</p>
                    <p>{post.price} $</p>
                    {post.isAuthor &&  <UpdateForms loggedIn={loggedIn} postid={post.id}/> }
                   {!post.isAuthor && <button key={post._id} onClick = {()=> {setMessageOpen({open:!messageOpen, id:post._id})}} messageOpen={messageOpen}> Message the author</button>}
                   {!post.isAuthor && messageOpen.open && messageOpen.id === post._id ? <MessagesForm loggedIn={loggedIn} postid={post._id} /> : null }
                </div>
            )}
        </div>
    );


};

export default PostList;