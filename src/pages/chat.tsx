import { auth, db } from "../firebase-config";
import { doc, getDoc, Timestamp, collection, serverTimestamp, query, orderBy, DocumentData, Query, addDoc, CollectionReference } from "firebase/firestore";
import { User, onAuthStateChanged } from "firebase/auth";
import { PaperAirplaneIcon } from '@heroicons/react/24/outline'
import { useRef, useState } from "react";
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useAuthState } from "react-firebase-hooks/auth";
import { Airplane, SendDiagonal } from "iconoir-react";


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

    const dummy = useRef< null | HTMLSpanElement>(null);

    const publicChatRef = collection(db, 'public-room');

    const listAllMessages = query(publicChatRef, orderBy('sendDate')) as Query<Message>;

    const [messages] = useCollectionData<Message>(listAllMessages);

    const [formValue, setFormValue] = useState('');

    const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

  const { uid, photoURL, displayName } = auth.currentUser || {};

  if(formValue.match(/^\s*$/mg)){
    console.warn("Please enter a message")
  } else {
    await addDoc(publicChatRef, {
      text: formValue,
      sendDate: serverTimestamp(),
      uid,
      photoURL,
      displayName,
    });
  }

  if (dummy.current != undefined) {
    // 👉️ TypeScript knows that ref is not null here
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  }
      setFormValue('');
    };
  
    return (
      <div className="flex flex-col w-full h-96">
        <main className="block space-y-4">
          <h2 className="text-2xl bg-black/50 p-5 rounded-md shadow-lg sticky top-5 backdrop-blur before:content-['_#']">public-room</h2>
          {messages &&
            messages.map((message: Message) => (
              <ChatMessage
                key={message.id}
                message={message}
                currentUser={auth.currentUser} // idk what to put here yet
              />
            ))}
            <span ref={dummy}></span>
        </main>

          <form onSubmit={sendMessage} className="h-[10vh] sticky bottom-0 py-1 w-screen flex text-xs justify-center items-center">
          <input
            value={formValue}
            onChange={(e) => setFormValue(e.target.value)}
            placeholder="Chat in #public-room"
            className="w-64 h-16 px-4 m-1 text-lg leading-3 shadow-sm opacity-100 rounded-xl font-albertsans focus:outline-0 focus:ring-2 focus:ring-mauve bg-surface1 text-text"
          />
          <button type="submit" className="flex items-center justify-center w-16 h-16 transition-all shadow rounded-xl bg-surface1 hover:bg-surface2 focus:ring-2 focus:ring-mauve">
            <SendDiagonal className="w-6 h-6" />
            <p className="sr-only">send</p>
          </button>
        </form>

      </div>
    );
  }

export default ChatRoom;
