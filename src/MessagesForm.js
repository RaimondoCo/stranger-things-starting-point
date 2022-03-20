import React, {useState} from "react";
import { getMessageId, createMessage } from "./api";


const MessagesForm =  (postid, props) => {

   
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [message, setNewMessage] = useState('')
    const {loggedIn} = props
   



    const handleSubmit = async (event) => {
        event.preventDefault();
        
        const postid = (e) => e.currentTarget.id;
      
        //const MessageId = await getMessageId(postid);
        
        const postMessage = {
                // _id: MessageId,
                title: title,
                description: description,
            }

        const createdPostMessage = await createMessage(postMessage, postid);

        setNewMessage(createdPostMessage);

        setTitle('');
        setDescription('');
    }

    
    const handleTitle = (event) => setTitle(event.target.value);
    const handleDescription = (event) => setDescription(event.target.value)

    
    return (
        <div id='PostForm'>
            <h2>Add your message:</h2>
            {!loggedIn ? 
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
