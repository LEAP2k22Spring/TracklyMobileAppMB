import firestore from '@react-native-firebase/firestore';
import {useState} from 'react';
export const useCollection = (path: string) => {
  const getUserData = async (userId: string) => {
    const item = [];
    const users = await firestore().collection(path).doc(userId).get();
    if (users.data()) {
      return users.data();
    } else {
      console.log('no documate');
    }
  };
  const createData = async (docId: string, staffLocationData: any) => {
    firestore()
      .collection(path)
      .doc(docId)
      .set(staffLocationData)
      .then(() => {
        console.log('User added!');
      });
  };
  const updateData = async (userId: string, changeData: any) => {
    firestore()
      .collection(path)
      .doc(userId)
      .update(changeData)
      .then(() => {
        console.log('User updated!');
      });
  };
  const deleteData = async (staffId: string) => {
    firestore()
      .collection(path)
      .doc(staffId)
      .delete()
      .then(() => {
        console.log('User deleted!');
      });
  };
  return {getUserData, updateData, createData, deleteData};
};
