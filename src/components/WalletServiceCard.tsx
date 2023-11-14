import { Service } from "@onflow/typedefs";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function WalletDiscoveryServiceCard({
  service,
  onPress,
}: {
  service: Service;
  onPress: () => void;
}) {
  const provider: any = service.provider;
  const name = provider?.name || "Unknown";
  const icon = provider?.icon || "https://placekitten.com/200/200";

  const styles = StyleSheet.create({
    cardContainer: {
      width: "100%",
      height: "100%",
    },
    cardTouchable: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",
      backgroundColor: "#1C1C1B",
      width: "100%",
      padding: 20,
      borderRadius: 10,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 6,
      elevation: 5,
    },
    cardImage: {
      width: 50,
      height: 50,
      borderRadius: 5,
      marginRight: 15,
    },
    cardText: {
      fontSize: 20,
      fontWeight: "600",
      color: "white",
    },
  });

  return (
    <View style={styles.cardContainer}>
      <TouchableOpacity
        onPress={onPress}
        style={styles.cardTouchable}
      >
        <Image
          source={{ uri: icon }}
          style={styles.cardImage}
        />
        <Text
          style={styles.cardText}
        >
          {name}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
