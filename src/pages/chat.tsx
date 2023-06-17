import { auth, db } from "../firebase-config";
import { doc, getDoc, Timestamp, collection, serverTimestamp, query, orderBy, DocumentData, Query, addDoc, CollectionReference } from "firebase/firestore";
import { User, onAuthStateChanged } from "firebase/auth";
import { PaperAirplaneIcon } from '@heroicons/react/24/outline'
import { useState } from "react";
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useAuthState } from "react-firebase-hooks/auth";


interface Message {
    id: string;
    text: string;
    sendDate: Timestamp | Date;
    uid: string;
    photoURL: string;
    displayName: string;
  }

interface ChatMessageProps {
    message: Message;
    currentUser: User | null;
  }

function ChatMessage(props: ChatMessageProps) {
    const { message, currentUser } = props;
    const { text, uid, photoURL, displayName } = message;
    const messageClass = uid === currentUser?.uid ? 'sent' : 'received';
  
    return (
      <div className={`message ${messageClass}`}>
        <img src={photoURL} alt="User Avatar" />
        <div>
          <span className="display-name">{displayName}</span>
          <p>{text}</p>
        </div>
      </div>
    );
  }

  function ChatRoom() {

    const publicChatRef = collection(db, 'messages');

    const listAllMessages = query(publicChatRef, orderBy('sendDate')) as Query<Message>;

    const [messages] = useCollectionData<Message>(listAllMessages);

    const [formValue, setFormValue] = useState('');
  
    const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
  
  const { uid, photoURL, displayName } = auth.currentUser || {};

  await addDoc(listAllMessages, {
    text: formValue,
    sendDate: serverTimestamp(),
    uid,
    photoURL,
    displayName,
  });
  
      setFormValue('');
    };
  
    return (
      <div>
        <main>
          {messages &&
            messages.map((message: Message) => (
              <ChatMessage
                key={message.id}
                message={message}
                currentUser={} // idk what to put here yet
              />
            ))}
        </main>
  
        <form onSubmit={sendMessage}>
          <input
            value={formValue}
            onChange={(e) => setFormValue(e.target.value)}
            placeholder="Type your message..."
          />
          <button type="submit">
            <PaperAirplaneIcon className="send-icon" />
          </button>
        </form>
      </div>
    );
  }

export default ChatRoom;