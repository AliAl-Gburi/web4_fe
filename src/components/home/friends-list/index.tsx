import React, {useState, useEffect, useRef} from 'react';
import { AxiosResponse } from 'axios';
import UserService from '../../../services/UserService';
import MessagesService from '../../../services/MessagesService';
import { User, Credentials, Message, Chat } from '../../../types';
import Messages from '../messages';

type Props = {
   
    currentUser: User | undefined;
   
    onChange?: (selectedFriend: User | undefined) => void;
    
    //setSelectedFriend: (friend: User | null) => void;
    
}
const FriendsList: React.FC<Props> = ({ currentUser, onChange/*, setSelectedFriend*/ }) => {

    
    const [addFriendInput, setAddFriendInput] = useState<string>('');
    const [statusMessage, setStatusMessage] = useState<string>('');
    const [currentIndex, setCurrentIndex] = useState<number>(-1);
    //const [savedFriend, setSavedFriend] = useState<User>();
    const [selectedFriend, setSelectedFriend] = useState<User | undefined>();
    //const [messages, setMessages] = useState<Message[]>([]);

    

    useEffect(() => {
        if(onChange) {
            onChange(selectedFriend)
        }
        /*const interval = setInterval(() => {
            updateCurrentUser();
           
          }, 1000);
          return () => clearInterval(interval);*/
    
       
    }, [selectedFriend, statusMessage]);

    
    

    const updateCurrentUser = async () => {
        const res: AxiosResponse<User> = await UserService.getCurrentUser();
        currentUser = res.data;
    }

   /* const getAllPublicMessages = async () => {
       
        const res: AxiosResponse<Message[]> = await MessagesService.getAllPublicMessages();
        setMessages(res.data);
    };

    const getPrivateMessages = async (chat:Chat) => {
        const res: AxiosResponse<Message[]> = await MessagesService.getPrivateMessages(chat);
        setMessages(res.data);
    }*/


const addFriend = async (name: Credentials) => {
    try {
       const res: AxiosResponse<any> = await UserService.addFriend(name);
        
    } catch(error: any) {
        setStatusMessage("Username doesn't exist");
    } 
}
/*const loadPrivateMessages = (friend:number | undefined) => {
    const chat = { user1: currentUser?.user_id, user2: friend}
   
    getPrivateMessages(chat);
}*/
/*const resaveFriendIfDefined = (friend:User | undefined) => {
    if(friend != null && friend != undefined) {
        setSavedFriend(friend);
    }
}*/

const handleSubmit = (event: any) => {
    event.preventDefault();
    if (addFriendInput.trim() === '') {
        setStatusMessage('Please enter a Username');
    } else {
        const username = {username: addFriendInput}
        addFriend(username);
        updateCurrentUser();
        
    }
    
}

const removeFriend =  async (friend_id: number | null) => {
    const sende = {receiver_id: friend_id}
    const res: AxiosResponse<any> = await UserService.removeFriend(sende);
}

 

    return (
        <>
        
        <div className='friends-list my-module shadow-lg'>
            <form className='my-add-form' onSubmit={handleSubmit}>
                <input value={addFriendInput} onChange={(event) => setAddFriendInput(event.target.value)} className='form-control my-add-field' placeholder='Add friends' type="text" />
                
                <button type='submit' className='btn btn-light add-btn'>Add</button>
                <p className='error-message-light'>{statusMessage}</p>
            </form>
            <p className='friends-title'>My Friends</p>
            <div className='friends-list-table'><table className=' table table-dark table-hover'>
                
                <tbody>
                    {currentUser?.friends && currentUser.friends.map((friend, index) => (
                        <tr className={index === currentIndex ? 'table-active' : ''} key={index} onClick={() => {
                            setCurrentIndex(index);
                            setSelectedFriend(friend)
                           
                            //loadPrivateMessages(friend.user_id);
                        }}>
                            <td>{friend?.username}</td>
                            <td>{friend?.status}</td>
                            <td><button className='btn btn-danger' onClick={() => {
                                console.log(friend.user_id);
                                removeFriend(friend.user_id)
                                
                            }}>Remove</button></td>
                        </tr>
                    ))}
                </tbody>
            </table></div>
            <button className='btn btn-warning public-chat-btn' onClick={() => {
                //getAllPublicMessages();
                setCurrentIndex(-1);
                setSelectedFriend(undefined);
            }}>Public Chat</button>
            
        </div>
        <Messages currentUser={currentUser} selectedFriend={selectedFriend} />
        {console.log(selectedFriend?.user_id)}
        </>
    );
};
export default FriendsList;