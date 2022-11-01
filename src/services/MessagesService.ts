import axios from '../axios';
import { Message, Response, Receiver, Chat} from '../types';

const getAllPublicMessages = () => axios.get<Message[]>('/messages/');
const publishMessage = (message: Message) => axios.post<Response>('/messages/', message);
const getPrivateMessages = (chat:Chat) => axios.post<Message[]>('/messages/private', chat);
const deleteMessage = (messageId: Receiver) => axios.post<Response>('/messages/delete', messageId);

const MessagesService = {
    getAllPublicMessages,
    publishMessage,
    getPrivateMessages,
    deleteMessage
}
export default MessagesService;
