import AsyncStorage from "@react-native-async-storage/async-storage"

import { getData, saveData } from "./storageService"
import { Event } from "@core/models/event"

const getEvents = async () => {
    return await getData('events')
}

export const getEventsByUser = async () => {
    const username = await AsyncStorage.getItem('user');
    const events = await getEvents()
    const eventUser = events.filter((item: Event) => item.username_id === username)
    // los ultimos 10 eventos ordenados decendentemente
    return eventUser.sort((a: Event, b: Event) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 20)
}

export const createEvent = async (event: Event) => {
    const events = await getEvents()
    events.push(event)
    saveData('events', events)
}