import { Reminder } from '@core/models/reminder';
import { RemindersContext } from '@core/providers/reminderProvider';
import { getRemindersByUser } from '@core/services/reminderService';
import { useStyles } from '@core/theme/overrides';
import { Button, Icon, Skeleton, useTheme } from '@rneui/themed';
import React, { useContext, useEffect, useState } from 'react'
import { RefreshControl, SafeAreaView, ScrollView, Text, View } from 'react-native'
import CreateReminder from './components/modalCreateReminder';
import CardReminder from './components/cardReminder';


const Reminders: React.FC<any> = (props) => {
    const { reminders, updateReminders } = useContext(RemindersContext);

    const { theme: { colors } } = useTheme();
    const styles = useStyles()

    const [visible, setVisible] = useState<boolean>(false)
    const [refreshing, setRefreshing] = useState<boolean>(false)
    const [reminder, setReminder] = useState<Reminder | null>(null)

    useEffect(() => {
        _loadData()
    }, [])

    const _loadData = async () => {
        const remindersUser = await getRemindersByUser();
        updateReminders(remindersUser)
    }

    const onRefresh = () => {
        setRefreshing(true)
        setTimeout(() => [_loadData(), setRefreshing(false)], 2000);
    }

    const handleViewModal = () => [setVisible(!visible), setReminder(null)]

    const handleEditModal = (reminder: Reminder) => {
        setVisible(true);
        setReminder(reminder)
    }

    return (
        <View style={{ flex: 1 }}>
            <SafeAreaView />

            <View style={[styles.flexJustifyBetween, { margin: 20 }]}>
                <Text style={[styles.title]}>
                    Reminders:
                </Text>
                <Button icon={
                    <Icon name='plus' size={17} color={colors.white} />
                } onPress={handleViewModal} />
                {
                    visible &&
                    <CreateReminder visible={visible} onClose={handleViewModal} reminder={reminder} />
                }
            </View>
            
            <ScrollView
                style={{ flex: 1, marginTop: 5, zIndex: -1, paddingHorizontal:20 }}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        tintColor={colors.primary}
                        titleColor={colors.primary}
                        onRefresh={onRefresh}
                    />
                }
            >
                {
                    refreshing ?
                        <View style={{ gap: 15 }}>
                            <Skeleton animation='pulse' height={120} />
                            <Skeleton animation='pulse' height={120} />
                            <Skeleton animation='pulse' height={120} />
                        </View> :
                        reminders.length > 0 ?
                            (reminders.map((reminder: any, i: number) => <CardReminder key={i} reminder={reminder} openModal={handleEditModal} />)) : null
                }
            </ScrollView>
        </View>

    )
}

export default Reminders