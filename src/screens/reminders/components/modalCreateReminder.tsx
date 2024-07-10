
import React, { useContext, useEffect, useState } from 'react'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import MapView, { Circle, MapPressEvent, Marker } from 'react-native-maps';
import { Button, Icon, Input, Slider, useTheme } from '@rneui/themed';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Text, View } from 'react-native';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { v4 as uuidv4 } from 'uuid';
import * as yup from 'yup';

import { getCurrentPosition } from '@core/services/geolocationService';
import UniversalModal from '@/shared/components/UniversalModal'
import { useStyles } from '@core/theme/overrides';
import { Reminder } from '@core/models/reminder';
import { TouchableOpacity } from 'react-native';
import { useToast } from 'react-native-toast-notifications';
import { getRemindersByUser, saveReminder, updateReminder } from '@core/services/reminderService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RemindersContext } from '@core/providers/reminderProvider';

interface Props {
    visible: boolean;
    reminder: Reminder | null;
    onClose: () => void;
}

const CreateReminder: React.FC<Props> = (props) => {
    const { visible, onClose, reminder } = props
    const {updateReminders} = useContext(RemindersContext)
    const { theme: { colors } } = useTheme();
    const styles = useStyles();
    const toast = useToast();

    const [marker, setMarker] = useState(null);
    const [isVisibleStartDate, setIsVisibleStartDate] = useState<boolean>(false);
    const [isVisibleEndDate, setIsVisibleEndDate] = useState<boolean>(false);

    const defaultValues: Reminder = {
        id: '',
        title: "",
        description: "",
        location: {
            latitude: 0,
            longitude: 0,
        },
        radius: 0,
        startDate: new Date(),
        endDate: null,
        lastSend: null,
        username_id: "",
    }

    const schema = yup.object().shape({
        id: yup.string().trim(),
        title: yup.string().required().trim(),
        description: yup.string().required().trim(),
        location: yup.object().shape({
            latitude: yup.number().required(),
            longitude: yup.number().required(),
        }),
        radius: yup.number().required(),
        startDate: yup.date().required(),
        endDate: yup.date().nullable(),
        username_id: yup.string().trim(),
    });

    const { control, handleSubmit, getValues, setValue, watch, reset } = useForm({ defaultValues: reminder !== null ? reminder : defaultValues, resolver: yupResolver(schema) })

    const getLocation = (): any => getValues('location');
    const radius = watch('radius');
    const endDate = watch('endDate');

    useEffect(() => {
        const getGeolocation = async () => {
            const { latitude, longitude } = await getCurrentPosition()
            setMarker({ latitude, longitude })
            reset({location: { latitude, longitude }})
        }
        getGeolocation()
    }, [])

    const handleViewDateStart = () => setIsVisibleStartDate(!isVisibleStartDate);
    const handleViewDateEnd = () => setIsVisibleEndDate(!isVisibleEndDate);

    const handleConfirm = (date: Date, mode: "startDate" | "endDate") => {
        setValue(mode, date)
        if(mode === "startDate") {
            if(getValues('endDate') === null || getValues('endDate') < date){
                setValue('endDate', date)
            }
            handleViewDateStart() 
        } else {
            handleViewDateEnd()
        }
    };

    const handleMapPress = (event: MapPressEvent) => {
        const { coordinate } = event.nativeEvent;
        setMarker(coordinate);
        setValue('location', coordinate)
    };

    const onSubmit = async (data: Reminder) => {
        data.username_id = await AsyncStorage.getItem('user');
        if(reminder !== null) {
            data.id = reminder.id;
            await updateReminder(data);
        } else {
            data.id = uuidv4();
            await saveReminder(data);
        }
        const reminders = await getRemindersByUser()
        updateReminders(reminders)
        toast.show('Reminder saved successfully', {
            type: 'success',
            placement: 'bottom',
        });
        onClose()
    }

    const onError = (errors: any) => {
        console.log(errors)
    }

    return (
        <UniversalModal
            visible={visible}
            onClose={onClose}
            orientation='center'
            style={{ marginHorizontal: 40 }}>
            <View>
                <Text style={[styles.title, { marginBottom: 15 }]}>Create Reminder</Text>
                <View>
                    <Controller
                        control={control}
                        name="title"
                        render={({ field: { onChange, value }, formState: { errors } }) => (
                            <Input
                                value={value}
                                placeholder="Title"
                                keyboardType='default'
                                returnKeyType="done"
                                autoCapitalize='none'
                                autoComplete='off'
                                autoCorrect={false}
                                onChangeText={(value) => onChange(value)}
                            // onSubmitEditing={() => password.current.focus()}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name="description"
                        render={({ field: { onChange, value }, formState: { errors } }) => (
                            <Input
                                value={value}
                                placeholder="Description"
                                keyboardType='default'
                                returnKeyLabel="next"
                                returnKeyType="next"
                                autoCapitalize='none'
                                multiline
                                numberOfLines={4}
                                autoComplete='off'
                                autoCorrect={false}
                                onChangeText={(value) => onChange(value)}
                            />
                        )}
                    />
                    <View style={[styles.row, { columnGap: 10 }]}>
                        <View style={{ flex: 1 }}>
                            <Controller
                                control={control}
                                name="startDate"
                                render={({ field: { onChange, value }, formState: { errors } }) => (
                                    <View>
                                        <Text style={[styles.titlesCard, { marginBottom: 5 }]}>Start Date</Text>
                                        <Input
                                            value={format(value, 'dd/MM/yyyy', { locale: es })}
                                            placeholder="Start Date"
                                            keyboardType='default'
                                            returnKeyType="done"
                                            autoCapitalize='none'
                                            autoComplete='off'
                                            autoCorrect={false}
                                            onFocus={handleViewDateStart}
                                            rightIcon={{ size: 20, type: 'font-awesome', name: 'calendar', onPress: handleViewDateStart }}
                                        // onSubmitEditing={() => password.current.focus()}
                                        />

                                        <DateTimePickerModal
                                            isVisible={isVisibleStartDate}
                                            mode="date"
                                            onConfirm={(date: Date) => handleConfirm(date, "startDate")}
                                            onCancel={handleViewDateStart}
                                        />
                                    </View>
                                )}
                            />
                        </View>
                        <View style={{ flex: 1 }}>
                            <Controller
                                control={control}
                                name="endDate"
                                render={({ field: { value }, }) => (
                                    <View>
                                        <View style={[styles.betweenCenter, {marginBottom: 5} ]}>
                                            <Text style={[styles.titlesCard]}>End Date</Text>
                                            {
                                                endDate !== null && endDate !== undefined && (
                                                    <TouchableOpacity style={[styles.startCenter]} onPress={() => setValue('endDate', null)}>
                                                        <Icon name='close' color={colors.error} size={15} />
                                                        <Text style={[{color: colors.error}]}>
                                                            Clear
                                                        </Text>
                                                    </TouchableOpacity>
                                                )
                                            }
                                        </View>
                                        <Input
                                            value={ value !== null ? format(value, 'dd/MM/yyyy', { locale: es }) : ""}
                                            placeholder="End Date"
                                            keyboardType='default'
                                            returnKeyType="done"
                                            autoCapitalize='none'
                                            autoComplete='off'
                                            autoCorrect={false}
                                            onFocus={handleViewDateEnd}
                                            rightIcon={{ size: 20, type: 'font-awesome', name: 'calendar', onPress: handleViewDateEnd }}
                                        />
                                        <DateTimePickerModal
                                            isVisible={isVisibleEndDate}
                                            mode="date"
                                            minimumDate={new Date(watch('startDate'))}
                                            onConfirm={(date: Date) => handleConfirm(date, "endDate")}
                                            onCancel={handleViewDateEnd}
                                        />
                                    </View>
                                )}
                            />
                        </View>
                    </View>
                    <Controller
                        control={control}
                        name="radius"
                        render={({ field: { onChange, value }, formState: { errors } }) => (
                            <View>
                                <Text style={[styles.titlesCard]} >Radius</Text>
                                <Slider
                                    value={value}
                                    onValueChange={(value) => onChange(value)}
                                    maximumValue={2}
                                    minimumValue={0}
                                    step={0.2}
                                    allowTouchTrack
                                    trackStyle={{ height: 4, backgroundColor: 'transparent' }}
                                    thumbTintColor={colors.primary}
                                    thumbStyle={{ height: 20, width: 20 }}
                                />
                                <View style={[styles.flexJustifyBetween]}>
                                    <Text style={[styles.textHeadeTable]}>{value.toFixed(2)} km</Text>
                                    <Text style={[styles.textHeadeTable]}>2 km</Text>
                                </View>
                            </View>
                        )}
                    />
                    <View style={{ height: 200, marginTop: 20 }}>
                        <MapView
                            style={{ width: '100%', height: '100%', borderRadius: 10 }}
                            region={{
                                ...getLocation(),
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421,
                            }}
                            scrollEnabled
                            zoomTapEnabled={false}
                            zoomEnabled
                            followsUserLocation={true}
                            zoomControlEnabled={false}
                            onPress={handleMapPress}
                        >
                            {marker && (<Marker coordinate={marker} />)}
                            { radius > 0 && (
                                <Circle
                                    center={marker}
                                    radius={radius * 1000} // Convertimos kilómetros a metros
                                    strokeColor="rgba(24, 119, 242, 0.5)"
                                    fillColor="rgba(24, 119, 242, 0.2)" 
                                />
                            )}
                        </MapView>
                    </View>
                </View>
                <View style={[styles.row, { marginTop: 10, columnGap: 10 }]}>
                    <Button type='outline' onPress={handleSubmit(onSubmit, onError)}>Save</Button>
                    <Button type='outline' color='error' onPress={onClose}>Cancel</Button>
                </View>
            </View>
        </UniversalModal >
    )
}

export default CreateReminder