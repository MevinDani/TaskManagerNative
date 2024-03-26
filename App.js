import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EmployeeTaskHome from './components/EmployeeTaskHome';
import Login from './components/Login'


const Stack = createNativeStackNavigator();

function MainApp() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="EmployeeTaskHome" component={EmployeeTaskHome} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default MainApp