//================================================
// IMPORT DEPENDENCIES
//================================================
import { useEffect } from 'react';

import { ToastProvider } from 'react-native-toast-notifications';
import { ThemeProvider } from '@rneui/themed';
import * as Notifications from 'expo-notifications';
import * as TaskManager from 'expo-task-manager';
import * as Location from 'expo-location';
import "react-native-get-random-values";

//================================================
// IMPORT DEPENDENCIES CORE
//================================================
import Routes from '@/routes';
import theme from '@core/theme'
import { Reminder } from '@core/models/reminder';
import { getDistanceFromLatLonInKm } from '@core/services/geolocationService';
import { getRemindersByUser, updateReminder } from '@core/services/reminderService';
import { createEvent } from '@core/services/eventsServices';
import { Event } from '@core/models/event';

const LOCATION_TASK_NAME = 'background-location-task';

const sendNotification = async (reminder: Reminder) => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: reminder.title,
      body: reminder.description,
    },
    trigger: null,
  });
}

TaskManager.defineTask<any>(LOCATION_TASK_NAME, async (task) => {
  const { data, error } = task;
  if (error) {
    console.error(error);
    return;
  }
  if (data) {
    const { locations } = data;

    const { latitude, longitude } = locations[0].coords;

    // Obtener los recordatorios almacenados
    const reminders = await getRemindersByUser()

    // Verificar si el usuario está dentro del radio de algún recordatorio
    reminders.forEach(async (reminder) => {
      if ( reminder.endDate !== null && new Date(reminder.endDate) < new Date()) {
        return;
      }

      const distance = getDistanceFromLatLonInKm(
        latitude,
        longitude,
        reminder.location.latitude,
        reminder.location.longitude
      );
      if (distance <= reminder.radius) {
        if (reminder.lastSend) {
          const lastSend = new Date(reminder.lastSend)
          const diff = Math.abs(new Date().getTime() - lastSend.getTime());
          if (diff < 180000) {
            return;
          }
        }

        reminder.lastSend = new Date();
        updateReminder(reminder)

        const event: Event = {
          id: String(Math.random()),
          title: reminder.title,
          description: reminder.description,
          date: new Date(),
          username_id: reminder.username_id
        }
        await createEvent(event);

        sendNotification(reminder);

      }
    });
  }
});

export default function App() {
  useEffect(() => {
    const startLocationUpdates = async () => {
      const { status: foregroundStatus } = await Location.requestForegroundPermissionsAsync();
      if (foregroundStatus !== 'granted') {
        console.error('Permission to access location was denied');
        return;
      }

      const { status: backgroundStatus } = await Location.requestBackgroundPermissionsAsync();
      if (backgroundStatus !== 'granted') {
        console.error('Permission to access background location was denied');
        return;
      }

      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
        accuracy: Location.Accuracy.High,
        distanceInterval: 100, // Actualiza cada 100 metros
      });

    };

    startLocationUpdates();

  }, []);
  return (
    <ThemeProvider theme={theme} >
      <ToastProvider>
        <Routes />
      </ToastProvider>
    </ThemeProvider>
  );
}
