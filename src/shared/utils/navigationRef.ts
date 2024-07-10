import { createNavigationContainerRef } from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

export const navigate = (args: never) => {
    if (navigationRef.isReady()) {
        navigationRef.navigate(...args);
    }
}


export const clearStack = (toGo) => {
    if(navigationRef.isReady()){
        navigationRef.reset({ index: 0, routes: [{ name: toGo }] });
    }
}

export const replace = (name, params = {}) => {
    if(navigationRef.isReady()){
    }
}


export const goBack = () => navigationRef.goBack()

export const getRoute = () => navigationRef.getCurrentRoute().name