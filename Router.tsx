import React from 'react';
import { LinkingOptions, NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, Button } from 'react-native';
import useUser from './src/hooks/useUser';
import { parse } from '@babel/core';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator()

const CPage = ({ navigation }) => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
            <Text>
                C Page Content
            </Text>
            <Button title="To I Page" onPress={() => navigation.navigate('IPage', {
                itemID: 123
            })} />
        </View>
    )
}

const DPage = ({ navigation }) => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
            <Text>
                D Page Content
            </Text>
            <Button title="To F Page" onPress={() => navigation.navigate('FPage')} />
            <Button title="To G Page" onPress={() => navigation.navigate('GPage')} />
        </View>
    )
}

const EPage = ({ navigation }) => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
            <Text>
                E Page Content
            </Text>
            <Button title="To F Page" onPress={() => navigation.navigate('F Page')} />
            <Button title="To G Page" onPress={() => navigation.navigate('G Page')} />
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

const FPage = () => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
            <Text>
                F Page Content
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

const HPage = (props) => {
    const { navigation } = props
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
            <Text>
                H Page Content
            </Text>
            <Button title="Go to I Page" onPress={() => navigation.navigate('IPage', { itemID: null })} />
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

const IPage = (props) => {
    const { route } = props;
    const { itemID } = route.params;

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

const LoginPage = (props) => {
    const { navigation } = props;
    const { handleChange: handleUserChange } = useUser();

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
            <Text>
                Login Page Content
            </Text>
            <Button title="Login" onPress={() => handleUserChange({ isAuthorized: true })} />
            <Button
                title="Go to register page"
                onPress={() => navigation.navigate('Register', {
                    itemID: 46
                })}
            />
        </View>
    )
}

const RegisterPage = (props) => {
    const { navigation, route } = props;
    const { itemID } = route.params;
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
            <Text>
                Register Page Content
            </Text>
            <Text>
                itemID: {itemID}
            </Text>
            <Button title="Go to login page" onPress={() => navigation.navigate('Login')} />
        </View>
    )
}

const Router = () => {
    const { isAuthorized } = useUser();

    const config: LinkingOptions['config'] = {
        screens: {
            Login: 'LoginPath',
            Register: {
                path: 'register/:itemID',
                parse: {
                    itemID: null
                }
            },
            DrawerNavigator: {
                screens: {
                    StackNavgiator: {
                        screens: {
                            TabNavigator: {
                                screens: {
                                    CPage: 'CPath',
                                    DPage: 'DPath',
                                    EPage: 'EPath',
                                }
                            },
                            FPage: 'FPath',
                            GPage: 'GPath',
                        }
                    },
                    HPage: 'HPath'
                }

            },
            IPage: {
                path: 'IPage/:itemID',
                parse: {
                    itemID: null,
                }
            },
        }
    }

    const linking: LinkingOptions = {
        prefixes: ['https://myproject.com', 'MyProject://'],
        config: config,
    }

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
