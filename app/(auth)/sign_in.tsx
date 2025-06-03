import Input from '@/components/ui/Input';
import { login } from '@/services/user';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Alert, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { InferType, object, string } from 'yup';

const scheme = object({
  email: string().required('请输入邮箱').email('请输入正确的邮箱'),
  password: string().required('请输入密码').min(8, '密码至少8位'),
});

export default function SignIn() {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<InferType<typeof scheme>>({
    resolver: yupResolver(scheme),
  });
  const [loading, setLoading] = useState<boolean>(false);

  const forgetPwd = () => {
    Alert.alert('提示', '这里是忘记密码操作，to be continued');
  };

  const submit = async (data: InferType<typeof scheme>) => {
    try {
      setLoading(true);
      const { email, password } = data;
      await login(email, password);
      Toast.show({ type: 'info', text1: '登录成功~', visibilityTime: 3000 });
      router.navigate('/');
    } catch (e: any) {
      Alert.alert('登录失败', e?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 items-center mt-40">
      <Text className="text-lg font-bold">登录</Text>
      <Controller
        control={control}
        name="email"
        render={({ field: { value, onBlur, onChange } }) => (
          <View className="mt-4 w-56">
            <Input
              placeholder="请输入邮箱"
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
            />
            <Text className="text-red-500 text-sm pl-4">
              {errors.email?.message}
            </Text>
          </View>
        )}
      />
      <Controller
        control={control}
        name="password"
        render={({ field: { value, onBlur, onChange } }) => (
          <View className="w-56">
            <Input
              placeholder="请输入密码"
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              secureTextEntry
            />
            <Text className="text-red-500 text-sm pl-4">
              {errors.password?.message}
            </Text>
          </View>
        )}
      />
      <View className="flex-row items-center justify-between mt-4 w-56">
        <Pressable onPress={forgetPwd}>
          <Text className="text-gray-400 underline">忘记密码？</Text>
        </Pressable>
        <Pressable onPress={handleSubmit(submit)} className="btn-primary w-20 ">
          <Text className="text-white">{loading ? '登录中' : '登录'}</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
