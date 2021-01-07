import React from 'react';
import { View, TextInput } from 'react-native';
import { makeStyles } from '../../hooks/makeStyles';

const useStyles = makeStyles((theme) => ({
    textFieldStyle: {
        backgroundColor: theme.textFieldTheme,
        width: 100,
        borderRadius: 25,
    }
}))
const TextField = () => {
    const classes = useStyles();

    return (
        <View>
            <TextInput style={classes.textFieldStyle}>

            </TextInput>
        </View>
    )
}

export default TextField

