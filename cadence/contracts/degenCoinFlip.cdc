// degenCoinFlip - user bets an amount and chooses heads or tails
// if they win, they get double their bet
// if they lose, they lose their bet

pub contract degenCoinFlip {

    pub var totalBetsPlaced: UInt64 
    pub var totalBetsWon: UInt64
    pub var totalBetsLost: UInt64

    pub event ContractInitialized()
    pub event BetPlaced(betAmount: UInt64, betOn: Bool)
    pub event AmountDeposited(amount: UInt64)
    pub event AmountWon(amount: UInt64)
    pub event BetWon(betAmount: UInt64, betOn: Bool)
    pub event BetLost(betAmount: UInt64, betOn: Bool)

    pub resource Bet {
        pub var betAmount: UInt64
        pub var betOn: Bool 
        pub var betResult: Bool 

        init(betAmount: UInt64, betOn: Bool, betResult: Bool) {
            self.betAmount = betAmount
            self.betOn = betOn
            self.betResult = betResult
            emit BetPlaced(betAmount: betAmount, betOn: betOn)

            let coinFlip = unsafeRandom() % 2 == 0 ? true : false

            if coinFlip == betOn {
                self.betResult = true
                emit BetWon(betAmount: betAmount, betOn: betOn)
            } else {
                self.betResult = false
                emit BetLost(betAmount: betAmount, betOn: betOn)
            }

            
        }

        pub fun getBetResult(): Bool {
            return self.betResult
        }
    }

    pub fun createBet(betAmount: UInt64, betOn: Bool): Bool{

        let bet <-create Bet(betAmount: betAmount, betOn: betOn, betResult: false)
        self.account.save<@Bet>(<-bet, to: /storage/Bet)
        return true
    }
   

    init() {
        self.totalBetsPlaced = 0
        self.totalBetsWon = 0
        self.totalBetsLost = 0
        emit ContractInitialized()
    }


}