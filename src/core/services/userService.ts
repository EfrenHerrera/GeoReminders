import md5 from "md5";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { User } from "@core/models/user";
import { getData, saveData } from "./storageService";

export const getUser = async (): Promise<string> => {
    return await AsyncStorage.getItem('user') || '';
}

export const getPosition = async (): Promise<any> => {
    return JSON.parse(await AsyncStorage.getItem('position'));
}

const getUsers = async (): Promise<Array<User>> => {
    return await getData('users')
}

export const registerUser = async (user: User): Promise<[string, string]> => {
    const users = await getUsers();

    const userFind = users.find((item: any) => item.username === user.username)
    if (userFind) {
        return ["User already exists", "danger"]
    }

    users.push(user)

    saveData('users', users)

    return ["User registered successfully", "success"]
}

export const loginUser = async (user: User): Promise<[string, string]> => {
    const users = await getUsers();
    const userFind = users.find((item: any) => item.username === user.username && item.password === user.password)
    
    if (!userFind) {
        return ["Username or Password incorrects", "danger"]
    }

    await AsyncStorage.setItem('token', userFind.hash);
    await AsyncStorage.setItem('user', userFind.username);

    return ["User logged in successfully", "success"]
}