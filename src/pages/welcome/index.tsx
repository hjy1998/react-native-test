import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Button from '../../components/Button';
import TextField from '../../components/TextField';
import { makeStyles } from '../../hooks/makeStyles'

const useStyles = makeStyles((theme) => ({
    root: {
        flex: 1,
        backgroundColor: theme.theme,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textStyle: {
        fontSize: 200,
    },
}));

const Welcome = () => {
    const classes = useStyles();

    return (
        <View style={classes.root}>
            <Text style={classes.textStyle}>
                Scroll me plz
            </Text>
            <Button />
            <TextField />
        </View>
    )
}

export default Welcome;
