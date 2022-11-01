import axios from '../axios';
import { User, Response, Credentials, Status, Receiver } from '../types';

const getFriendsList = () => axios.get<User[]>('/user/friends');
const loginUser = (credentials: Credentials) => axios.post<Response>('/user/login', credentials); 
const getCurrentUser = () => axios.get<User>('/user/current');
const updateStatus = (status: Status) => axios.put<Response>('/user/status', status);
const addFriend = (username: Credentials) => axios.post<Response>('/user/friends', username);
const logoutUser = () => axios.get<Response>('/user/logout');
const addUser = (username: Credentials) => axios.post<Response>('/user/', username);
const removeFriend = (friendid: Receiver) => axios.post<Response>('/user/removeFriend', friendid);


const UserService = {
    getFriendsList,
    loginUser,
    getCurrentUser,
    updateStatus,
    addFriend,
    logoutUser,
    addUser,
    removeFriend
}

export default UserService;