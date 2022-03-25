import React, {useState, useEffect} from "react";
import { updateNewPost, getPosts, deletePost } from "./api";




const UpdateForms =  (props) => {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState('');
    const [location, setLocation] = useState(''); 
    const [willDeliver, setWillDeliver] = useState('');
    const [postid, setPostid] = useState("")
    const [posts, setPosts] = useState([]);
    const { postId} = props
    const [hasTriggeredError, setHasTriggeredError] = useState(false);
    const [editOpen, setEditOpen] = useState(false)
    
    const handleDelete = (postid, event) => {
        event.preventDefault();
        deletePost(postid);
        const remainingPosts = posts.filter(() => postid !== postId);
        setPosts(remainingPosts);
    }

    useEffect(async () => {
        const getPost = await getPosts();
        setPosts(getPost.data.posts);
        posts.map((post => {
            setTitle(post.title);
                setDescription(post.description);
                setPostid(post.postid);
        }))
    }, []);

    const postObject = {
        title: title,
        description: description,
        price: price,
        location: location,
        willDeliver: willDeliver
    }


    const handleSubmit = async (event) => {
        event.preventDefault();
        await updateNewPost(postId, postObject);
    }
    
    const handleTitle = (event) => setTitle(event.target.value);
    const handleDescription = (event) => setDescription(event.target.value)
    const handlePrice = (event) => setPrice(event.target.value)
    const handleLocation = (event) => setLocation(event.target.value)
    const handleDeliver = (event) => setWillDeliver(event.target.value)

    if (hasTriggeredError) return <p style={{ color: 'red' }}> Whoopse, looks like you need to fix something! </p>

    return (
        <div id='PostForm' key={postId} >
            
         <>    
         <button onClick={() => {setEditOpen(!editOpen)}}>Edit</button>
         <button onClick = {(event)=> {handleDelete(postId, event)}}>Delete</button>
          { editOpen ? (<form onSubmit={handleSubmit}>
            <label htmlFor='title'>Title</label>
            <input type='text' name='Title' value={title} onChange={handleTitle} />
            <label htmlFor='description'>Description</label>
            <input type='text' name='description' value={description} onChange={handleDescription} />
             <label htmlFor='price'>Price $ </label>
            <input type='number' name='price' value={price} onChange={handlePrice} /> 
            <label htmlFor='location'> location </label>
            <input type='text' name='location' value={location} onChange={handleLocation} />
            <label htmlFor='willDeliver'> Will deliver? </label>
            <input type='checkbox' name='willDeliver' value={willDeliver} onChange={handleDeliver} />
                <button id="summit" type='submit'>Submit</button>
            </form>) : null }</> 
        </div>
    )

}



export default UpdateForms