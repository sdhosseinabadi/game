import React, { useEffect, useState } from 'react';
import getTotalSupply from "../cadence-integration/getTotalSupply";
import * as fcl from "@onflow/fcl/dist/fcl-react-native";
import { View, Text } from 'react-native';

type Props = {};

const SupplyFooter = (props: Props) => {
    const [totalSupply, setTotalSupply] = useState(0);

    const checkSupply = async () => {
        let _totalSupply;
        try {
            _totalSupply = await fcl.query({
                cadence: `${getTotalSupply}`,
            });
            setTotalSupply(_totalSupply);
            console.log(_totalSupply);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        checkSupply();
    }, []);

    const styles = {
        footer: {
            backgroundColor: "black",
            padding: 10,
            position: "fixed",
            left: 0,
            bottom: 0,
            width: "100%",
            textAlign: "center",
        },
        text: {
            color: "white",
            fontSize: 16,
        },
    };

    return (
        <View style={styles.footer}>
            <Text style={styles.text}>Total NFTs minted via Flow-Arcade: {totalSupply}</Text>
        </View>
    );
};

export default SupplyFooter;
