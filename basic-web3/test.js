// //-----part 1-------
// const Web3 = require('web3')
// const rpcURL = 'https://mainnet.infura.io/v3/744076a98deb48d68a972dd94f200bbf' // Your RPC URL goes here
// const web3 = new Web3(rpcURL)
// const address = '0xDA9dfA130Df4dE4673b89022EE50ff26f6EA73Cf' // Your account address goes here
// web3.eth.getBalance(address, (err, wei) => {
//   balance = web3.utils.fromWei(wei, 'ether')
//   console.log('checking balance', balance)
// })

// //-----part 2-------
// const Web3 = require('web3');
// const rpcURL = 'https://mainnet.infura.io/v3/744076a98deb48d68a972dd94f200bbf'; // Your RPC URL goes here
// const web3 = new Web3(rpcURL);
// const contractABI=[{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"}],"name":"withdrawEther","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_value","type":"uint256"}],"name":"burn","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_value","type":"uint256"}],"name":"unfreeze","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"freezeOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_value","type":"uint256"}],"name":"freeze","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"inputs":[{"name":"initialSupply","type":"uint256"},{"name":"tokenName","type":"string"},{"name":"decimalUnits","type":"uint8"},{"name":"tokenSymbol","type":"string"}],"payable":false,"type":"constructor"},{"payable":true,"type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Burn","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Freeze","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Unfreeze","type":"event"}];
// const contractAddress='0xB8c77482e45F1F44dE1745F52C74426C631bDD52';
// const contract = new web3.eth.Contract(contractABI, contractAddress);
// console.log('contract', contract);
// contract.methods.balanceOf('0xB8c77482e45F1F44dE1745F52C74426C631bDD52').call((err, result)=>console.log('balance of: ',result));
// contract.methods.totalSupply().call((err, result)=>console.log('total supply : ',result));

// //-----part 3 (i)-------
// const Web3 = require('web3');
// var Tx = require('ethereumjs-tx').Transaction;

// const rpcURL = 'https://rinkeby.infura.io/v3/744076a98deb48d68a972dd94f200bbf'; // Your RPC URL goes here
// const web3 = new Web3(rpcURL);

// const acc1 ='0xFa0F9b129E5E0aD12cabc69E20087E16F72Df4a4'; //account1 have balance rn
// const acc2 ='0xa80C9010840401411CCc4861446bef73c6dB7e73'; //reeya have 0 balance


// const privateKey1= Buffer.from('405d2dcf22d22ada8bd0fda9d8b2c38efaa08ad5474889b33b9a09da1f4639ba','hex');
// const privateKey2= Buffer.from('370b7c90992917ea6ff938ff0237e3e688c06f1c4ab478f4c806d31e0631596a','hex');

// web3.eth.getTransactionCount(acc1, (err, txCount) => {
// //build transaction
// const txObject = {
//     nonce:    web3.utils.toHex(txCount),
//     to:       acc2,
//     value:    web3.utils.toHex(web3.utils.toWei('0.5', 'ether')),
//     gasLimit: web3.utils.toHex(21000),
//     gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei'))
//   }

// // Sign the transaction
// const tx = new Tx(txObject)
// tx.sign(privateKey1)

// const serializedTx = tx.serialize()
// const raw = '0x' + serializedTx.toString('hex')

// // Broadcast the transaction
// web3.eth.sendSignedTransaction(raw, (err, txHash) => {
//   console.log('txHash:', txHash, 'err', err)
//   // Now go check etherscan to see the transaction!
// })
// });


// //-----part 3 (ii)-------
// // const Web3 = require('web3');
// import Web3 from 'web3';
// // const Common = require('@ethereumjs/common');
// // const Chain = require('@ethereumjs/common').Chain;
// // const TX = require('@ethereumjs/tx');


// import { Chain, CustomChain } from '@ethereumjs/common';
// import  EthTransaction  from '@ethereumjs/tx';
// import { default as common } from '@ethereumjs/common';
// const Common = common.default
// const {Transaction}= EthTransaction;
// // console.log('data', data)

// const rpcURL = 'https://rinkeby.infura.io/v3/744076a98deb48d68a972dd94f200bbf'; // Your RPC URL goes here
// const web3 = new Web3(rpcURL);

// const acc1 ='0xFa0F9b129E5E0aD12cabc69E20087E16F72Df4a4'; //account1 have balance rn
// const acc2 ='0xa80C9010840401411CCc4861446bef73c6dB7e73'; //reeya have 0 balance

// const privateKey1= Buffer.from('405d2dcf22d22ada8bd0fda9d8b2c38efaa08ad5474889b33b9a09da1f4639ba','hex');
// const privateKey2= Buffer.from('370b7c90992917ea6ff938ff0237e3e688c06f1c4ab478f4c806d31e0631596a','hex');

// web3.eth.getTransactionCount(acc1, (err, txCount) => {
// //build transaction
// const txObject = {
//     nonce:    web3.utils.toHex(txCount),
//     to:       acc2,
//     value:    web3.utils.toHex(web3.utils.toWei('0.5', 'ether')),
//     gasLimit: web3.utils.toHex(21000),
//     gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei'))
//   }

// // Sign the transaction
// const common = new Common({ chain: 'rinkeby' })
// const tx = new Transaction(txObject, { common });
// const temp=tx.sign(privateKey1)

// const serializedTx = temp.serialize()
// const raw = '0x' + serializedTx.toString('hex')

// // Broadcast the transaction
// web3.eth.sendSignedTransaction(raw, (err, txHash) => {
//   console.log('txHash:', txHash, 'err', err)
//   // Now go check etherscan to see the transaction!
// })
// });

//part 4 is skipped because I can't get dummy tokens to transfer.

//-----part 5-------
import Web3 from 'web3';

const rpcURL = 'https://mainnet.infura.io/v3/744076a98deb48d68a972dd94f200bbf'; // Your RPC URL goes here
const web3 = new Web3(rpcURL);

const contractABI = [{"constant":true,"inputs":[],"name":"mintingFinished","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"unpause","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_amount","type":"uint256"}],"name":"mint","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"paused","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"finishMinting","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"pause","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_amount","type":"uint256"},{"name":"_releaseTime","type":"uint256"}],"name":"mintTimelocked","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Mint","type":"event"},{"anonymous":false,"inputs":[],"name":"MintFinished","type":"event"},{"anonymous":false,"inputs":[],"name":"Pause","type":"event"},{"anonymous":false,"inputs":[],"name":"Unpause","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"}];
const contractAddress = '0xd26114cd6EE289AccF82350c8d8487fedB8A0C07';

const contract = new web3.eth.Contract(contractABI, contractAddress);
contract.getPastEvents(
  'AllEvents',
  {
    fromBlock: 13873012,
    toBlock: 'latest'
  },
  (err, events) => { console.log('all events',events.length, 'err', err) }
)


