import React from 'react'
import { detectProvider } from '../../functions'
import { ethers } from 'ethers'

const ApproveTokens = (props) => {
    const DUSTContract = props.DUSTContract;
    const dustAbi = props.dustAbi;
    const tokenContract = props.currentToken;
    const tokenABI = props.tokenABI;
    const user = props.user;

    const approveTokenWallet = async (e) => {
        e.preventDefault()
        const provider = detectProvider()
        const eth = new ethers.providers.Web3Provider(provider)
        const signer = eth.getSigner()
        const DUST = new ethers.Contract(DUSTContract, dustAbi, signer)
        console.log(DUST)
        const tx = await DUST.approve(props.swapContract, ethers.utils.parseEther("100000"), {gasLimit: 300000, nonce:4});
        const receipt = tx.wait()
        if(receipt){
            props.approved(true)
        }
    }

    const approveUser = async (e) => {
        // ADD USER DEFINED TOKEN CONTRACT HERE
        e.preventDefault()
        console.log("HERE!")
        const provider = detectProvider()
        const eth = new ethers.providers.Web3Provider(provider)
        const signer = eth.getSigner()
        const Token = new ethers.Contract(tokenContract, tokenABI, signer)
        const amount = Number(props.tokensToApprove).toFixed(0)
        const tx = await Token.approve(props.swapContract, ethers.utils.parseEther("100000"), {gasLimit: 300000});
        const receipt = await tx.wait()
        if(receipt){
            props.approved(true)
        }    
    }

    
    if(props.ownerAllowance){
        
        // OWNER HAS APPROVED TOKENS FOR SWAPPING
        if(props.tokenAllowance === 0){
            // USER HAS NO TOKEN ALLOWANCE
            return (
                <div>
                    <button className='swap-btn' onClick={(e) => approveUser(e)}>Approve</button>
                </div>
            )
        }else{
            if(props.tokenAllowance < props.tokenAmount){
                // USER DOES NOT HAVE ENOUGH TOKENS APPROVED FOR SWAP
                return (
                    <div>
                        <button className='swap-btn' onClick={(e) => approveUser(e)}>Approve</button>
                    </div>
                )
            }else{
                // USER CAN SWAP
                return <div>Users can Swap now!</div>
            }
            
        }
    }else{
        // OWNER DOES NOT HAVE TOKENS APPROVED FOR SWAP
        if(user === process.env.REACT_APP_TOKEN_WALLET_ETH){
            // OWNER CAN APPROVE TOKENS
            return (
                <div>
                    <button className='swap-btn' onClick={(e) => approveTokenWallet(e)}>Approve Token Wallet</button>
                </div>
            )
        }
        return (
            // USERS ARE DISABLED FROM APPROVING
            <div>
                <button className='swap-btn' disabled>Approved</button>
            </div>
        )
    }
}

export default ApproveTokens