import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Preload from '../screens/Preload';
import SignIn from '../screens/SignIn/index';
import SignUp from '../screens/SignUp';
import MainTab from '../stacks/MainTab';
import ResetPassword from '../screens/ResetPassword'
import CheckCodPassword from '../screens/ResetPassword/checkCodPassword'
import ChangePassword from '../screens/ResetPassword/changePassword'

const Stack = createStackNavigator();

export default () => (
    <Stack.Navigator
        initialRouteName="Preload"
        screenOptions={{
            headerShown: false
        }}
    >
        <Stack.Screen name="Preload" component={Preload} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />
        <Stack.Screen name="CheckCodPassword" component={CheckCodPassword} />
        <Stack.Screen name="ChangePassword" component={ChangePassword} />
        <Stack.Screen name="MainTab" component={MainTab} />
    </Stack.Navigator>
);