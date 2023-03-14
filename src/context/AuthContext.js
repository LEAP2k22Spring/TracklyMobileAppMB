import {createContext, useContext, useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import { useCollection } from '../firebase/firebase';
const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
  const [user, setUser] = useState(false);
  const [loading, setLoading] = useState(false);


  useEffect(()=>{
    console.log("Bi ajillaj bna");
    const subscriber = auth().onAuthStateChanged((user)=>{
      
      if(user) {setUser(user)};
      if(loading) setLoading(false)
    });
    return subscriber;
  },[])

  const signInWithEmail = async ({email, password}) => {
    console.log(email, password);
    try {
        auth().signInWithEmailAndPassword(email, password);
      } catch (error) {
        console.log(error);
      }
  };

  const logOut = async () => {
    await auth().signOut();
    setUser(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signInWithEmail,
        logOut,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);
