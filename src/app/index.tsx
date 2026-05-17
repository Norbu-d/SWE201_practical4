import { useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import * as Notifications from "expo-notifications";
import { usePushNotifications } from "../../hooks/usePushNotifications";

export default function HomeScreen() {
  const { expoPushToken, lastNotificationBody } = usePushNotifications();
  const [localFired, setLocalFired] = useState(false);

  async function fireLocalNotification() {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Hello from the app",
        body: "This is a local notification (no server needed).",
        data: { screen: "Home" },
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
        seconds: 2,
      },
    });
    setLocalFired(true);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Expo Push Demo</Text>

      <Text style={styles.label}>Your push token:</Text>
      <Text selectable style={styles.token}>
        {expoPushToken ?? "Fetching..."}
      </Text>

      <Text style={styles.label}>Last received notification:</Text>
      <Text style={styles.body}>{lastNotificationBody}</Text>

      <View style={{ height: 20 }} />
      <Button
        title={localFired ? "Local notification sent!" : "Fire LOCAL notification (2s)"}
        onPress={fireLocalNotification}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 80, paddingHorizontal: 20, gap: 8 },
  title: { fontSize: 22, fontWeight: "600", marginBottom: 12 },
  label: { fontSize: 13, color: "#666", marginTop: 8 },
  token: { fontSize: 12, color: "#000", fontFamily: "monospace" },
  body: { fontSize: 15, color: "#222" },
});