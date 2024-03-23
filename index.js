/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import Form from './Form'
import { name as appName } from './app.json';
import TaskManagerHome from './components/TaskManagerHome';

AppRegistry.registerComponent(appName, () => TaskManagerHome);
