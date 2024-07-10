import { Reminder } from "@core/models/reminder";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getData, saveData } from "./storageService";

const getReminders = async (): Promise<Array<Reminder>> => {
    return await getData('reminders')
}


export const getRemindersByUser = async (): Promise<Array<Reminder>> => {
    const username = await AsyncStorage.getItem('user');

    const reminders = await getReminders()

    const reminderUser = reminders.filter((item: Reminder) => item.username_id === username)

    return reminderUser
}

export const saveReminder = async (reminder: Reminder) => {
    const reminders = await getReminders();
    reminders.push(reminder)
    saveData('reminders', reminders)
}

export const deleteReminder = async (reminder: Reminder) => {
    const reminders = await getReminders();
    const newReminders = reminders.filter((item: Reminder) => item.id !== reminder.id)
    saveData('reminders', newReminders)
}

export const updateReminder = async (reminder: Reminder) => {
    const reminders = await getReminders();
    const index = reminders.findIndex((item: Reminder) => item.id === reminder.id)
    reminders[index] = reminder
    await saveData('reminders', reminders)
}