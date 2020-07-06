import Lottery from './ethereum/build/contracts/Lottery.json';
import web3 from './web3'



let LotteryDeployedAddress = Lottery.networks[5777].address;
let LotteryInstance = new web3.eth.Contract(Lottery.abi, LotteryDeployedAddress);

export default LotteryInstance;
