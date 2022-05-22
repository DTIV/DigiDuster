import React from 'react'
import { ethers } from 'ethers';
import { detectProvider } from '../../functions';
var bigInt = require("big-integer");

const SwapTokens = (props) => {
    const SwapContract = props.swapContract;
    const SwapABI = props.swapABI;
    const amountSending = props.amountSending;
    const amountReceiving = props.amountReceiving;
    const contract = props.contract;
    
    const swapTokens = async (e) => {
        e.preventDefault()
        const provider = detectProvider()
        const eth = new ethers.providers.Web3Provider(provider)
        const signer = eth.getSigner()
        const Swap = new ethers.Contract(SwapContract, SwapABI, signer)
        if(contract){
            const amtSend = bigInt(amountSending * (10 **18))
            const amtReceive = bigInt(amountReceiving);
            const resultSend = amtSend.value;
            const resultReceive = amtReceive.value;
            const tx = await Swap.swap(contract, resultSend, resultReceive);
            const receipt = await tx.wait()
            if(receipt){
                console.log(receipt)
            }
        }else{
            // perform logic for bnb transfer
            console.log("No Contract -- ETH Swap")
        }
    }

    return (
        <div>
            <input className='swap-btn' type="submit" value="Swap" onClick={(e) => swapTokens(e)}/>
        </div>
    )
}

export default SwapTokens