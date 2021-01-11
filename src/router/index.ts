import { LinkingOptions } from '@react-navigation/native';

const config: LinkingOptions['config'] = {
    screens: {
        Login: 'loginroute',
        Register: 'register/:itemID',
        DrawerNavigator: {
            screens: {
                StackNavigator: {
                    screens: {
                        TabNavigator: {
                            screens: {
                                CPage: 'croute',
                                DPage: 'droute',
                                EPage: 'eroute',
                            },
                        },
                        FPage: 'froute',
                        GPage: 'groute',
                    },
                },
                HPage: 'hroute',
            }
        },
        IPage: 'iroute/:itemID',
        NoMatch: '*',
    }
}

export const linking: LinkingOptions = {
    prefixes: ['http://myproject.com', 'myproject://'],
    config: config,
}

// npx uri-scheme open MyProject://drawer/hroute --ios
// xcrun simctl openurl booted MyProject://iroute/33
// npx uri-scheme open myproject://iroute/33 --android
// adb shell am start -W -a android.intent.action.VIEW -d "myproject://iroute/33" com.myproject