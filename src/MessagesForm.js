import React, {useState} from "react";
import { createMessage } from "./api";


const MessagesForm =  (props) => {

    const [content, setContent] = useState('');
    const {loggedIn, postid} = props
   
    const handleSubmit = async (event) => {
        event.preventDefault();
       await createMessage(content, postid);
        setContent('');
    }


    const handleContent = (event) => setContent(event.target.value)

    
    return (
        <div id='PostForm'>
            <h2>Add your message:</h2>
            {loggedIn ? 
            <>
            <form onSubmit={handleSubmit}>

            <label htmlFor='body'>Your message here</label>
            <input type='text' name='body' value={content} onChange={handleContent} required/>
             <button id="summit" type='submit'>Submit</button>
            </form> </> :  
            <p>Register or login to create a message!</p>}
        </div>
    )

}



export default MessagesForm;
