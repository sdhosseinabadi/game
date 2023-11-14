import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useCurrentUser } from '../hooks/useCurrentUser';
import { useEffect } from 'react';
import { t } from '@onflow/fcl';
import SupplyFooter from '../components/SupplyFooter';
import UserInfo from '../components/UserInfo';

const CollectionScreen = ({ navigation }) => {
  const user = useCurrentUser();

  const games = [
    {
      id: 1,
      title: 'Doge n CoinFlip',
      subtitle: 'Playful & parody twist on the popular staking game: Degen CoinFlip',
      icon: require('./../../assets/game-assets/flow_doge.png'),
      onPress: () => navigation.navigate('DegenCoinFlip'),
    },
    {
      id: 2,
      title: 'Coin Dash',
      subtitle: 'Test your reflexes and gather coins before the timer runs out!',
      icon: require('./../../assets/game-assets/coin_stack.png'),
      onPress: () => navigation.navigate('CoinDash'),
    },
    {
      id: 3,
      title: 'More...',
      subtitle: 'More games to be added soon',
      icon: require('./../../assets/game-assets/coin.png'),
    },
    // Add more games as needed
  ];

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#2D2C35',
      gap: 20,
    },
    gameItem: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      padding: 12,
      borderRadius: 10,
      backgroundColor: '#1C1C1B',
      shadowColor: 'black',
      shadowOffset: {
        width: 0,
        height: 5,
      },
      shadowOpacity: 0.75,
      shadowRadius: 10,
      elevation: 5,
    },
    gameIconContainer: {
      width: 80,
      height: 80,
      borderRadius: 100,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 10,
      backgroundColor: '#1C1C1B',
      shadowColor: 'black',
      shadowOffset: {
        width: 0,
        height: 5,
      },
      shadowOpacity: 0.85,
      shadowRadius: 10,
      elevation: 5,
    },
    gameIcon: {
      width: 50,
      height: 50,
      marginRight: 10,
      borderRadius: 30,
      margin: 'auto',
    },
    gameTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: 'white',
      marginBottom: 3,
    },
    gameSubtitleWrapper: {
      flex: 1,
      width: '100%',
    },
    gameSubtitle: {
      fontSize: 14,
      lineHeight: 20,
      color: 'white',
    },
  });

  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        <UserInfo />
        {games.map((game) => (
          <TouchableOpacity key={game.id} style={styles.gameItem} onPress={game.onPress}>
            <View style={styles.gameIconContainer}>
              <Image source={game.icon} style={styles.gameIcon} />
            </View>
            <View style={styles.gameSubtitleWrapper}>
              <Text style={styles.gameTitle}>{game.title}</Text>
              <Text style={styles.gameSubtitle} numberOfLines={2}>
                {game.subtitle}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
        <SupplyFooter />
      </ScrollView>
    </>
  );
};

export default CollectionScreen;
