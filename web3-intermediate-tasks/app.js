//imports and declarations
const Web3 = require("web3");
const rpcURL = "https://rinkeby.infura.io/v3/744076a98deb48d68a972dd94f200bbf"; // Your RPC URL goes here
const web3 = new Web3(rpcURL);
const Tx = require("ethereumjs-tx").Transaction;
const contract1ABI = require("./ToKen1ABI").abi;
const contact1Address = require("./ToKen1ABI").address;

//helper functions and variables

const address1 = "0xa80C9010840401411CCc4861446bef73c6dB7e73"; // Your account address goes here
const address2 = "0xFa0F9b129E5E0aD12cabc69E20087E16F72Df4a4"; // Your account address goes here
const privateKey1 = Buffer.from(
  "370b7c90992917ea6ff938ff0237e3e688c06f1c4ab478f4c806d31e0631596a",
  "hex"
);
const privateKey2 = Buffer.from(
  "405d2dcf22d22ada8bd0fda9d8b2c38efaa08ad5474889b33b9a09da1f4639ba",
  "hex"
);

function toEth(val) {
  return web3.utils.fromWei(val, "ether");
}

function toWei(val) {
  return web3.utils.toWei(val);
}

function getBalance(address) {
  return web3.eth.getBalance(address, (err, wei) => {
    return wei;
  });
}

async function checkAllowance(contract, contactAddress, sourceAddress) {
  let allowance = await contract.methods
    .allowance(sourceAddress, contactAddress)
    .call();
  return allowance;
}

async function getApproval(contract, address, sourceAddress, approvalAmount) {
  try {
    await contract.methods
      .approve(address, toWei(approvalAmount))
      .send({ from: sourceAddress })
      .on("transactionHash", (hash) => {
        // hash of tx
        console.log("getApproval function: transaction hash => ");
      })
      .on("confirmation", function (confirmationNumber, receipt) {
        if (confirmationNumber === 1) {
          console.log(
            "getApproval function: on 1 block confirmation => ",
            confirmationNumber,
            receipt
          );
        }
      });
  } catch (error) {
    console.log(error);
  }
}

async function tokenBalance(address) {
  const bal = await contract.methods.balanceOf(address).call();
  return bal;
}

async function tokenBalance(address) {
  const bal = await contract.methods.balanceOf(address).call();
  return bal;
}

async function task1() {
  console.log("**************TASK-1**************");

  let balance1;
  let balance2;

  balance1 = await getBalance(address1);
  balance2 = await getBalance(address2);

  console.log("-----------before-transaction-----------");
  console.log("balance of account 1 ==>", toEth(balance1));
  console.log("balance of account 2 ==>", toEth(balance2));

  web3.eth.getTransactionCount(address1, (err, txCount) => {
    //build transaction
    const txObject = {
      nonce: web3.utils.toHex(txCount),
      to: address2,
      value: web3.utils.toHex(web3.utils.toWei("0.1", "ether")),
      gasLimit: web3.utils.toHex(21000),
      gasPrice: web3.utils.toHex(web3.utils.toWei("10", "gwei")),
    };

    // Sign the transaction
    const tx = new Tx(txObject, { chain: "rinkeby" });
    tx.sign(privateKey1);

    const serializedTx = tx.serialize();
    const raw = "0x" + serializedTx.toString("hex");

    // Broadcast the transaction
    web3.eth
      .sendSignedTransaction(raw, (err, txHash) => {
        console.log("txHash:", txHash, "err", err);
        // Now go check etherscan to see the transaction!
      })
      .on("receipt", async () => {
        balance1 = await getBalance(address1);
        balance2 = await getBalance(address2);
        console.log("-----------after-transaction-----------");
        console.log("balance of account 1 ==>", toEth(balance1));
        console.log("balance of account 2 ==>", toEth(balance2));
      });
  });
}

async function task2(abi, address) {
  const contract = new web3.eth.Contract(abi, address);
  console.log("contract", contract);
  const approval = await getApproval(contract, address, account3, 10);
  console.log("approval", approval);
  const allowance = await checkAllowance(contract, address, account3);
  console.log("allowance", allowance);
  const balanceOf = await tokenBalance(account3);
  console.log("balance of account is ", balanceOf);
}

async function task3(
  contractABI,
  contractAddress,
  event,
  startBlock,
  endBlock
) {
  const contract = new web3.eth.Contract(contractABI, contractAddress);
  let response = contract.getPastEvents(event, {
    fromBlock: startBlock,
    toBlock: endBlock,
  });
  console.log("response", response, response.length);
}

// task1();
// task2(contract1ABI, contact1Address);
// task3(contract1ABI, contact1Address, "AllEvents", 13873012, "latest");
