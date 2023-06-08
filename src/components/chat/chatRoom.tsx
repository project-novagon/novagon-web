import React, { useRef, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { PaperAirplaneIcon } from '@heroicons/react/solid';

firebase.initializeApp({
  // Your Firebase config
});

const auth = firebase.auth();
const firestore = firebase.firestore();

interface Message {
  id: string;
  text: string;
  createdAt: firebase.firestore.Timestamp;
  uid: string;
  photoURL: string;
  displayName: string;
}

function ChatRoom() {
  const dummy = useRef<HTMLSpanElement>(null);
  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt').limitToLast(1000);

  const [messages] = useCollectionData<Message>(query, { idField: 'id' });

  const [formValue, setFormValue] = useState('');

  const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { uid, photoURL, displayName } = auth.currentUser!;

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL,
      displayName,
    });

    setFormValue('');
    dummy.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <main>
        {messages &&
          messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} currentUser={auth.currentUser!} />
          ))}

        <span ref={dummy}></span>
      </main>

      <form className="MessageSender" onSubmit={sendMessage}>
        <input
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          className="px-4 m-1 text-lg leading-3 rounded-md shadow-sm opacity-100 w-96 font-albertsans ring-4 bg-zinc-300 dark:bg-zinc-500 ring-zinc-400 dark:ring-zinc-600 ring-inset focus:ring-zinc-500 focus:ring-4 dark:focus:ring-zinc-700 dark:focus:ring-4"
          placeholder="What's on your mind?"
        />

        <button className="px-5 dark:bg-zinc-600 bg-primaryBlue-primary" type="submit" disabled={!formValue}>
          <PaperAirplaneIcon className="w-8" />
        </button>
      </form>
    </>
  );
}

interface ChatMessageProps {
  message: Message;
  currentUser: firebase.User;
}

function ChatMessage(props: ChatMessageProps) {
  const { text, uid, photoURL, displayName } = props.message;
  const messageClass = uid === props.currentUser.uid ? 'sent' : 'received';

  return (
    <>
      <div className={`message ${messageClass}`}>
        <p>{displayName}</p>
        <img className="rounded-full w-9 h-9" src={photoURL || 'https://api.adorable.io/avatars/23'} alt="pfp" />
        <p>{text}</p>
      </div>
    </>
  );
}
