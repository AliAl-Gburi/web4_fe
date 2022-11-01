import React, { useState, useEffect } from 'react';
import {AxiosResponse} from 'axios';
import UserService from '../../../services/UserService';
import {User, Status} from '../../../types';

type Props = {
   
    currentUser: User | undefined;
    updateUser: Function;
}

const Status: React.FC<Props> = ({ currentUser, updateUser }) => {

    
    const [selectedStatus, setSelectedStatus] = useState<string>("");
    const [updateState, setUpdateState] = useState<number>();
    const [statusMessage, setStatusMessage] = useState<string>("");



    useEffect(() => {

    }, [currentUser])

    const updateStatus = async (status:Status) => {
        try {
            console.log(status)
            await UserService.updateStatus(status);
            


        } catch (error: any) {
            setStatusMessage("Something went wrong");
        }
    }

    const handleSubmit = (event: any) => {
        event.preventDefault();
        if (selectedStatus.trim() === '') {
            setStatusMessage("Please select a status");
        } else {
            const statusInput = {status: selectedStatus}
            updateStatus(statusInput);
            setTimeout(function() { updateUser();}, 100);
            
            
        }
    }

  
   

    
    
    

    return (
        <div className='status my-module shadow-lg'>
            <div className='user-status'><p>{currentUser?.username} - {currentUser?.status}</p></div>
            {console.log("XD")}
            {console.log(currentUser)}
            <form onSubmit={handleSubmit}>
            <select value={selectedStatus} onChange={(event) => setSelectedStatus(event.target.value)} className="form-select my-status-select" >
                <option hidden>Update Status</option>
                <option value="online">online</option>
                <option value="offline">offline</option>
                <option value="away">away</option>
        </select>
        <button type='submit' className='btn btn-light my-update'>Update</button>
        </form>
        </div>
    );
};
export default Status;