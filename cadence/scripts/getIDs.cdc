import MetadataViews from 0x631e88ae7f1d7c20;

pub fun main(address: Address): PublicAccount {
    
  let account = getAccount(address)


  // let collection = account
  //   .getCapability(/storage/MinterCollection)
  //   .borrow<&{MetadataViews.ResolverCollection}>()
  //   ?? panic("Could not borrow a reference to the collection")

  // let IDs = collection.getIDs()
  // return IDs;
  return account;
}

import MetadataViews from 0x631e88ae7f1d7c20;

pub fun main(address: Address): PublicAccount {
    
  let account = getAccount(address)


  // let collection = account
  //   .getCapability(/storage/MinterCollection)
  //   .borrow<&{MetadataViews.ResolverCollection}>()
  //   ?? panic("Could not borrow a reference to the collection")

  // let IDs = collection.getIDs()
  // return IDs;
  return account;
}
