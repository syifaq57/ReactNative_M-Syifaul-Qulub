import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/FontAwesome';

import LandingPage from './View/LandingPage/LandingPage';
import Login from './View/Login/Login';
import Home from './View/Home/Home';
import MenuList from './View/MenuList/MenuList';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerNav({navigation}) {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="MenuList" component={MenuList} />
    </Drawer.Navigator>
  );
}

export default function DrawerLayout() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="LandingPage"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="LandingPage" component={LandingPage} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Drawer" component={DrawerNav} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
