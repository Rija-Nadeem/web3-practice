import React, { useState, useEffect, useCallback } from "react";
import Web3 from "web3";
import { useWeb3React, UnsupportedChainIdError } from "@web3-react/core";
import { abi } from "./ERC20Abi.json";
import { InjectedConnector } from "@web3-react/injected-connector";
import "./App.css";

const web3 = new Web3(Web3.givenProvider);

const contractAddress = "0x738fe9f10417ca93fd3689ee3ed254f856d8cce5";
const contract = new web3.eth.Contract(abi, contractAddress);


function App() {

  const web3context = useWeb3React();

  const deactivateWallet = useCallback(() => {
    web3context.deactivate()
  }, [web3context])

  const activateWallet = useCallback(
    () => {
      web3context
        .activate(
          new InjectedConnector({
            supportedChainIds: [1, 3, 4, 5, 42],
          }))
        .then((res) => {
          // console.log(res)
        })
        .catch((e) => {
          let error = "";
          if (e instanceof UnsupportedChainIdError) {
            error = "Unsupported Network";
          } else {
            console.log('error')
          }
        });

    },
    [web3context]
  );


  const [spender, setSpender] = useState(0);
  const [amount, setAmount] = useState(0);
  const [approve, setApprove] = useState(0);

  const handleSubmit = async e => {
    e.preventDefault();
    console.log(spender, amount)

    try {
      let allownce = await contract.methods
        .allowance(web3context.account, contractAddress)
        .call();
      console.log(allownce)

      if (!Number(allownce)) {
        console.log('if block')
        await contract.methods
          .approve(
            spender,
            web3.utils.toWei(amount)
          )
          .send({ from: web3context.account })
          .on("transactionHash", (hash) => {
            // console.log('hash generated', hash)
            alert('Your transaction is created')
          })
          .on("confirmation", function (confirmationNumber, receipt) {
            // console.log('confirmations', confirmationNumber, receipt)
            if (confirmationNumber === 1) {
              alert("Your transaction is Approved");
            }
          });
      }
    }
    catch (err) {
      alert(err.message);
    }
  };

  useEffect(() => {
    activateWallet();
  }, [approve]);

  useEffect(() => {
    if (web3context?.account) {
      setSpender(web3context.account)
    }
  }, [web3context]);

  if (web3context.active && web3context.account) {
    return (
      <div className="main" >
        <h1>
          Attempt at Contract: <br /> <b>{contractAddress}</b>
        </h1>
        <label htmlFor="spender">Spender</label>
        <input value={spender} id='spender' onChange={(e) => setSpender(e.target.value)} />
        <br />
        <label htmlFor="amount">Amount</label>
        <input value={amount} id="amount" onChange={(e) => setAmount(e.target.value)} />
        <br />
        <button onClick={handleSubmit} disabled={!spender || !amount} >Approve</button>
        <button onClick={deactivateWallet}>Disconnect</button>
        {approve == 1 && (<p>Approved Successfully! </p>)}
      </div>
    );
  } else {
    return (
      <div>
        <button onClick={activateWallet}>Connect</button>
      </div>
    );
  }

}

export default App;