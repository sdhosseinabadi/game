import * as fcl from "@onflow/fcl/dist/fcl-react-native";
import { useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
// import setFoo from "../../cadence/transactions/set-foo.cdc";
import { useCurrentUser } from "../hooks/useCurrentUser";
import Ionicons from '@expo/vector-icons/Ionicons';
import SupplyFooter from "../components/SupplyFooter";
import UserInfo from "../components/UserInfo";
export default function Core({ navigation }) {
  // Hook to obtain information about the current user
  const user = useCurrentUser();
  // Determines whether modal for transaction arguments is visible
  const [modalVisible, setModalVisible] = useState(false);
  // State for transaction argument (value of foo to set)
  const [fooInput, setFooInput] = useState("Placeholder text");

  // Commands to be displayed in the UI
  const commands = [
    {
      name: "Play kewl games",
      icon: "game-controller-outline",
      onPress: () => {
        // Navigate to the Collection screen
        navigation.navigate("Collection");
      }
    },
    // {
    //   name: "Execute Transaction",
    //   onPress: () => setModalVisible(true),
    // },
    // {
    //   name: "Execute Script",
    //   onPress: () => {
    //     fcl
    //       .query({
    //         cadence: getFoo,
    //       })
    //       .then((res) => {
    //         Alert.alert("Script executed", `The value of foo is: ${res}`);
    //       });
    //   },
    // },
    // {
    //   name: "Sign User Message",
    //   onPress: () => {
    //     fcl.currentUser
    //       .signUserMessage("12345678")
    //       .then((signatures: CompositeSignature[]) => {
    //         Alert.alert(
    //           "User Signature Success",
    //           signatures
    //             .map(
    //               (sig) =>
    //                 `addr: ${sig.addr}, keyId: ${sig.keyId}, message: 0x12345678\n\n${sig.signature}`
    //             )
    //             .join("\n\n")
    //         );
    //       })
    //       .catch((err) => {
    //         Alert.alert("User Signature Failed");
    //       });
    //   },
    // },
    // {
    //   name: "Get Latest Block",
    //   onPress: () =>
    //     fcl
    //       .block()
    //       .then((block) => Alert.alert("Block", JSON.stringify(block))),
    // },
    {
      name: "Log Out",
      icon: "exit-outline",
      onPress: () => fcl.unauthenticate(),
    },
  ];

  const styles = StyleSheet.create({
    scrollView: {
      padding: 20,
      flex: 1,
      flexDirection: "column",
      backgroundColor: "#2D2C35",
    },
    button: {
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",
      padding: 10,
      borderRadius: 10,
      backgroundColor: "#1C1C1B",
      shadowColor: "black",
      shadowOffset: {
        width: 0,
        height: 5,
      },
      shadowOpacity: 0.75,
      shadowRadius: 10,
      elevation: 5,
    },
    text: {
      fontSize: 20,
      fontWeight: "500",
      color: "white",
    },
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22,
      backgroundColor: "rgba(0,0,0,0.5)",
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      width: 300,
    },
    buttonModal: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
    },
    buttonCancel: {
      backgroundColor: "red",
    },
    buttonSend: {
      backgroundColor: "#2196F3",
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center",
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center",
      fontWeight: "bold",
      color: "white",
    },
    buttonIconContainer: {
      width: 80,
      height: 80,
      borderRadius: 100,
      alignItems: "center",
      justifyContent: "center",
      marginRight: 20,
      backgroundColor: "#1C1C1B",
      shadowColor: "black",
      shadowOffset: {
        width: 0,
        height: 5,
      },
      shadowOpacity: 0.85,
      shadowRadius: 10,
      elevation: 5,
    },
  });


  return (
    <>
      <ScrollView style={styles.scrollView}>
        <UserInfo />

        <View style={{ gap: 15, marginTop: 10 }}>
          {commands.map((command) => (
            <TouchableOpacity
              key={command.name}
              onPress={command.onPress}
              style={styles.button}
            >
              <View style={styles.buttonIconContainer}>
                <Ionicons name={command.icon} size={36} color="#01EE8B" />
              </View>
              <Text style={styles.text}>{command.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <SupplyFooter />
      </ScrollView>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>What to set HelloWorld.foo to?</Text>
            <TextInput
              style={{
                width: "100%",
                height: 40,
                marginBottom: 10,
                borderColor: "black",
                borderWidth: 1,
                borderRadius: 5,
                padding: 5,
              }}
              onChangeText={setFooInput}
              value={fooInput}
            />
            <View style={{ flexDirection: "row", gap: 5 }}>
              <Pressable
                style={[styles.buttonModal, styles.buttonCancel, { flex: 1 }]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Cancel</Text>
              </Pressable>
              <Pressable
                style={[styles.buttonModal, styles.buttonSend, { flex: 1 }]}
                onPress={async () => {
                  fcl.mutate({
                    cadence: setFoo,
                    args: (arg, t) => [arg(fooInput, t.String)],
                    limit: 999,
                  });

                  setModalVisible(!modalVisible);
                }}
              >
                <Text style={styles.textStyle}>Send TX</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}
