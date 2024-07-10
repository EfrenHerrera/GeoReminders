import React, { createContext, useState, useEffect, useMemo } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Crea un EventEmitter para los cambios en los recordatorios


// Crea el contexto
export const RemindersContext = createContext<any>([]);

// Proveedor de contexto
export const RemindersProvider = ({ children }) => {
    const [reminders, setReminders] = useState([]);

    useEffect(() => {
        // Cargar recordatorios desde AsyncStorage al iniciar
        const loadReminders = async () => {
            const storedReminders = await AsyncStorage.getItem('reminders');
            if (storedReminders) {
                setReminders(JSON.parse(storedReminders));
            }
        };

        loadReminders();
    }, []);

    const updateReminders = async (newReminders) => {
        setReminders(newReminders);
        await AsyncStorage.setItem('reminders', JSON.stringify(newReminders));
    };

    const value = useMemo(() => ({ reminders, updateReminders }), [reminders])

    return (
        <RemindersContext.Provider value={value}>
            {children}
        </RemindersContext.Provider>
    );
};
