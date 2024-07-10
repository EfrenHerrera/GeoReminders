import React from 'react';
import { Icon, useTheme } from '@rneui/themed';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';


import Home from '@screens/home';
import LoadingScreen from '@screens/loading';
import Login from '@screens/login';
import { navigationRef } from '@shared/utils/navigationRef';
import { RemindersProvider } from '@core/providers/reminderProvider';
import Reminders from '@screens/reminders';
import EventHistory from '@screens/eventHistory';

const App: React.FC = () => {
	const { theme: { colors } } = useTheme();
	const Tab = createBottomTabNavigator();
	return (
		<RemindersProvider>
			<Tab.Navigator screenOptions={{
				headerShown: false,
				tabBarActiveTintColor: colors.primary,
				tabBarInactiveTintColor: 'gray'
			}}>
				<Tab.Screen name="Home" component={Home} options={{
					tabBarIcon: ({ focused, color, size }) => {
						return <Icon name='home' style={{ width: size, height: size }} color={color} />;
					},
				}} />
				<Tab.Screen name="Reminders" component={Reminders} options={{
					tabBarIcon: ({ focused, color, size }) => {
						return <Icon name='reminder' style={{ width: size, height: size }} color={color} />;
					},
				}} />
				<Tab.Screen name="History" component={EventHistory} options={{
					tabBarIcon: ({ focused, color, size }) => {
						return <Icon name='history' style={{ width: size, height: size }} color={color} />;
					},
				}}/>
			</Tab.Navigator>
		</RemindersProvider>
	)
}

const Routes: React.FC = () => {
	const { theme: { colors } } = useTheme();
	const NavigationSwitch = createStackNavigator();
	return (
		<NavigationContainer ref={navigationRef} >
			<NavigationSwitch.Navigator screenOptions={{ headerShown: false, cardStyle: { backgroundColor: colors.background } }}>
				<NavigationSwitch.Screen name='Loading' component={LoadingScreen} />
				<NavigationSwitch.Screen name='Auth' component={Login} />
				<NavigationSwitch.Screen name='App' component={App} />
			</NavigationSwitch.Navigator>
		</NavigationContainer >
	);
}

export default Routes;