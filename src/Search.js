// import React, { useEffect, useState } from 'react';
// import { getPosts } from './api';


// const SearchPost = (props) => {
//     const {posts, setPosts} = props;

//     useEffect(async () => {
//         const posts = await getPosts();
//         setPosts(posts.data.posts);
//         console.log(posts.data.posts)
//     }, []);

//     const handleSubmit = async (event) => {
//         event.preventDefault();

//         const entry = event.target.value

//         //fetch all titles and descriptions in posts
//         //filter titles and descriptions that contain the entry
//         //return the posts that contain the entry


     
//     }

//     return (
//      <form id="search">
//          <fieldset>
//           <label htmlFor="text">Search..</label>
//           <input 
//             type="text" 
//             placeholder="enter text..." 
//             onChange={handleSubmit}/>

//         </fieldset> 
//         <button className="search" type='search'>Search</button>
//     </form>)
        

// };

// export default SearchPost;