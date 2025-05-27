import { View, Text } from 'react-native';
import React from 'react';
import { useLocalSearchParams } from 'expo-router';

const Detail = () => {
  const { post_id } = useLocalSearchParams();
  return (
    <View>
      <Text>Detail of {post_id}</Text>
    </View>
  );
};

export default Detail;
