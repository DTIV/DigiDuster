import React from 'react'
import { detectProvider } from '../../functions'
import { ethers } from 'ethers'

const SetMaxTX = (props) => {
    const contract = props.swapContract;
    const abi = props.swapABI;
    const user = props.user;
    const callContract = async (e) => {
        e.preventDefault()
        const provider = detectProvider()
        const eth = new ethers.providers.Web3Provider(provider)
        const signer = eth.getSigner()
        const Swap = new ethers.Contract(contract, abi, signer)
        await Swap.setMaxTX(e.target[0].value)
    }
    if((user === process.env.REACT_APP_OWNER_ETH) || 
        (user === process.env.REACT_APP_OWNER_BSC) || 
        (user === process.env.REACT_APP_TOKEN_WALLET_ETH) ||
        (user === process.env.REACT_APP_TOKEN_WALLET_BSC)){
        return (
            <div>
                <form className='set-form' action="" onSubmit={(e) => callContract(e)}>
                    <div>
                        <input className='swap-input' type="number" min={0} placeholder="Max Token Amt"/>
                    </div>
                    <div>
                        <input className='swap-btn' type="submit" value="Set Max Tokens"/>
                    </div>
                </form>
            </div>
        )
    }else{
        return <></>
    }
}

export default SetMaxTX