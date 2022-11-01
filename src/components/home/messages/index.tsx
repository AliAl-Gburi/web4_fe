import { AxiosResponse } from 'axios';
import React, { useState, useEffect } from 'react';
import {User} from '../../../types';
import MessagesService from '../../../services/MessagesService';
import UserService from '../../../services/UserService';
import { Message, Chat } from '../../../types';
import MessageEl from './messageEl'

type Props = {
    
    currentUser: User | undefined;
    selectedFriend: User | undefined;
    //messages: Message[];
}

const Messages: React.FC<Props> = ({ currentUser, selectedFriend }) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [messageInput, setMessageInput] = useState<string>('');
    const [statusMessages, setStatusMessages] = useState<string>('');
    const [messageSelectedFriend, setMessageSelectedFriend] = useState<number | undefined>(0);
    
    
    
  
    


useEffect(() => {
   // setMessageSelectedFriend(selectedFriend)
   loadMessages(selectedFriend?.user_id);
    const interval = setInterval(() => {
        loadMessages(selectedFriend?.user_id);
        console.log(selectedFriend)
      }, 1000);
      return () => clearInterval(interval);
}, [selectedFriend]);

/*const getAllPublicMessages = async () => {
    console.log(selectedFriend)
    
    const receiver_id = 2
   
    const res: AxiosResponse<Message[]> = await MessagesService.getAllPublicMessages(receiver_id);
    setMessages(res.data);
};*/

const publishMessage = async (message: Message) => {
    try {
        const res: AxiosResponse<any> = await MessagesService.publishMessage(message);

    } catch(error: any) {
        setStatusMessages('Message not sent');
    }


    
}
const getAllPublicMessages = async () => {
       
    const res: AxiosResponse<Message[]> = await MessagesService.getAllPublicMessages();
    setMessages(res.data);
}

const getPrivateMessages = async (chat:Chat) => {
    const res: AxiosResponse<Message[]> = await MessagesService.getPrivateMessages(chat);
    
    setMessages(res.data);
}

const handleSubmit = (event: any) => {
    event.preventDefault();
    if(messageInput.trim() === '') {
        console.log("no message")
    } else {
        const date = new Date().toISOString()
        const nicedate = date.replace('T', ' ').slice(0, 19)
       // const ndate = `${date.getFullYear()}-${date.getDate()}-${date.getDay()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
       if(selectedFriend) {
        const message = {
            message_id: null,
            text: messageInput,
            dateTime: nicedate,
            author: currentUser,
            receiver: selectedFriend
        }

        publishMessage(message)
        loadMessages(selectedFriend?.user_id)
       } else {
        const message = {
            message_id: null,
            text: messageInput,
            dateTime: nicedate,
            author: currentUser,
            receiver: null
        }

        publishMessage(message)
        

       }
        
        
        setMessageInput('');
    }
}

const loadMessages = (selectedFriend:number | undefined) => {
    if(selectedFriend) {
        const chat = { user1: currentUser?.user_id, user2: selectedFriend}
        console.log(chat)
        getPrivateMessages(chat);
    } else {
        getAllPublicMessages();
    }
    
        
   
       
    
    
    
}



return (
    <div className="messages my-module">
        <div className='messages-area'>
               {messages && messages
                .map((message, index) => (
                    <MessageEl message={message} currentUser={currentUser} key={index}/>
                ))
               }
               </div>
               <div className='message-form'>
                   <form onSubmit={handleSubmit}>
                   <input type="text" value={messageInput} onChange={(event) => setMessageInput(event.target.value)}  className='form-control message-field' />
                   <button type='submit' className='btn btn-warning my-send'>Send</button>
                   </form>
               </div>
    </div>
)
    

};

export default Messages;