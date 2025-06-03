import { account, databases } from '@/lib/appwrite';
import { ID, Query } from 'react-native-appwrite';

const databaseId = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID as string;
const collectionIdUser = process.env
  .EXPO_PUBLIC_APPWRITE_COLLECTION_ID_USER as string;

// 创建用户
export const createUser = async (
  user_id: string,
  email: string,
  user_name: string
) => {
  const res = await databases.createDocument(
    databaseId,
    collectionIdUser,
    ID.unique(),
    { user_id, email, user_name }
  );
  return res.$id;
};

// 根据user_id获取用户
export const getUserByUserId = async (user_id: string) => {
  const records = await databases.listDocuments(databaseId, collectionIdUser, [
    Query.equal('user_id', user_id),
    Query.limit(1),
  ]);
  return records.documents[0];
};

export const getUserByEmail = async (email: string) => {
  const records = await databases.listDocuments(databaseId, collectionIdUser, [
    Query.equal('email', email),
    Query.limit(1),
  ]);
  return records.documents[0];
};
// 注册，创建用户，这里用户邮箱不能重复
export const signUp = async (
  email: string,
  username: string,
  password: string
) => {
  try {
    // 判断当前用户的邮箱是否存在
    const existed = await getUserByEmail(email);
    if (existed) {
      throw new Error('该用户已存在');
    }
    const user = await account.create(ID.unique(), email, password, username);
    await createUser(user.$id, email, username);
    return user;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

// 使用邮箱和密码登录
export const login = async (email: string, password: string) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

// 登出
export const logout = async () => {
  try {
    await account.deleteSession('current');
  } catch (e) {
    console.log(e);
    throw e;
  }
};
