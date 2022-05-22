import React from 'react'
import SetMaxTX from '../buttons/SetMaxTX'
import SetMultiplier from '../buttons/SetMultiplier'

const OwnerDash = (props) => {
    const user = props.user;
    const swapContract= props.swapContract;
    const swapABI=props.swapABI;
    if((user === process.env.REACT_APP_OWNER_ETH) || 
        (user === process.env.REACT_APP_OWNER_BSC) || 
        (user === process.env.REACT_APP_TOKEN_WALLET_ETH) ||
        (user === process.env.REACT_APP_TOKEN_WALLET_BSC)){
        return (
            <div className='owner-input-wrap'>
                <SetMultiplier
                    user={user}
                    swapContract={swapContract}
                    swapABI={swapABI}/>
                <SetMaxTX
                    user={user} 
                    swapContract={swapContract}
                    swapABI={swapABI}/>
            </div>
        )
    }else{
        return <></>
    }
}

export default OwnerDash