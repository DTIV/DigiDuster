import React from 'react'
import { detectProvider } from '../../functions'
import { useState } from 'react';
import { ethers } from 'ethers';

const SetMultiplier = (props) => {
    const contract = props.swapContract;
    const abi = props.swapABI;
    const user = props.user;
    const callContract = async (e) => {
        e.preventDefault()
        const multiplier = e.target[0].value;
        const provider = detectProvider()
        const eth = new ethers.providers.Web3Provider(provider)
        const signer = eth.getSigner()
        const Swap = new ethers.Contract(contract, abi, signer)
        await Swap.setMultiplier(multiplier)
    }
    if((user === process.env.REACT_APP_OWNER_ETH) || 
        (user === process.env.REACT_APP_OWNER_BSC) || 
        (user === process.env.REACT_APP_TOKEN_WALLET_ETH) ||
        (user === process.env.REACT_APP_TOKEN_WALLET_BSC)){
        return (
            <div>
                <form className='set-form' action="" onSubmit={(e) => callContract(e)}>
                    <div>
                        <input className='swap-input' type="number" placeholder='Multiplier'/>
                    </div>
                    <div>
                        <input className='swap-btn' type="submit" value="Set Multiplier"/>
                    </div>
                </form>
            </div>
        )
    }else{
        return <></>
    }
    
}

export default SetMultiplier