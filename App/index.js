import React from 'react'
import { Provider } from 'react-redux'

import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import storeConfig from './src/store/storeConfig'

import axios from 'axios'
axios.defaults.baseURL = 'https://waves-515b7-default-rtdb.firebaseio.com/'

const store = storeConfig()
const Redux = () =>(
    <Provider store={store}>
        <App></App>
    </Provider>
)

AppRegistry.registerComponent(appName, () => Redux);
