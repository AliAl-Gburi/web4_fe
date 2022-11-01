import React, {useState, useEffect} from 'react';
import {User} from '../../../types';
import { Message } from '../../../types';
import UserService from '../../../services/UserService';
import {AxiosResponse} from 'axios';
import MessagesService from '../../../services/MessagesService';

type Props = {
    message: Message;
    currentUser: User | undefined;
}

const MessageEl: React.FC<Props> = ({ message, currentUser }: Props) => {
    const nicedate = message?.dateTime.replace('T', ' ').slice(0, 19)
   
    const deleteMessage = async (messageId: number | null) => {
  
         const mess = {receiver_id: message.message_id};
       
         const res: AxiosResponse<any> = await MessagesService.deleteMessage(mess);
          
      
  }
    
  
    
    return (
            

            <div className="message-el"  >
              <div className={currentUser?.user_id == message.author?.user_id ? 'mes-right' : 'mes-left'}>
                <div className="d-flex flex-start">
                    
                 
                  <div className="flex-grow-1 flex-shrink-1">
                    <div >
                      <div className="d-flex justify-content-between align-items-center">
                        <p className="mb-1">
                          {message.author?.username} <span className="message-date"> - {nicedate}</span> {currentUser?.user_id == message.author?.user_id  &&
        <button className='btn btn-danger' onClick={() => {
          deleteMessage(message.message_id);
        }}>Delete</button>
      }
                        </p>
                      </div>
                      <p className="message-text">
                        {message.text}
                      </p> 
                    </div>

                    
                      </div>
                    </div>
                  </div>
                </div>
    );
}
export default MessageEl;

