import { getEventsByUser } from '@core/services/eventsServices';
import { useStyles } from '@core/theme/overrides'
import { Button, Icon, Skeleton, useTheme } from '@rneui/themed';
import React, { useEffect, useState } from 'react'
import { RefreshControl, SafeAreaView, ScrollView, Text, View } from 'react-native'
import CardEvent from './components/cardEvent';

const EventHistory: React.FC<any> = (props) => {
    const { theme: { colors } } = useTheme();
    const styles = useStyles()

    const [refreshing, setRefreshing] = useState<boolean>(false)
    const [events, setEvents] = useState<any>([])

    useEffect(() => {
        _loadData()
    }, [])

    const _loadData = async () => {
        const eventsUser = await getEventsByUser();
        setEvents(eventsUser)
    }

    const onRefresh = () => {
        setRefreshing(true)
        setTimeout(() => [_loadData(), setRefreshing(false)], 2000);
    }

    return (
        <View style={{ flex: 1 }}>
            <SafeAreaView />

            <View style={[styles.flexJustifyBetween, { margin: 20 }]}>
                <Text style={[styles.title]}>
                    Events:
                </Text>
                <Button type='outline' icon={
                    <Icon name='refresh' size={17} />
                } onPress={onRefresh} />
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
                        events.length > 0 ?
                            (events.map((item: any, i: number) => <CardEvent key={i} event={item} />)) : null
                }
            </ScrollView>
        </View>
    )
}

export default EventHistory