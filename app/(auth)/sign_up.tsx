import Input from '@/components/ui/Input';
import { signUp } from '@/services/user';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Alert, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { twJoin } from 'tailwind-merge';
import { InferType, object, ref, string } from 'yup';

const scheme = object({
  email: string().required('请输入邮箱').email('请输入正确的邮箱'),
  username: string()
    .trim()
    .required('请输入用户名')
    .min(3, '用户名至少3位')
    .max(20, '用户名至多20位'),
  password: string().required('请输入密码').min(8, '密码至少8位'),
  newPassword: string()
    .required('请重新输入密码')
    .oneOf([ref('password')], '密码不一致'),
});
export default function SignUp() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<InferType<typeof scheme>>({
    resolver: yupResolver(scheme),
  });
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const submit = async ({
    email,
    username,
    password,
  }: InferType<typeof scheme>) => {
    try {
      setLoading(true);
      await signUp(email, username, password);
      Alert.alert('注册成功', '', [
        { text: '去登录', onPress: () => router.navigate('/sign_in') },
      ]);
    } catch (e: any) {
      Alert.alert(e?.message || '注册失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 items-center mt-40">
      {/* <ActivityIndicator animating={loading} /> */}
      <Text className="text-lg font-bold">注册</Text>
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
          <View className="mt-4 w-56">
            <Input
              placeholder="请输入邮箱"
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              className={twJoin(errors.email ? 'border-red-400' : '')}
            />
            <Text className="text-red-500 text-sm pl-4">
              {errors.email?.message}
            </Text>
          </View>
        )}
      />
      <Controller
        control={control}
        name="username"
        render={({ field: { onChange, onBlur, value } }) => (
          <View className="w-56">
            <Input
              placeholder="请输入用户名"
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              className={twJoin(errors.username ? 'border-red-400' : '')}
            />
            <Text className="text-red-500 text-sm pl-4">
              {errors.username?.message}
            </Text>
          </View>
        )}
      />
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, onBlur, value } }) => (
          <View className=" w-56">
            <Input
              placeholder="请输入密码"
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              secureTextEntry
              className={twJoin(errors.password ? 'border-red-400' : '')}
            />
            <Text className="text-red-500 text-sm pl-4">
              {errors.password?.message}
            </Text>
          </View>
        )}
      />
      <Controller
        control={control}
        name="newPassword"
        render={({ field: { onChange, onBlur, value } }) => (
          <View className="w-56">
            <Input
              placeholder="请重新输入密码"
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              secureTextEntry
              className={twJoin(errors.newPassword ? 'border-red-400' : '')}
            />
            <Text className="text-red-500 text-sm pl-4">
              {errors.newPassword?.message}
            </Text>
          </View>
        )}
      />
      <Pressable
        onPress={handleSubmit(submit)}
        disabled={loading}
        className="w-56 mt-4 flex justify-center items-center btn-primary  h-10"
      >
        <Text className="text-white">{loading ? '注册中' : '注册'}</Text>
      </Pressable>
      <Link href="/sign_in" className="mt-4">
        <Text>
          已有账号？<Text className="text-sky-400">登录</Text>
        </Text>
      </Link>
    </SafeAreaView>
  );
}
