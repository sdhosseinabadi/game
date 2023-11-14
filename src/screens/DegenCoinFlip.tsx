import * as fcl from "@onflow/fcl/dist/fcl-react-native";
import axios from "axios";
import { useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ConfettiCannon from "react-native-confetti-cannon";
import mintNFT from "../cadence-integration/mintNFT";
import UserInfo from "../components/UserInfo";
import { useCurrentUser } from "../hooks/useCurrentUser";

const coinFlipAnimationGif = require("./../../assets/game-assets/coin_flip_animation.gif");
const headsImage = require("./../../assets/game-assets/buff_doge.png");
const tailsImage = require("./../../assets/game-assets/weak_cheems.png");

const DegenCoinFlipScreen: React.FC = () => {
  const [isFlipping, setIsFlipping] = useState(false);
  const [currentImage, setCurrentImage] = useState(headsImage);
  const [wins, setWins] = useState(0);
  const [selected, setSelected] = useState("");
  const [confetti, setConfetti] = useState(false);
  const [scoreImage, setScoreImage] = useState("");
  const [loading, setLoading] = useState(false);
  // Hook to obtain information about the current user
  const user = useCurrentUser();
  const handleCoinFlip = (coin: string) => {
    setSelected(coin);
    const side = Math.random() < 0.5 ? "heads" : "tails";
    if (!isFlipping) {
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentImage(side === "heads" ? headsImage : tailsImage);
        setIsFlipping(false);
        setSelected("");
        if (coin === side) {
          setWins(wins + 1);
          setConfetti(true);
        } else {
          setWins(0);
        }
        setTimeout(() => {
          setConfetti(false);
        }, 3000);
      }, 3000);
    }
  };

  const searchScoreImage = async () => {
    try {
      // Make a GET request to the Unsplash API to search for high score images
      const response = await axios.get(
        `https://api.unsplash.com/search/photos?query=arcade&client_id=${UNSPLASH_API_KEY}`
      );

      if (response.data.results.length > 0) {
        const images = response.data.results;
        const randomIndex = Math.floor(Math.random() * images.length);
        const imageUri = images[randomIndex].urls.regular;
        setScoreImage(imageUri);
        console.log("Score image URI:", imageUri);
      }
    } catch (error) {
      console.log("Error searching for high score image:", error);
    }
  };

  const handleMintNFT = async () => {
    setLoading(true);
    await searchScoreImage();
    try {
      console.log("Minting NFT");
      console.log(user?.address);

      const transactionId = await fcl.mutate({
        cadence: `${mintNFT}`,
        args: (arg, t) => [
          arg("0x" + user?.address, t.Address),
          arg(`DegenCoinFlip Streak: ${wins}`, t.String),
          arg(`Your streak is ${wins}.`, t.String),
          arg(scoreImage, t.String), // Pass the high score image URI to the mint NFT function
        ],
        limit: 99,
      });
      console.log("Transaction sent to the network:", transactionId);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const styles = StyleSheet.create({
    scrollView: {
      padding: 20,
      flex: 1,
      flexDirection: "column",
      backgroundColor: "#2D2C35",
    },
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#2D2C35",
    },
    coinContainer: {
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 20,
    },
    coinGif: {
      width: 200,
      height: 200,
    },
    coinImage: {
      width: 200,
      height: 200,
    },
    buttonContainer: {
      width: "100%",
      marginTop: 20,
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
    button: {
      flex: 1,
      paddingVertical: 8,
      paddingHorizontal: 16,
      marginHorizontal: 8,
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
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
    buttonText: {
      fontSize: 15,
      fontWeight: "bold",
      color: "white",
    },
    counterText: {
      fontSize: 25,
      fontWeight: "bold",
      color: "white",
      alignSelf: "center",
    },
  });

  return (
    <>
      <ScrollView style={styles.scrollView}>
        <UserInfo />
        <View style={styles.container}>
          <TouchableOpacity style={styles.coinContainer} disabled={isFlipping}>
            {isFlipping ? (
              <Image source={coinFlipAnimationGif} style={styles.coinGif} />
            ) : (
              <Image source={currentImage} style={styles.coinImage} />
            )}
          </TouchableOpacity>

          {/* Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[
                styles.button,
                {
                  backgroundColor:
                    selected === "heads"
                      ? "#01EE8B"
                      : isFlipping
                      ? "gray"
                      : "#1C1C1B",
                },
              ]}
              onPress={() => handleCoinFlip("heads")}
              disabled={isFlipping}
            >
              <Text style={styles.buttonText}>HEADS</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.button,
                {
                  backgroundColor:
                    selected === "tails"
                      ? "#01EE8B"
                      : isFlipping
                      ? "gray"
                      : "#1C1C1B",
                },
              ]}
              onPress={() => handleCoinFlip("tails")}
              disabled={isFlipping}
            >
              <Text style={styles.buttonText}>TAILS</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <Text style={styles.counterText}>
              Win Streak: &nbsp;
              <Text
                style={{ color: wins === 0 ? "red" : "#01EE8B", fontSize: 32 }}
              >
                {wins}
              </Text>
            </Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: !wins && "gray" }]}
              disabled={!wins}
              onPress={handleMintNFT}
            >
              { !loading ?
              <Text style={[styles.buttonText, { fontSize: 18 }]}>
                Mint this streak ⛈️
              </Text>
              :
              <ActivityIndicator size="large" color="#0000ff" />
              }
            </TouchableOpacity>
          </View>
        </View>
        {confetti && (
          <ConfettiCannon
            count={200}
            origin={{ x: -10, y: 0 }}
            explosionSpeed={300}
            fallSpeed={3000}
            colors={["#ff00ff", "#00ffff", "#ffff00"]}
          />
        )}
      </ScrollView>
    </>
  );
};

export default DegenCoinFlipScreen;
