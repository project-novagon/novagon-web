import { User as FirebaseAuthUser } from 'firebase/auth';

interface User extends FirebaseAuthUser {
  username: string;
  // Add more properties as needed
}

export type { User };
