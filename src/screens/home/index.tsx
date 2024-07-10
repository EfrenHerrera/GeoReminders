
import React, { useContext, useEffect, useState } from 'react'
import { SafeAreaView, Text, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Icon, useTheme, Button } from '@rneui/themed'
import MapView, { Circle, Marker } from 'react-native-maps'
import * as Location from 'expo-location'

import { getRemindersByUser } from '@core/services/reminderService'
import { useStyles } from '@core/theme/overrides'
import { getPosition, getUser } from '@core/services/userService'
import { RemindersContext } from '@core/providers/reminderProvider'
import { Reminder } from '@core/models/reminder'
import { calculateRegion, getCurrentPosition } from '@core/services/geolocationService'


const Home: React.FC<any> = (props) => {
    const { theme: { colors } } = useTheme();
    const styles = useStyles()

    const { reminders, updateReminders } = useContext(RemindersContext);

    const [username, setUsername] = useState<string>('')
    const [userPosition, setUserPosition] = useState<any>(null)

    useEffect(() => {
        const loadLocation = async () => {
            const coords = await getCurrentPosition()
            setUserPosition(coords);

            Location.watchPositionAsync(
                {
                    accuracy: Location.Accuracy.High,
                    timeInterval: 5000,
                    distanceInterval: 1,
                },
                ({ coords }) => {

                    if( 
                        userPosition !== null && 
                        (coords.latitude - userPosition.latitude) > 0.0001 && 
                        (coords.longitude - userPosition.longitude) > 0.0001
                    ) return
                    setUserPosition(coords);
                }
            );
        }
        _loadData()
        getUser().then(user => setUsername(user))
        loadLocation()
    }, [])

    const _loadData = async () => {
        const remindersUser = await getRemindersByUser();
        updateReminders(remindersUser)
    }

    const handleLogout = async () => {
        await AsyncStorage.removeItem('token')
        await AsyncStorage.removeItem('user')
        props.navigation.replace('Auth')
    }

    return (
        <View style={{ marginHorizontal: 20, flex: 1 }}>
            <SafeAreaView />
            <View style={[styles.flexJustifyBetween]}>
                <Text style={[styles.title]}>
                    Hellow {username}
                </Text>
                <Button type='outline' icon={
                    <Icon name='logout' size={20} color={colors.error} />
                } onPress={handleLogout} />
            </View>
            <View style={{ flex: 1, marginVertical: 30 }}>
                <MapView
                    style={{ width: '100%', height: '100%', borderRadius: 10 }}
                    region={calculateRegion( userPosition ? [{location: userPosition}, ...reminders] : reminders)}
                    scrollEnabled
                    zoomTapEnabled={false}
                    zoomEnabled
                    followsUserLocation={true}
                    zoomControlEnabled={false}
                >
                    {
                        userPosition && (
                            <>
                                <Marker
                                    key='user-marker'
                                    coordinate={userPosition}
                                    title="You"
                                    description="Your location">
                                    <Icon 
                                        name='circle' size={12} 
                                        color={"rgba(24, 119, 242, 1)"} 
                                        style={{borderColor: 'white', borderWidth:1, borderRadius: 12}} />
                                </Marker>
                                <Circle
                                    key='user-radius'
                                    center={userPosition}
                                    radius={80} // Convertimos kilómetros a metros
                                    strokeColor="rgba(24, 119, 242, 0.5)"
                                    fillColor="rgba(24, 119, 242, 0.2)"
                                />
                            </>
                        )
                    }
                    {
                        reminders.map((reminder: Reminder, index: number) => (
                            <>
                                <Marker
                                    key={index}
                                    coordinate={reminder.location}
                                    title={reminder.title}
                                    description={reminder.description}
                                />
                                {reminder.radius > 0 && (
                                    <Circle
                                        center={reminder.location}
                                        radius={reminder.radius * 1000} // Convertimos kilómetros a metros
                                        strokeColor="rgba(24, 119, 242, 0.5)"
                                        fillColor="rgba(24, 119, 242, 0.2)"
                                    />
                                )}
                            </>
                        ))
                    }
                </MapView>
            </View>
        </View>
    )
}

export default Home