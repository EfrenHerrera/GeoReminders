import React, { useContext, useState } from 'react'
import { Text, View } from 'react-native'
import { format } from 'date-fns'
import { es } from 'date-fns/locale';


import { Reminder } from '@core/models/reminder'
import { useStyles } from '@core/theme/overrides'
import MapView, { Circle, Marker } from 'react-native-maps';
import { Button, Icon, useTheme } from '@rneui/themed';
import { deleteReminder, getRemindersByUser } from '@core/services/reminderService';
import { RemindersContext } from '@core/providers/reminderProvider';

interface Props {
    reminder: Reminder,
    openModal: (reminder: Reminder) => void
}

const CardReminder: React.FC<Props> = (props) => {
    const { reminder, openModal } = props
    const {updateReminders} = useContext(RemindersContext)
    const {theme: { colors }} = useTheme()
    const styles = useStyles()
    const [viewMap, setViewMap] = useState<boolean>(false)

    const kmPerDegreeLatitude = 110.574 / 2.2; 
    const kmPerDegreeLongitude = (111.320 * Math.cos(reminder.location.latitude * Math.PI / 180));
    const radius = reminder.radius > 0 ? reminder.radius : 0.5;
    const latitudeDelta = radius / kmPerDegreeLatitude;
    const longitudeDelta = radius / kmPerDegreeLongitude;

    const handleDelete = async () => {
        deleteReminder(reminder)
        const reminders = await getRemindersByUser()
        updateReminders(reminders)
    }

    const validateStatus = () => {
        const today =  new Date()
        if(new Date(reminder.endDate) >= today || reminder.endDate === null) {
            return colors.success
        }
        return  colors.error
    }

    return (
        <View style={[styles.card, { rowGap: 10, marginBottom: 25 }]}>
            <View style={[styles.betweenCenter]}>
                <View style={[styles.startCenter, {columnGap:5}]}>
                    <Text style={[styles.title]}>{reminder.title}</Text>
                    <Icon name='circle' size={20} color={validateStatus()} />
                </View>
                <View style={[styles.row, {columnGap:15}]}>
                    {/* Edit button */}
                    <Icon name='pen' color={colors.warning} onPress={() => openModal(reminder)} />
                    {/* Delete button */}
                    <Icon name='delete' color={colors.error} onPress={handleDelete} />
                </View>
            </View>

            <View>
                <Text style={[styles.titlesCard, {}]}>Description</Text>
                <Text style={[]}>{reminder.description !== "" ? reminder.description : "N/A"}</Text>
            </View>

            <View>
                <Text style={[styles.titlesCard]}>Duration</Text>
                <Text>
                    {format(reminder.startDate, 'dd/MM/yyyy', { locale: es })} - {
                    reminder.endDate ? 
                        format(reminder.endDate, 'dd/MM/yyyy', { locale: es }) : 'Sin fecha de fin'
                    }
                </Text>
            </View>

            {
                viewMap &&
                <View style={{ height: 190 }}>
                    <MapView
                        style={{ width: '100%', height: '100%', borderRadius: 10 }}
                        region={{
                            ...reminder.location,
                            latitudeDelta,
                            longitudeDelta
                        }}
                        scrollEnabled
                        zoomTapEnabled={false}
                        zoomEnabled
                        followsUserLocation={true}
                        zoomControlEnabled={false}
                    >
                        <Marker coordinate={reminder.location} />
                        {reminder.radius > 0 && (
                            <Circle
                                center={reminder.location}
                                radius={reminder.radius * 1000} // Convertimos kilómetros a metros
                                strokeColor="rgba(24, 119, 242, 0.5)"
                                fillColor="rgba(24, 119, 242, 0.2)"
                            />
                        )}
                    </MapView>
                </View>
            }
            <Button type='outline' onPress={() => setViewMap(!viewMap)} style={{ marginTop: 5 }} title={viewMap ? "Hide Map" : "View Map"} />

        </View>
    )
}

export default CardReminder