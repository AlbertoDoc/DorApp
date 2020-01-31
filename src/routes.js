import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import Login from './pages/Login';
import Appointment from './pages/Appointment';
import Home from './pages/Home';

const Routes = createAppContainer(
    createStackNavigator({
        Login: {
            screen: Login,
            navigationOptions: {
                title: 'Login'
            },
        },
        Home: {
            screen: Home,
            navigationOptions: {
                title: 'DorApp'
            }
        },
        Appointment: {
            screen: Appointment,
            navigationOptions: {
                title: 'Marcar'
            }
        }, 
    }, {
        defaultNavigaionOptions: {
            headerStyle: {
                backgroundColor: '#7d40e7',
            },
            headerTintColor: '#fff',
        }
    })
);

export default Routes;
