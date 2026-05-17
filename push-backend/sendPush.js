// push-backend/sendPush.js
import { Expo } from 'expo-server-sdk';

const expo = new Expo();

async function sendPush() {
  // Replace this with the token from your phone screen
  const pushToken = 'ExponentPushToken[PASTE_YOUR_TOKEN_HERE]';

  if (!Expo.isExpoPushToken(pushToken)) {
    console.error('Invalid token.');
    return;
  }

  const messages = [
    {
      to: pushToken,
      sound: 'default',
      title: 'From the backend',
      body: 'This push came from a Node.js server.',
      data: { screen: 'Profile', userId: 42 },
    },
  ];

  const chunks = expo.chunkPushNotifications(messages);

  for (const chunk of chunks) {
    try {
      const tickets = await expo.sendPushNotificationsAsync(chunk);
      console.log('Tickets:', tickets);
    } catch (error) {
      console.error('Send error:', error);
    }
  }
}

sendPush();