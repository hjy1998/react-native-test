import React from 'react';
import {
  Text,
  Animated,
  TouchableWithoutFeedback,
  View,
  Vibration,
  StyleSheet,
  TouchableWithoutFeedbackProps,
} from 'react-native';
import { makeStyles } from '../../hooks/makeStyles';
import useThemeContext from '../../hooks/useTheme';
import { generateRandomTheme } from '../../utils/generateRandomTheme';

const useStyles = makeStyles<{ disabled?: boolean | null }>((theme, props) => ({
  animatedButtonWrapper: {
    height: '100%',
    width: '100%',
    borderRadius: 25,
    backgroundColor: props?.disabled ? '#ccc' : '#FFA500',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: 'black',
  },
  textStyle: {
    color: props?.disabled ? 'grey' : 'black',
    fontWeight: 'bold',
    fontSize: 18,
  },
}));

const classes = StyleSheet.create({
  buttonWrapper: {
    height: '5%',
    width: '25%',
    backgroundColor: 'black',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animatedButtonWrapperActive: {
    height: '100%',
    width: '100%',
    borderRadius: 25,
    backgroundColor: '#FFA500',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: 'black',
  },
  animatedButtonWrapperDisabled: {
    height: '100%',
    width: '100%',
    borderRadius: 25,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: 'black',
  },
  textStyleActive: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18,
  },
  textStyleDisabled: {
    color: 'grey',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

const Button: React.FunctionComponent<TouchableWithoutFeedbackProps> = (props) => {
  const { disabled } = props;
  const animation = new Animated.Value(0);
  const { handleChange: handleThemeChange } = useThemeContext();
  const temp = useStyles(props);

  const moveRightAnimation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [-5, 0],
  });

  const moveTopAnimation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [-5, 0],
  });

  const handlePressIn = () => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.timing(animation, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  const handleLongPress = () => {
    const elementIndex = Math.floor(Math.random() * 3);

    handleThemeChange({
      theme: generateRandomTheme(elementIndex)[0],
      textFieldTheme: generateRandomTheme(elementIndex)[1],
    });

    Vibration.vibrate();
  };

  return (
    <>
      <TouchableWithoutFeedback
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onLongPress={handleLongPress}
        disabled={disabled}>
        <View style={classes.buttonWrapper}>
          <Animated.View
            style={[
              temp.animatedButtonWrapper,
              {
                transform: [
                  { translateX: moveRightAnimation },
                  { translateY: moveTopAnimation },
                ],
              },
            ]}>
            <Text style={temp.textStyle}>Apply</Text>
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};

export default Button;
