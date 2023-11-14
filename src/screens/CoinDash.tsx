import React, { useEffect, useState } from "react";
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as fcl from "@onflow/fcl/dist/fcl-react-native";
import mintNFT from "../cadence-integration/mintNFT";
import axios from "axios"; // Import axios for making API requests
import { UNSPLASH_API_KEY } from "@env";
import { useCurrentUser } from "../hooks/useCurrentUser";
import UserInfo from "../components/UserInfo";

interface Coin {
  id: number;
  position: {
    x: number;
    y: number;
  };
  timer: NodeJS.Timeout | null;
}

const coinImage = require("./../../assets/game-assets/coin.png");
const initialCoinSpawnInterval = 1000; // Initial interval between coin spawns in milliseconds

const CoinDash: React.FC = () => {
  const user = useCurrentUser();
  const [coins, setCoins] = useState<Coin[]>([]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [time, setTime] = useState(30);
  const [gameOver, setGameOver] = useState(false);
  const [loading, setLoading] = useState(false);
  const [scoreImage, setScoreImage] = useState(""); // Store the high score image URI

  useEffect(() => {
    if (time > 0 && !gameOver) {
      // Timer logic
      const timer = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);

      // Clean up the timer when the component unmounts or game over
      return () => clearInterval(timer);
    } else {
      // Game over logic
      setGameOver(true);
    }
  }, [time, gameOver]);

  useEffect(() => {
    const getHighScore = async () => {
      try {
        const storedHighScore = await AsyncStorage.getItem("highScore");
        if (storedHighScore) {
          setHighScore(parseInt(storedHighScore));
        }
      } catch (error) {
        console.log("Error getting high score from cache:", error);
      }
    };

    getHighScore();
  }, []);

  useEffect(() => {
    if (gameOver) {
      // Cleanup function
      return () => {
        setCoins([]);
      };
    }
  }, [gameOver]);

  useEffect(() => {
    if (!gameOver) {
      // Coin spawning logic
      const coinInterval = setInterval(() => {
        setCoins((prevCoins) => [
          ...prevCoins,
          {
            id: prevCoins.length,
            position: {
              x: Math.random() * 300,
              y: Math.random() * 500,
            },
            timer: null, // Timer for tracking the time limit to click the coin
          },
        ]);
      }, initialCoinSpawnInterval);

      // Clean up the coin interval when the component unmounts or game over
      return () => clearInterval(coinInterval);
    }
  }, [gameOver]);

  const handleCoinPress = (coinId: number) => {
    setCoins((prevCoins) =>
      prevCoins.filter((coin) => {
        // Clear the timer for the clicked coin
        if (coin.id === coinId && coin.timer) {
          clearTimeout(coin.timer);
        }
        return coin.id !== coinId;
      })
    );
    setScore((prevScore) => prevScore + 1);
  };

  const handlePlayAgain = () => {
    if (score > highScore) {
      setHighScore(score);
      try {
        AsyncStorage.setItem("highScore", score.toString());
      } catch (error) {
        console.log("Error setting high score in cache:", error);
      }
    }
    setGameOver(false);
    setCoins([]); // Clear the coins state
    setScore(0);
    setTime(30);

    // Clear timers for each coin
    coins.forEach((coin) => {
      if (coin.timer) {
        clearTimeout(coin.timer);
      }
    });
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
          arg(`Name of the NFT: DashToken${score}`, t.String),
          arg(
            `Description of the NFT: You scored ${score}. ${
              highScore > score
                ? "Better luck next time!"
                : "You beat the previous high score! Keep Grinding!"
            }`,
            t.String
          ),
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

  useEffect(() => {
    // Timer for tracking the time limit to click each coin
    const coinTimers = coins.map((coin) => {
      if (!coin.timer) {
        const coinTimer = setTimeout(() => {
          setCoins((prevCoins) =>
            prevCoins.filter((prevCoin) => prevCoin.id !== coin.id)
          );
        }, 3000); // Time limit to click the coin in milliseconds

        return { id: coin.id, timer: coinTimer };
      }

      return coin;
    });

    // Clear timers when game is reset
    return () => {
      coinTimers.forEach((coin) => {
        if (coin.timer) {
          clearTimeout(coin.timer);
        }
      });
    };
  }, []); // Remove dependency on coins state

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
    },
    timer: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 16,
      color: "white",
    },
    score: {
      fontSize: 18,
      marginBottom: 16,
      color: "white",
    },
    coin: {
      position: "absolute",
      justifyContent: "center",
      alignItems: "center",
    },
    coinImage: {
      width: 50,
      height: 50,
    },
    overlay: {
      height: "100%",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.8)",
    },
    gameOverText: {
      fontSize: 30,
      color: "white",
      fontWeight: "bold",
      marginBottom: 16,
    },
    highScoreText: {
      fontSize: 24,
      color: "white",
      marginBottom: 16,
    },
    buttonContainer: {
      flexDirection: "row",
      marginTop: 16,
    },
    button: {
      marginHorizontal: 8,
      paddingVertical: 8,
      paddingHorizontal: 16,
      backgroundColor: "#1C1C1B",
      borderRadius: 4,
    },
    buttonText: {
      fontSize: 18,
      fontWeight: "bold",
      color: "white",
    },
  });

  return (
    <>
      <ScrollView style={styles.scrollView}>
        <UserInfo />
        {gameOver ? (
          <View style={styles.overlay}>
            <Text style={styles.gameOverText}>Game Over!</Text>
            <Text style={styles.highScoreText}>Score: {score}</Text>
            <Text style={styles.highScoreText}>High Score: {highScore}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={handlePlayAgain}>
                <Text style={styles.buttonText}>Play Again</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={handleMintNFT}>
              { !loading ?
              <Text style={styles.buttonText}>
                Mint NFT
              </Text>
              :
              <ActivityIndicator size="large" color="#0000ff" />
              }
              </TouchableOpacity>
            </View>
            <ConfettiCannon
              count={200}
              origin={{ x: -10, y: 0 }}
              explosionSpeed={300}
              fallSpeed={3000}
              colors={["#ff00ff", "#00ffff", "#ffff00"]}
            />
          </View>
        ) : (
          <View style={styles.container}>
            <Text style={styles.timer}>{time}</Text>
            <Text style={styles.score}>Score: {score}</Text>
            {coins.map((coin) => (
              <TouchableOpacity
                key={coin.id}
                style={[
                  styles.coin,
                  { left: coin.position.x, top: coin.position.y },
                ]}
                onPress={() => handleCoinPress(coin.id)}
              >
                <Image source={coinImage} style={styles.coinImage} />
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>
    </>
  );
};

export default CoinDash;
