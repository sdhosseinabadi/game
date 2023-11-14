const getTotalSupply = `
import Minter from 0x2d3a367effe10e71;

pub fun main(): UInt64 {

    return Minter.totalSupply;

}
`;

export default getTotalSupply;
