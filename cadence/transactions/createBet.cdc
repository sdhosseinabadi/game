import "degenCoinFlip"

transaction (
    betAmount: UInt64,
    betOn: Bool
) {
    prepare(signer: AuthAccount) { 
        signer.link<&degenCoinFlip.DegenCoinFlip{degenCoinFlip.BetManager}>(
            /public/degenCoinFlip,
            target: /storage/degenCoinFlip
        )
    }

    execute { 
        // place the bet 
        degenCoinFlip.createBet(
            betAmount: betAmount,
            betOn: betOn
        )
        log("Bet placed")
    }
}