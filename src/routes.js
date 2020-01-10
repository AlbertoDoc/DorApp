import {createAppContainer, createSwitchNavigator} from 'react-navigation';

import Login from './pages/Login';
import Appointment from './pages/Appointment';
import Home from './pages/Home';

const Routes = createAppContainer(
    createSwitchNavigator({
        Login,
        Home,
        Appointment,
    })
);

export default Routes;
