import React, {useState} from "react";
import { createNewPost } from "./api";


const PostForm =  (props) => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [location, setLocation] = useState(''); 
    const [willDeliver, setWillDeliver] = useState(false);
    const {loggedIn, posts, setPosts} = props

    const [hasTriggeredError, setHasTriggeredError] = useState(false);
   

    const handleSubmit = async (event) => {
        event.preventDefault();
            
        
        const postObject = {
                title: title,
                description: description,
                price: price,
                location: location,
                willDeliver: willDeliver
            
        }



        const sendPost = await createNewPost(postObject);
        
        
        setPosts([...posts, sendPost.data.post]);

        setTitle('');
            setDescription('');
            setPrice('');
            setLocation('');
            setWillDeliver(false);
    }

    
    const handleTitle = (event) => setTitle(event.target.value);
    const handleDescription = (event) => setDescription(event.target.value)
    const handlePrice = (event) => setPrice(event.target.value)
    const handleLocation = (event) => setLocation(event.target.value)
    const handleDeliver = (event) => setWillDeliver(event.target.value)

    if (hasTriggeredError) return <p style={{ color: 'red' }}> Whoopse, looks like you need to fix something! </p>

    return (
        <div id='PostForm'>
            
            {loggedIn ? 
            <>
            <h2>Create a new post:</h2>
            <form onSubmit={handleSubmit}>
            <label htmlFor='title'>Title</label>
            <input type='text' name='Title' value={title} onChange={handleTitle} required/>
            <label htmlFor='description'>Description</label>
            <input type='text' name='description' value={description} onChange={handleDescription} required/>
             <label htmlFor='price'>Price $ </label>
            <input type='number' name='price' value={price} onChange={handlePrice} required/> 
            <label htmlFor='location'> location </label>
            <input type='text' name='location' value={location} onChange={handleLocation} />
            <label htmlFor='willDeliver'> Will deliver? </label>
            <input type='checkbox' name='willDeliver' value={willDeliver} onChange={handleDeliver} />
                
                <button id="summit" type='submit'>Submit</button>
            </form> </> :  
            <p>Register or login to create a post!</p>}
        </div>
    )

}



export default PostForm
