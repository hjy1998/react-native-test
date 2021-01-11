import React from 'react';
import { View, Text, Button } from 'react-native';

//react navigation
import { NavigationContainer, RouteProp } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//router
import { linking } from './src/router';

//interface
import { RootStackParamList } from './src/interface'

//components
import TextField from './src/components/TextField'

//hooks
import useUser from './src/hooks/useUser';
import useNavigate from './src/hooks/useNavigate'

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const CPage = () => {
    const [itemID, setItemID] = React.useState('0')
    const navigate = useNavigate();

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
            <TextField
                onChangeText={setItemID}
                value={itemID}
            />
            <Text>
                C Page Content
            </Text>
            <Button title="To I Page" onPress={navigate(`/iroute/${itemID}`)} />
        </View>
    )
}

const DPage = () => {
    const navigate = useNavigate();

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
            <Text>
                D Page Content
            </Text>
            <Button title="To F Page" onPress={navigate('/froute?user=anny')} />
            <Button title="To G Page" onPress={navigate('/groute')} />
        </View>
    )
}

const EPage = () => {
    const navigate = useNavigate();

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
            <Text>
                E Page Content
            </Text>
            <Button title="To F Page" onPress={navigate('/froute')} />
            <Button title="To G Page" onPress={navigate('/groute')} />
        </View>
    )
}


const TabNavigator = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="CPage" component={CPage} />
            <Tab.Screen name="DPage" component={DPage} />
            <Tab.Screen name="EPage" component={EPage} />
        </Tab.Navigator>
    )
}

type CustomFPageRouteProps = RouteProp<RootStackParamList, 'FPage'>

type FPageProps = {
    route: CustomFPageRouteProps,
}

const FPage: React.FunctionComponent<FPageProps> = (props) => {

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
            <Text>
                F Page Content
            </Text>
            <Text>
                user: {props.route.params === undefined ? null : props.route.params.user}
            </Text>
        </View>
    )
}

const GPage = () => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
            <Text>
                G Page Content
            </Text>
        </View>
    )
}

const StackNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="TabNavigator" component={TabNavigator} />
            <Stack.Screen name="FPage" component={FPage} />
            <Stack.Screen name="GPage" component={GPage} />
        </Stack.Navigator>
    )
}

const HPage = () => {
    const navigate = useNavigate();

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
            <Text>
                H Page Content
            </Text>
            <Button title="Go to I Page" onPress={navigate('/iroute/33')} />
        </View>
    )
}
const DrawerNavigator = () => {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name="StackNavigator" component={StackNavigator} />
            <Drawer.Screen name="HPage" component={HPage} />
        </Drawer.Navigator>
    )
}

type CustomIPageNavigationProps = StackNavigationProp<RootStackParamList, 'IPage'>

type CustomIPageRouteProps = RouteProp<RootStackParamList, 'IPage'>

type IPageProps = {
    navigation: CustomIPageNavigationProps,
    route: CustomIPageRouteProps,
}

const IPage: React.FunctionComponent<IPageProps> = (props) => {
    const { itemID } = props.route.params;

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>
                I Page Content
            </Text>
            <Text>
                itemID: {itemID}
            </Text>
        </View >
    )
}

const LoginPage = () => {
    const { handleChange: handleUserChange } = useUser();
    const navigate = useNavigate();

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
            <Text>
                Login Page Content
            </Text>
            <Button title="Login" onPress={() => handleUserChange({ isAuthorized: true })} />
            <Button
                title="Go to register page"
                onPress={navigate(`/register/${44}`)}
            />
        </View>
    )
}

type CustomRegisterNavigationProps = StackNavigationProp<RootStackParamList, 'Register'>

type CustomRegisterRouteProps = RouteProp<RootStackParamList, 'Register'>

type RegisterProps = {
    navigation: CustomRegisterNavigationProps,
    route: CustomRegisterRouteProps,
}

const RegisterPage: React.FunctionComponent<RegisterProps> = (props) => {
    const { route } = props;
    const { itemID } = route.params;
    const navigate = useNavigate();
    
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
            <Text>
                Register Page Content
            </Text>
            <Text>
                itemID: {itemID}
            </Text>
            <Button title="Go to login page" onPress={navigate('/loginroute')} />
        </View>
    )

}

const Router = () => {
    const { isAuthorized } = useUser();

    return (
        <NavigationContainer
            linking={linking}
            fallback={
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text>Loading...</Text>
                </View>
            }
        >
            {isAuthorized ?
                (
                    <Stack.Navigator>
                        <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} />
                        <Stack.Screen name="IPage" component={IPage} />
                    </Stack.Navigator>
                ) : (
                    <Stack.Navigator>
                        <Stack.Screen name="Login" component={LoginPage} />
                        <Stack.Screen name="Register" component={RegisterPage} />
                    </Stack.Navigator>
                )
            }
        </NavigationContainer>
    )
}

export default Router;
