import { View, Text } from "react-native";
import { useCurrentUser } from "../hooks/useCurrentUser";

const UserInfo = () => {
    const user = useCurrentUser();
    return (
        <View
            style={{
                padding: 25,
                borderRadius: 10,
                marginBottom: 10,
                backgroundColor: "#1C1C1B",
                shadowColor: "black",
                shadowOffset: {
                    width: 0,
                    height: 5,
                },
                shadowOpacity: 0.75,
                shadowRadius: 10,
                elevation: 5,
            }}
        >
            <Text
                style={{
                    fontSize: 22,
                    marginBottom: 15,
                    fontWeight: "bold",
                    color: "white",
                }}
            >
                Your Account
            </Text>
            <View
                style={{
                    flexDirection: "row",
                    marginBottom: 3,
                    justifyContent: "space-between",
                }}
            >
                <Text style={{ fontSize: 18, fontWeight: "500", color: "#01EE8B" }}>
                    Address
                </Text>
                <Text style={{ fontSize: 18, color: "white" }}>
                    {user?.address ?? "Loading..."}
                </Text>
            </View>
            <View
                style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
                <Text style={{ fontSize: 18, fontWeight: "500", color: "#01EE8B" }}>
                    Balance
                </Text>
                <Text style={{ fontSize: 18, color: "white" }}>
                    {user ? `${user.balance / 10 ** 8} FLOW` : "Loading..."}
                </Text>
            </View>
        </View>
    )
}

export default UserInfo;