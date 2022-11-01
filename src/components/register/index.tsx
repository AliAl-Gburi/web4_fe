import React, {useState, useEffect} from 'react';
import { AxiosResponse } from 'axios';
import UserService from '../../services/UserService';
import { User, Credentials } from '../../types';
import { resolveModuleNameFromCache } from 'typescript';
import Header from '../Header';


const Register: React.FC = () => {

    const [currentUser, setCurrentUser] = useState<User>();
    const [statusMessages, setStatusMessages] = useState<string>();
    const [usernameInput, setUsernameInput] = useState<string>('');



    const registerUser = async (credentials: Credentials) => {
        try {
            
            const res: AxiosResponse<any> = await UserService.addUser(credentials);
            
            setStatusMessages('Registration Successful')
        } catch(error: any) {
            setStatusMessages('Something went wrong');
        }
    }

    const handleSubmit = (event: any) => {
        event.preventDefault();
        if(usernameInput?.trim() === '') {
            setStatusMessages('Username cannot be empty');
        }else {
            const credentialsinput = { username: usernameInput};
            console.log(credentialsinput)
            registerUser(credentialsinput);
            
            
            
        }
    }
   
    return (
        <>
        <Header currentUser={currentUser}/>
        <div className='my-container'>
        <h1 className='title'>Register</h1>
        <div className='login-container'>
            
            <form onSubmit={handleSubmit}>
                {console.log(currentUser)}
  <div className="form-outline mb-4">
      {console.log(usernameInput)}
    <input type="text" value={usernameInput} id="username" className="form-control" onChange={(event) => setUsernameInput(event.target.value)} />
    <label className="form-label" >Username</label>
    <div>{statusMessages}</div>
    

  </div>

  <input type="submit" className="btn btn-primary btn-block mb-4" value="Submit" />

  

</form>
        </div>
        </div>
        </>
    )
}

export default Register;
