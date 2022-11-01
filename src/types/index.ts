export interface Message {
    message_id: number | null;
    text: string;
    dateTime: string;
    author: User | undefined;
    receiver: User | null | undefined;
   
}
export interface User {
    user_id: number;
    username: string;
    status: string;
    friends: Array<User> | null;
    sentMessages: Array<Message> | null;

}
export interface Receiver {
    receiver_id: number | null
}

export interface Chat {
    user1:number | undefined
    user2:number | undefined
}

export interface Credentials {
    username: string;
}

export interface Status {
    status: string;
}

export interface Response {
    status: 'error' | 'success';
    messageId?: number;
    errorMessage?: string;
}