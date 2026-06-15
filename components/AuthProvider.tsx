"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { 
  signInWithPopup, 
  signOut as firebaseSignOut, 
  onAuthStateChanged, 
  User as FirebaseUser,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { auth, googleProvider, db } from "@/lib/firebase/config";
import { User } from "@/types";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, pass: string) => Promise<void>;
  signUpWithEmail: (email: string, pass: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribeSnapshot: () => void;

    const unsubscribeAuth = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {  
      if (firebaseUser) {  
        try {  
          // Trigger backend sync to ensure database integrity  
          firebaseUser.getIdToken().then((token) => {  
             fetch("/api/auth/sync", {  
              method: "POST",  
              headers: { Authorization: `Bearer ${token}` },  
            }).catch(console.error);  
          });  

          // Real-time Firestore Listener  
          unsubscribeSnapshot = onSnapshot(doc(db, "users", firebaseUser.uid), (docSnap) => {  
            const firestoreData = docSnap.exists() ? docSnap.data() : {};  

            setUser({  
              id: firebaseUser.uid,  
              uid: firebaseUser.uid,  
              email: firebaseUser.email,  
              displayName: firebaseUser.displayName,  
              photoURL: firebaseUser.photoURL,  
              role: firestoreData.role || "customer",   
              createdAt: firestoreData.createdAt || Date.now(),  
              ...firestoreData   
            } as User);  

            setLoading(false);  
          });  

        } catch (error) {  
          console.error("Auth Error:", error);  
          setUser(null);  
          setLoading(false);  
        }  
      } else {  
        setUser(null);  
        setLoading(false);  
        if (unsubscribeSnapshot) unsubscribeSnapshot();   
      }  
    });  

    return () => {  
      unsubscribeAuth();  
      if (unsubscribeSnapshot) unsubscribeSnapshot();  
    };
  }, []);

  const signInWithGoogle = async () => {
    await signInWithPopup(auth, googleProvider);
  };

  const signInWithEmail = async (email: string, pass: string) => {
    await signInWithEmailAndPassword(auth, email, pass);
  };

  const signUpWithEmail = async (email: string, pass: string) => {
    await createUserWithEmailAndPassword(auth, email, pass);
  };

  const signOut = async () => {
    await firebaseSignOut(auth);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signInWithGoogle, signInWithEmail, signUpWithEmail, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
