import React from 'react'
import { Text, View } from 'react-native'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

import { Event } from '@core/models/event'
import { useStyles } from '@core/theme/overrides'
import { Icon } from '@rneui/themed'

interface CardEventProps {
    event: Event
}

const CardEvent: React.FC<CardEventProps> = (props) => {
    const { event } = props
    const styles = useStyles();

    return (
        <View style={[styles.card, { marginBottom: 15, rowGap: 10 }]}>
            <Text style={[styles.title, { textTransform: "capitalize" }]}>{event.title}</Text>
            <View>
                <Text style={[styles.textBold]}>Description:</Text>
                <Text>{event.description}</Text>
            </View>
            <View style={[styles.row, { columnGap: 20 }]}>
                <View>
                    <Text style={[styles.textBold]}>Date:</Text>
                    <View style={[styles.startCenter, {columnGap:3}]}>
                        <Icon name="calendar" size={14} />
                        <Text>{format(event.date, 'dd/MM/yyyy', { locale: es })}</Text>
                    </View>
                </View>
                <View>
                    <Text style={[styles.textBold]}>Time:</Text>
                    <View style={[styles.startCenter, {columnGap:3}]}>
                        <Icon name="clock" size={14} />
                        <Text>{format(event.date, 'HH:mm:ss', { locale: es })}</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default CardEvent