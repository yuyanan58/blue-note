import { View, Text, SafeAreaView, Pressable, Alert } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';

export default function profile() {
  const logOut = () => {
    Alert.alert('退出登录');
    console.log('log out!');
  };
  return (
    <SafeAreaView className="flex-1 bg-sky-100">
      <Text className="text-center text-black font-bold mt-10 text-lg">
        Profile
      </Text>
      <View className="justify-center items-center">
        <Link className="mt-4" href="/sign_in">
          登录
        </Link>
        <Link className="mt-4" href="/sign_up">
          注册
        </Link>
        <Pressable className="mt-4" onPressOut={logOut}>
          <Text>退出登录</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
