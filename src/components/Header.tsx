import React, {useState, useEffect} from 'react';
import { AxiosResponse } from 'axios';
import {User} from '../types';
import { Link } from 'react-router-dom';
import UserService from '../services/UserService';
import Register from './register';

type Props = {
  currentUser: User | undefined;
}

const Header: React.FC<Props> = ({currentUser}) => {

  //const [currentUser, setCurrentUser] = useState<User>();

    useEffect(() => {
        //userLoggedIn();
    }, [currentUser]);

   /* const userLoggedIn = async () => {
        const res: AxiosResponse<User> = await UserService.getCurrentUser();
        setCurrentUser(res.data)
    }*/

    const logout = async (event: any) => {
      const res: AxiosResponse<{}> =  await UserService.logoutUser();
      console.log(res.data)
      setTimeout(()=>{window.location.reload()}, 500)
    }

    return (
        <header className="p-3 bg-dark text-white">
        <div className="container">
      <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
        <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
          Student Book
        </a>

        <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
          <li> </li>
        </ul>

        

        <div className="text-end">
        
          
             { !currentUser?.user_id && <Link  to="/" className='btn btn-warning my-btns'>
                                Login
                            </Link> }
          {!currentUser?.user_id && <Link  to="/register" className='btn btn-warning my-btns'>
                                Register
                            </Link>}
          
          { currentUser && <button onClick={logout} type="button" className="btn btn-warning my-btns">Logout</button> } 
          { currentUser && <button onClick={logout} type="button" className="btn btn-danger my-btns">Delete User</button> } 
        </div>
      </div>
    </div>
  </header>
    );

}

export default Header;