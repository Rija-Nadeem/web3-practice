//imports and declarations
const Web3 = require("web3");
const rpcURL = "https://rinkeby.infura.io/v3/744076a98deb48d68a972dd94f200bbf"; // Your RPC URL goes here
const web3 = new Web3(rpcURL);
const Tx = require("ethereumjs-tx").Transaction;
const contractABI = require("./ABI").abi;
const contactAddressBasic = require("./contractAddress").ERC20Basic;

//helper functions and variables

const address1 = "0xFa0F9b129E5E0aD12cabc69E20087E16F72Df4a4"; // Your account address goes here
const address2 = "0xa80C9010840401411CCc4861446bef73c6dB7e73"; // Your account address goes here

const privateKey1 = Buffer.from(
  "405d2dcf22d22ada8bd0fda9d8b2c38efaa08ad5474889b33b9a09da1f4639ba",
  "hex"
);
const privateKey2 = Buffer.from(
  "370b7c90992917ea6ff938ff0237e3e688c06f1c4ab478f4c806d31e0631596a",
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

async function checkAllowance(contract, contractAddress, sourceAddress) {
  let allowance = await contract.methods
    .allowance(sourceAddress, contractAddress)
    .call();
  return allowance;
}

async function getApproval(contract, address, sourceAddress, approvalAmount) {
  try {
    await contract.methods
      .approve(address, toWei(approvalAmount))
      .send({ from: sourceAddress, gas: "96000" }, (err, res) => {
        console.log("getApproval", err, res);
      })
      // console.log('amount',amount)
      .on("transactionHash", (hash) => {
        // hash of tx
        console.log("getApproval function: transaction hash => ", hash);
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
    console.log("getApproval", error);
  }
}

async function performTransaction(contract, contractAddress, amount, to) {
  web3.eth.getTransactionCount(address1, (err, txCount) => {
    //build transaction
    const txObject = {
      nonce: web3.utils.toHex(txCount),
      to: contractAddress,
      value: web3.utils.toHex(web3.utils.toWei("0", "ether")),
      gasLimit: web3.utils.toHex(2100000),
      gasPrice: web3.utils.toHex(web3.utils.toWei("6", "gwei")),
      data: contract.methods.transfer(to, toWei(amount).toString()).encodeABI(),
    };

    // Sign the transaction
    const tx = new Tx(txObject, { chain: "rinkeby" });
    tx.sign(privateKey1);

    const serializedTx = tx.serialize();
    const raw = "0x" + serializedTx.toString("hex");

    // Broadcast the transaction
    web3.eth
      .sendSignedTransaction(raw, (err, txHash) => {
        console.log("performTransaction txHash:", txHash, "err", err);
        // Now go check etherscan to see the transaction!
      })
      .on("confirmation", function (confirmationNumber, receipt) {
        if (confirmationNumber === 1) {
          console.log(
            "performTransaction function: on 1 block confirmation => ",
            confirmationNumber,
            receipt
          );
        }
      });
  });
  // try {
  //   await contract.methods
  //     .transfer(to, toWei(amount).toString())
  //     .send({ from: sourceAddress })
  //     .on("transactionHash", (hash) => {
  //       // hash of tx
  //       console.log("performTransaction function: transaction hash => ", hash);
  //     })
  //     .on("confirmation", function (confirmationNumber, receipt) {
  //       if (confirmationNumber === 1) {
  //         console.log(
  //           "performTransaction function: on 1 block confirmation => ",
  //           confirmationNumber,
  //           receipt
  //         );
  //       }
  //     });
  // } catch (error) {
  //   console.log("performTransaction err", error);
  // }
}

async function performTransactionFrom(
  contract,
  contractAddress,
  from,
  amount,
  to
) {
  const pvt =
    "405d2dcf22d22ada8bd0fda9d8b2c38efaa08ad5474889b33b9a09da1f4639ba";
  const user = web3.eth.accounts.wallet.add(pvt.toString("hex"));

  let allowance;
  allowance = await checkAllowance(contract, contractAddress, from);

  if (!Number(allowance)) {
    await getApproval(contract, contractAddress, user.address, amount);
    allowance = await checkAllowance(contract, contractAddress, from);
  }
  if (Number(allowance)) {
    web3.eth.getTransactionCount(address1, (err, txCount) => {
      //build transaction
      const txObject = {
        nonce: web3.utils.toHex(txCount),
        to: contractAddress,
        value: web3.utils.toHex(web3.utils.toWei("0", "ether")),
        gasLimit: web3.utils.toHex(2100000),
        gasPrice: web3.utils.toHex(web3.utils.toWei("6", "gwei")),
        data: contract.methods
          .transferFrom(from, to, toWei(amount).toString())
          .encodeABI(),
      };

      // Sign the transaction
      const tx = new Tx(txObject, { chain: "rinkeby" });
      tx.sign(privateKey1);

      const serializedTx = tx.serialize();
      const raw = "0x" + serializedTx.toString("hex");

      // Broadcast the transaction
      web3.eth
        .sendSignedTransaction(raw, (err, txHash) => {
          console.log("performTransactionFrom txHash:", txHash, "err", err);
          // Now go check etherscan to see the transaction!
        })
        .on("confirmation", function (confirmationNumber, receipt) {
          if (confirmationNumber === 1) {
            console.log(
              "performTransactionFrom function: on 1 block confirmation => ",
              confirmationNumber,
              receipt
            );
          }
        });
    });
  }
}

async function tokenBalance(contract, address) {
  const bal = await contract.methods.balanceOf(address).call();
  return bal;
}

//tasks functions

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

  // await performTransaction(contract, address, "2", address2);
  // await performTransactionFrom(contract, address, address1, "2", address2);

  // const approval = await getApproval(contract, address, account2, 10);
  // console.log("approval", approval);

  // const allowance = await checkAllowance(contract, address, account2);
  // console.log("allowance", allowance);

  const balanceOf = await tokenBalance(contract, address2);
  console.log("balance of account is ", toEth(balanceOf));
}

async function task3(
  contractABI,
  contractAddress,
  event,
  startBlock,
  endBlock
) {
  const contract = new web3.eth.Contract(contractABI, contractAddress);
  try {
    let response = await contract.getPastEvents(event, {
      fromBlock: startBlock,
      toBlock: endBlock,
    });
    console.log("response", response, response.length);
  } catch (err) {
    console.log("task3 err", err);
  }
}

async function task4() {
  let web3 = new Web3(
    "wss://rinkeby.infura.io/ws/v3/744076a98deb48d68a972dd94f200bbf"
  );
  var subscription = web3.eth
    .subscribe("newBlockHeaders", function (error, result) {
      if (!error) {
        console.log("newBlockHeaders", result);

        return;
      }

      console.error("newBlockHeaders", error);
    })
    .on("connected", function (subscriptionId) {
      console.log("on connected", subscriptionId);
    })
    .on("data", function (blockHeader) {
      console.log("on data", blockHeader);
    })
    .on("error", function (error) {
      console.log("on error", error);
    });
  // console.log('subscription',subscription)
}

async function task5(tx){
  try{
    const data = await web3.eth.getTransactionReceipt(tx);
    if(data){
      if(data.status){
        const fees = toEth(data.effectiveGasPrice.toString()) * data.gasUsed;
        console.log('transaction fees => ', fees, ' eth');
      }else{
        console.log('transaction was failed')
      }
    }else{
      console.log('transaction is in pending')
    }
  } catch(err){
    console.log(err)
  }
}

// task1();
// task2(contractABI, contactAddressBasic);
// task3(contractABI, contactAddressBasic, "AllEvents", 10005387, 'latest');
// task4();

// confirmed
// task5('0xb3ddd1472e33f4d2f8ba02920d235e4ed4cac1d0c83ee4156837de9639b422cc');
// pending
// task5('0xf7602433e873b0b1c227c549fe5270316ffea970c41a0903f6d57be491d1b0bd');
//failed
// task5('0xd91fdbbf350511591685fcfd37d5d992a50c47f1eb36fc2200aca83d8f08cf2c')