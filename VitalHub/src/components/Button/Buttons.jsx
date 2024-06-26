import React from 'react';
import { ActivityIndicator, TouchableOpacity } from 'react-native';
import { Button, ButtonTitle, ButtonGoogle, ButtonGoogleTitle } from './Style';

export const NormalButton = ({ title, fieldWidth = 100, onPress, disabled = false }) => {
  return (
    <Button fieldWidth={fieldWidth} onPress={onPress} disabled={disabled}>
      {disabled ? <ActivityIndicator color="white" /> : <ButtonTitle>{title}</ButtonTitle>}
    </Button>
  );
};

export const GoogleButton = ({ title, fieldWidth, onPress, disabled = false }) => {
  return (
    <ButtonGoogle fieldWidth={fieldWidth} onPress={onPress} disabled={disabled}>
      {disabled ? <ActivityIndicator color="#496BBA" /> : <ButtonGoogleTitle>{title}</ButtonGoogleTitle>}
    </ButtonGoogle>
  );
};
