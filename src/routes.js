import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import Login from './pages/Login';
import Appointment from './pages/Appointment';
import Home from './pages/Home';
import Settings from './pages/Settings';

const Routes = createAppContainer(
    createStackNavigator({
        Login: {
            screen: Login,
            navigationOptions: {
                headerShown: false,
            }
        },
        Home: {
            screen: Home,
            navigationOptions: {
                title: 'Página Inicial',
            }
        },
        Appointment: {
            screen: Appointment,
            navigationOptions: {
                title: 'Marque seu horário'
            }
        },
        Settings:{
            screen: Settings,
            navigationOptions: {
                title: 'Configurações'
            }
        },
    }, {
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: '#f05a5b',
            },
            headerTintColor: '#fff',
        }
    })
);

export default Routes;
