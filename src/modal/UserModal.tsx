import {useNavigation} from '@react-navigation/native';
import {Dispatch} from 'react';
import {
  Alert,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useAuth} from '../context/AuthContext';

type ModalPropsType = {
  isOpen: boolean;
  setIsOpen: Dispatch<boolean>;
  isLocation: boolean;
  setIsLocation: any;
  data: any;
};
const UserModal = ({
  isOpen,
  setIsOpen,
  isLocation,
  setIsLocation,
  data,
}: ModalPropsType) => {
  const navigator = useNavigation();
  const {logOut} = useAuth();

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isOpen}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setIsOpen(!isOpen);
      }}>
      <View style={styles.modalcontainer}>
        <View style={styles.modalprofile}>
          <Image
            style={{
              width: 60,
              height: 60,
              borderRadius: 50,
              resizeMode: 'contain',
            }}
            source={{uri: data?.img}}
          />
          <Text style={{fontSize: 17, fontWeight: '700'}}>
            {data?.firstname} {data?.lastname}
          </Text>
          <Pressable
            style={{position: 'absolute', top: 30, right: 30}}
            onPress={() => setIsOpen(false)}>
            <Ionicons name="chevron-down-outline" color="#AAAAAA" size={24} />
          </Pressable>
        </View>
        <View style={styles.modalinputs}>
          {isLocation ? (
            <Pressable
              style={[styles.buttonstyle, {backgroundColor: '#000'}]}
              onPress={() => {
                setIsLocation(false), setIsOpen(false);
              }}>
              <Text style={{color: 'white'}}>Зогсоох</Text>
            </Pressable>
          ) : (
            <Pressable
              style={[styles.buttonstyle, {backgroundColor: '#000'}]}
              onPress={() => {
                setIsLocation(true), setIsOpen(false);
              }}>
              <Text style={{color: 'white'}}>Байршил хуваалцах</Text>
            </Pressable>
          )}
          <Pressable
            style={[styles.buttonstyle, {borderWidth: 1}]}
            onPress={() => {
              setIsOpen(false), setIsLocation(false);
              logOut();
            }}>
            <Text>Гарах</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  modalcontainer: {
    width: '100%',
    height: 300,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
  },
  modalprofile: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  modalinputs: {
    flex: 1,
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonstyle: {
    width: '60%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
});
export default UserModal;
