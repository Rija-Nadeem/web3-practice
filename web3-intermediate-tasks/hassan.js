import Web3 from "web3";
import abi from "./ABI";
const ETH_NODE_URL =
  "https://speedy-nodes-nyc.moralis.io/fc2bb71e9c6f8cf3d260091d/eth/rinkeby";
const privateKey =
  "0x44fbef73edf55d883c40df0b4ecec2eb91b2abc45abfc545cc8a71b9a6e9c542";
const address = "0x18dda4DfDE552FAF04f26c960704a2FDBc8d2F6A";
const receiverAddress = "0x4aa0b1851242f641a480F2199f0D86e107DA6160";
let web3 = new Web3(new Web3.providers.HttpProvider(ETH_NODE_URL));
const user = web3.eth.accounts.wallet.add(privateKey);
const transferTokens = async () => {
  try {
    const erc20Token = new web3.eth.Contract(
      abi,
      "0x01be23585060835e02b77ef475b0cc51aa1e0709"
    );
    const all = await erc20Token.methods
      .allowance(address, receiverAddress)
      .call();
    console.log("ALLL===========", typeof all);
    if (!Number(all)) {
      console.log("Approve------------------");
      await erc20Token.methods
        .approve(address, "100000000000000")
        .send({ from: user.address, gas: "96000" }, function (err, res) {
          if (err) {
            console.log("An error occured", err);
            return;
          }
          console.log("Approve ", res);
        });
    }
    console.log("TRANSFER FROM=====================");
    await erc20Token.methods
      .transferFrom(address, receiverAddress, "100000000000000")
      .send({ from: user.address, gas: "96000" }, function (err, res) {
        if (err) {
          console.log("An error occured", err);
          return;
        }
        console.log("TRANSFER FROM: ", res);
      });
  } catch (e) {
    console.log(e);
  }
};
transferTokens();
