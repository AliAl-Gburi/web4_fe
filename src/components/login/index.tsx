import React, {useState, useEffect} from 'react';
import { AxiosResponse } from 'axios';
import UserService from '../../services/UserService';
import { User, Credentials } from '../../types';
import { resolveModuleNameFromCache } from 'typescript';
type Props = {
    updateUser: Function;
}

const Login: React.FC<Props> = ({ updateUser }) => {

    const [currentUser, setCurrentUser] = useState<User>();
    const [statusMessages, setStatusMessages] = useState<string>();
    const [usernameInput, setUsernameInput] = useState<string>('');



    const loginUser = async (credentials: Credentials) => {
        try {
            
            const res: AxiosResponse<any> = await UserService.loginUser(credentials);
            //setCurrentUser(res.data)
            setStatusMessages('Login Successful')
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
            loginUser(credentialsinput);
            //updateUser();
            //setTimeout(()=>{window.location.reload()}, 1000)
            
            
        }
    }
   
    return (
        <>
        <div className='my-container lilmove' >
            <h1 className='title'>Login</h1>
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

export default Login;
