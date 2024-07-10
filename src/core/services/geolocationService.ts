import * as Location from "expo-location";
import { Platform } from "react-native";
import { Region } from "react-native-maps";

const deg2rad = (deg:number) => deg * (Math.PI / 180);

export const getCurrentPosition = async (): Promise<Location.LocationObjectCoords> => {
    let { status } = await Location.requestForegroundPermissionsAsync();

    const { coords } = await Location.getCurrentPositionAsync({
        accuracy: Platform.OS === "android" ? Location.Accuracy.Low : Location.Accuracy.Lowest,
    })
    return coords
}

export const getDistanceFromLatLonInKm = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Radio de la Tierra 
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
    return d;
}

export const calculateRegion = (points: Array<any>): Region => {
    if(points.length === 0) {
        return {
            latitude: 0,
            longitude: 0,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
        };
    }

    let minLat = points[0].location.latitude;
    let maxLat = points[0].location.latitude;
    let minLon = points[0].location.longitude;
    let maxLon = points[0].location.longitude;

    let sumLat = 0;
    let sumLon = 0;

    points.forEach(reminder => {
        const { latitude, longitude } = reminder.location;
        minLat = Math.min(minLat, latitude);
        maxLat = Math.max(maxLat, latitude);
        minLon = Math.min(minLon, longitude);
        maxLon = Math.max(maxLon, longitude);

        sumLat += latitude;
        sumLon += longitude;
    });

    const avgLat = sumLat / points.length;
    const avgLon = sumLon / points.length;

    const latitudeDelta = maxLat - minLat + 0.025;
    const longitudeDelta = maxLon - minLon + 0.025;

    return {
        latitude: avgLat,
        longitude: avgLon,
        latitudeDelta: latitudeDelta,
        longitudeDelta: longitudeDelta,
    };
};