import React from 'react';
import { View, TextInput, TextInputProps } from 'react-native';
import { makeStyles } from '../../hooks/makeStyles';

const useStyles = makeStyles((theme) => ({
    textFieldStyle: {
        backgroundColor: theme.textFieldTheme,
        width: 100,
        borderRadius: 25,
    },
}))

const TextField: React.FunctionComponent<TextInputProps> = (props) => {
    const { ...others } = props;
    const classes = useStyles();

    return (
        <View>
            <TextInput
                style={classes.textFieldStyle}
                {...others}
            />
        </View>
    );
};

export default TextField;

