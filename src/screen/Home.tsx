import {
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import * as React from 'react';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import UserModal from '../modal/UserModal';
import Ionicons from 'react-native-vector-icons/Ionicons';

const HomeScreen = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isLocation, setIsLocation] = React.useState(false);

  return (
    <>
      <SafeAreaView />
      <View style={styles.homecontainer}>
        <View style={styles.homeheader}>
          <Text style={styles.boldtext}>Миний байршил</Text>
        </View>
        <View style={styles.homemap}>
          <MapView
            style={{flex: 1}}
            region={{
              latitude: 47.91895732068471,
              longitude: 106.91758284879099,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            }}></MapView>
          <View
            style={{
              position: 'absolute',
              width: '100%',
              height: 90,
              backgroundColor: 'white',
              bottom: 0,
              gap: 20,
              flexDirection: 'row',
              alignItems: 'center',
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            }}>
            <Image
              style={{
                width: 50,
                height: 50,
                borderRadius: 50,
                resizeMode: 'contain',
                marginLeft: 20,
              }}
              source={require('../../assets/profile.png')}
            />
            {isLocation && (<Ionicons
                    style={{position: 'absolute', left:60, bottom:20}}
                    name="ellipse"
                    color="#62C762"
                    size={15}
                    
                  />)}
            <View style={{flex: 1}}>
              <Text style={{fontWeight: '700'}}>Ганболд Насанбат</Text>
              {!isLocation ? (
                <Text style={{color: '#AAAAAA'}}>
                  Та байршилаа хуваалцахгүй байна
                </Text>
              ) : (
                  <Text style={{color: '#AAAAAA'}}>
                    Та байршилаа хуваалцаж байна
                  </Text>
              )}
            </View>
            <Pressable
              style={{marginRight: 20, marginTop: 20, height: '100%'}}
              onPress={() => setIsOpen(true)}>
              <Ionicons name="chevron-up-outline" color="#AAAAAA" size={24} />
            </Pressable>
          </View>
          <UserModal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            isLocation={isLocation}
            setIsLocation={setIsLocation}
          />
        </View>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  homecontainer: {
    flex: 1,
  },
  homeheader: {
    width: '100%',
    padding: 20,
  },
  homemap: {
    flex: 1,
    backgroundColor: '#3333',
  },
  boldtext: {
    fontWeight: '700',
    fontSize: 20,
  },
});
export default HomeScreen;
