import React, {useState} from "react";
import { getMessages } from "./api";


const MessagesForm =  (props) => {

   
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [message, setNewMessage] = useState('')
    const {loggedIn} = props
   

    const handleSubmit = async (event) => {
        event.preventDefault();
            
        const postMessage = {
                title: title,
                description: description,
            }

        const sendMessage = await getMessages(postMessage);
        setNewMessage([...message, sendMessage.data.message]);
        setTitle('');
        setDescription('');
    }

    
    const handleTitle = (event) => setTitle(event.target.value);
    const handleDescription = (event) => setDescription(event.target.value)

    
    return (
        <div id='PostForm'>
            <h2>Add your message:</h2>
            {loggedIn ? 
            <>
            <form onSubmit={handleSubmit}>
            <label htmlFor='title'>Subject</label>
            <input type='text' name='Subject' value={title} onChange={handleTitle} required/>
            <label htmlFor='body'>Your message here</label>
            <input type='text' name='body' value={description} onChange={handleDescription} required/>
             <button id="summit" type='submit'>Submit</button>
            </form> </> :  
            <p>Register or login to create a message!</p>}
        </div>
    )

}



export default MessagesForm;
