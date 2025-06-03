import { TextInput, TextInputProps } from 'react-native';
import { twMerge } from 'tailwind-merge';
import React from 'react';

const Input = ({ className, ...rest }: TextInputProps) => {
  return (
    <TextInput
      autoCorrect={false}
      returnKeyType="done"
      className={twMerge(
        'px-4 py-1.5 h-10 border border-gray-500 rounded-full',
        className
      )}
      {...rest}
    ></TextInput>
  );
};

export default Input;
