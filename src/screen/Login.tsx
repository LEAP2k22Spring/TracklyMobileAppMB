import {useNavigation} from '@react-navigation/native';
import * as React from 'react';
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import {useAuth} from '../context/AuthContext';
const LoginScreen = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const navigator = useNavigation();
  const {signInWithEmail, user} = useAuth();

  React.useEffect(() => {
    if (user) {
      navigator.navigate('HomeScreen' as never);
    } else navigator.navigate('LoginScreen' as never);
  }, [user]);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.animationContainer}>
      <TouchableNativeFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}>
        <View style={styles.containermain}>
          <View style={styles.containerlogo}>
            <Image
              style={{
                width: 200,
                height: 200,
                resizeMode: 'contain',
                marginLeft: 40,
              }}
              source={require('../../assets/logo.png')}
            />
          </View>
          <View style={styles.containerinput}>
            <TextInput
              onChangeText={setEmail}
              style={[styles.textInput]}
              keyboardType={'email-address'}
              placeholder="И-Мэйл"
            />
            <TextInput
              onChangeText={setPassword}
              style={[styles.textInput]}
              keyboardType={'number-pad'}
              placeholder="Нууц үг"
            />
          </View>
          <View style={styles.containerbutton}>
            <Pressable
              style={[styles.loginButton, styles.centerView]}
              onPress={() => signInWithEmail({email, password})}>
              <Text style={{color: '#ffff', fontSize: 20, fontWeight: '600'}}>
                НЭВТРЭХ
              </Text>
            </Pressable>
          </View>
        </View>
      </TouchableNativeFeedback>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  centerView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  animationContainer: {
    flex: 1,
  },
  containermain: {
    flex: 1,
    flexDirection: 'column',
  },
  containerlogo: {
    flex: 2,
    justifyContent: 'flex-end',
    flexDirection: 'column',
  },
  containerinput: {
    flex: 1,
    alignItems: 'center',
    gap: 30,
  },
  containerbutton: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    width: '80%',
    height: 50,
    borderWidth: 1,
    paddingLeft: 20,
    borderRadius: 10,
    borderColor: '#CECCCC',
  },
  loginButton: {
    width: '80%',
    height: 50,
    backgroundColor: '#000',
    borderRadius: 10,
  },
});
export default LoginScreen;
