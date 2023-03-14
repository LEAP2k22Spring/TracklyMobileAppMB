import {
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import * as React from 'react';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import UserModal from '../modal/UserModal';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useCollection} from '../firebase/firebase';
import {useAuth} from '../context/AuthContext';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import {} from 'react-native-gesture-handler';
import Geolocation from 'react-native-geolocation-service';
import {request, PERMISSIONS} from 'react-native-permissions';

const HomeScreen = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isLocation, setIsLocation] = React.useState(false);
  const [staffData, setStaffData] = React.useState<any>();
  const {getUserData, updateData} = useCollection('users');
  const {createData, deleteData} = useCollection('location');
  const [coords, setCoords] = React.useState<any>([])
  const {user, logOut} = useAuth();
  console.log(coords);
  
  React.useEffect(() => {
    (async () => {
      const result: any = await getUserData(user.uid);
      if (result) {
        setStaffData(result);
      } else {
        console.log('No such document!');
      }
    })();
  }, [user]);
  const sheetRef = React.useRef<BottomSheet>(null);
  const snapPoints = ['13%', '40%'];
  const handleSnapPress = React.useCallback((index: any) => {
    sheetRef.current?.snapToIndex(index);
  }, []);

  const handlerLocation = () => {
    request(PERMISSIONS.IOS.LOCATION_ALWAYS).then(result => {
      console.log(result);
      Geolocation.getCurrentPosition(position => {
        console.log(position.coords);
        createData(user?.uid, {
          firstname: staffData?.firstname,
          lastname: staffData?.lastname,
          img: staffData?.img,
          coords: [47.91804573251184, 106.92599222374862],
          status:'active'
        });
      });
    });
  };

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
            }}>
            <Marker
              coordinate={{
                latitude: 47.91895732068471,
                longitude: 106.91758284879099,
              }}
              title="My location"
              pinColor="gold"></Marker>
          </MapView>
        </View>
        <BottomSheet snapPoints={snapPoints} ref={sheetRef}>
          <BottomSheetView
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              backgroundColor: 'white',
              flexDirection: 'row',
              alignItems: 'center',
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            }}>
            {!isOpen ? (
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  top: -120,
                  gap: 10,
                  alignItems: 'center',
                }}>
                <Image
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 50,
                    resizeMode: 'contain',
                    marginLeft: 20,
                  }}
                  source={{uri: staffData?.img}}
                />
                {isLocation && (
                  <Ionicons
                    style={{position: 'absolute', left: 60, bottom: 0}}
                    name="ellipse"
                    color="#62C762"
                    size={15}
                  />
                )}
                <View style={{flex: 1}}>
                  <Text style={{fontWeight: '700'}}>
                    {staffData?.firstname} {staffData?.lastname}
                  </Text>
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
                  style={{marginRight: 20, marginTop: -20, height: '100%'}}
                  onPress={() => {
                    handleSnapPress(1), setIsOpen(true);
                  }}>
                  <Ionicons
                    name="chevron-up-outline"
                    color="#AAAAAA"
                    size={24}
                  />
                </Pressable>
              </View>
            ) : (
              <View style={{flex: 1}}>
                <View style={styles.modalprofile}>
                  <Image
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: 50,
                      resizeMode: 'contain',
                    }}
                    source={{uri: staffData?.img}}
                  />
                  <Text style={{fontSize: 17, fontWeight: '700'}}>
                    {staffData?.firstname} {staffData?.lastname}
                  </Text>
                  <Pressable
                    style={{position: 'absolute', top: 0, right: 30}}
                    onPress={() => {
                      handleSnapPress(0), setIsOpen(false);
                    }}>
                    <Ionicons
                      name="chevron-down-outline"
                      color="#AAAAAA"
                      size={24}
                    />
                  </Pressable>
                </View>
                <View style={styles.modalinputs}>
                  {isLocation ? (
                    <Pressable
                      style={[styles.buttonstyle, {backgroundColor: '#000'}]}
                      onPress={() => {
                        setIsLocation(false),
                          updateData(user.uid, {status: 'deactive'}), deleteData(user.uid);
                      }}>
                      <Text style={{color: 'white'}}>Зогсоох</Text>
                    </Pressable>
                  ) : (
                    <Pressable
                      style={[styles.buttonstyle, {backgroundColor: '#000'}]}
                      onPress={() => {
                        setIsLocation(true),
                          handlerLocation(),
                          updateData(user.uid, {status: 'active'});
                        
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
            )}
          </BottomSheetView>
        </BottomSheet>
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
  modalprofile: {
    flex: 0.7,
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
export default HomeScreen;
