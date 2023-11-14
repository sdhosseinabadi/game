import React from "react";
import {
  Button,
  Image,
  Linking,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as fcl from "@onflow/fcl/dist/fcl-react-native";
import LoadingIndicator from "../components/LoadingIndicator";
import NoWalletsView from "../components/NoWalletsView";
import WalletServiceCard from "../components/WalletServiceCard";
import WalletDiscoveryWrapper from "../components/WalletDiscoveryWrapper";
const flowArcadeGif = require("./../../assets/game-assets/flow_arcade.gif");
import SupplyFooter from "../components/SupplyFooter";

const Auth = () => {
  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "#2D2C35",
      }}
      contentContainerStyle={{
        padding: 20,
      }}
    >
      <Text
        style={{
          fontSize: 32,
          fontWeight: "bold",
          color: "white",
          alignSelf: "center",
        }}
        adjustsFontSizeToFit={true}
      >
        Welcome to the
      </Text>
      <Text
        style={{
          fontSize: 40,
          fontWeight: "bold",
          fontFamily: "monospace",
          marginBottom: 10,
          color: "#01EE8B",
          alignSelf: "center",
        }}
        adjustsFontSizeToFit={true}
      >
        Flow-Arcade
      </Text>
      <Image
        source={flowArcadeGif}
        style={{
          width: 180,
          height: 180,
          alignSelf: "center",
          marginBottom: 30,
        }}
      />
      <Text
        style={{
          fontSize: 18,
          fontWeight: "600",
          lineHeight: 24,
          color: "white",
          alignSelf: "center",
        }}
      >
        &nbsp;Please choose a wallet to continue
      </Text>

      <View
        style={{
          flex: 1,
          flexGrow: 1,
          flexShrink: 1,
          backgroundColor: "#1C1C1B",
          borderRadius: 10,
          marginTop: 15,
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
        <fcl.ServiceDiscovery
          fcl={fcl}
          Loading={LoadingIndicator}
          Empty={NoWalletsView}
          ServiceCard={WalletServiceCard}
          Wrapper={WalletDiscoveryWrapper}
        />
      </View>
    </ScrollView>
  );
};

export default Auth;
