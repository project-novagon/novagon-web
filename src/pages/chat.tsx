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
        <img src={photoURL ? photoURL : 'https://novagoncdn.netlify.app/img/guest_pfp.png'} alt="User Avatar" className="rounded-full w-9 h.9"/>
        <div>
          <span className="display-name">{displayName}</span>
          <p className="flex-wrap">{text}</p>
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

  await addDoc(publicChatRef, {
    text: formValue,
    sendDate: serverTimestamp(),
    uid,
    photoURL,
    displayName,
  });
  
      setFormValue('');
    };
  
    return (
      <div className="flex w-full h-96">
        <main className="space-y-4">
          {messages &&
            messages.map((message: Message) => (
              <ChatMessage
                key={message.id}
                message={message}
                currentUser={auth.currentUser} // idk what to put here yet
              />
            ))}
        </main>
  
        <form onSubmit={sendMessage} className=" h-[10vh] fixed bottom-0  w-full flex text-xs justify-center items-center dark:bg-black/50 bg-white/50 backdrop-blur-md p-4 z-0">
          <input
            value={formValue}
            onChange={(e) => setFormValue(e.target.value)}
            placeholder="Type your message..."
            className="h-16 px-4 m-1 text-lg leading-3 border-none rounded-md shadow-sm opacity-100 w-96 font-albertsans ring-4 bg-zinc-300 dark:bg-zinc-500 ring-zinc-400 dark:ring-zinc-600 ring-inset focus:ring-zinc-500 focus:ring-4 dark:focus:ring-zinc-700 dark:focus:ring-4"
          />
          <button type="submit" className="w-16 h-16 px-5 transition-all rounded-md shadow-sm dark:bg-zinc-600 bg-primaryBlue-primary hover:shadow-lg">
            <PaperAirplaneIcon className="send-icon" />
            <p className="sr-only">send</p>
          </button>
        </form>
      </div>
    );
  }

export default ChatRoom;