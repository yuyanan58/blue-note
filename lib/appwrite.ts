import { Account, Avatars, Client, Databases } from 'react-native-appwrite';

export const client: Client = new Client();

client
  .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT as string)
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID as string) // Your Project ID
  .setPlatform('blue-note'); // Your package name / bundle identifier

export const account = new Account(client);
export const databases = new Databases(client);
export const avatars = new Avatars(client);
