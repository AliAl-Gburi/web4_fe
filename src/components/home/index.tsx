import React, {useState, useEffect} from 'react';
import { User } from '../../types';
import {AxiosResponse} from 'axios';
import FriendsList from './friends-list';
import UserService from '../../services/UserService';
import Login from '../login';
import Messages from './messages';
import Status from './status';
import Header from '../Header';

type Props = {
   
    
    onChange?: (currentUser: User | undefined) => void;
    //setSelectedFriend: (friend: User | null) => void;
    
}
const Home: React.FC<Props> = ({onChange}) => {
    
    const [currentUser, setCurrentUser] = useState<User>();
    //const [selectedFriend, setSelectedFriend] = useState<User | null>(null);
    
    useEffect(() => {
        const interval = setInterval(() => {
            getCurrentUser();
           
          }, 1000);
          return () => clearInterval(interval);
        
        /*if(onChange) {
            onChange(currentUser)
        }*/
        
    }, [currentUser])
  
      const getCurrentUser = async () => {
        const res: AxiosResponse<User> = await UserService.getCurrentUser();
        setCurrentUser(res.data)
    }
    
    
    
    return (
        <>
        <Header currentUser={currentUser} />
        <div className='my-container'>
            
                
               
                { currentUser?.user_id && <Status currentUser={currentUser} updateUser={getCurrentUser} />     }
                { currentUser?.user_id &&  <FriendsList currentUser={currentUser}  />  }
                { !currentUser?.user_id && <Login updateUser={getCurrentUser}/>}
            </div> 
            </>
    )
}
export default Home;