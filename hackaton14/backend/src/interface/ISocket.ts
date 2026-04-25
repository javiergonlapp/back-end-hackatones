export interface ServerToClientEvents {
  message: (msg: ChatMessage) => void;
  userJoined: (user: string) => void;
  userLeft: (user: string) => void;
}

export interface ClientToServerEvents {
  sendMessage: (text: string) => void;
  setUsername: (username: string) => void;
}

export interface SocketData {
  username: string;
}

export interface ChatMessage {
  id: string;
  user: string;
  text: string;
  timestamp: number;
}
