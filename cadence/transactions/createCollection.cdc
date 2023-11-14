// not important at the moment 

import "NFTMinter" 

transaction () {
  
  prepare(acct: AuthAccount) {
                                                // I changed the storage address here
    acct.save(<- NFTMinter.createCollection(), to: /storage/NFTMinter)
    
    // We're linking two resources in different storage domains
    acct.link<&NFTMinter.Collection{NFTMinter.CollectionPublic}>
      (/public/NFTMinter, target: /storage/NFTMinter)
  }
  
  execute {
    log("Stored a collection for our NUTTY empty NFTs")
  }
}