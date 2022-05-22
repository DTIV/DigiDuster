import React from 'react'
import "./swap.css"
import { useState, useEffect } from 'react';
import { BsArrowDownCircle } from "react-icons/bs";
import Modal from './Modal';
import ApproveTokens from '../buttons/ApproveTokens';
import { ethers } from 'ethers';
import { detectProvider } from '../../functions';
import ERC20 from "../../contractData/ERC20Abi.json"
import SwapTokens from '../buttons/SwapTokens';
import OwnerDash from './OwnerDash';

const IUniswapV2Router02 = require('@uniswap/v2-periphery/build/IUniswapV2Router02.json')

const SwapCard = (props) => {

  const [currContract, setCurrContract] = useState("");
  const [tokenName, setTokenName] = useState("");
  const [tokenBal, setTokenBal] = useState(0);
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [tokenAllowance, setTokenAllowance] = useState(0);
  const [DUSTBal, setDUSTBal] = useState(0)
  const [tokenAmount, setTokenAmount] = useState(0);
  const [approved, setApproved] = useState(false);
  const [getProvider, setProvider] = useState("")
  const [amtBefore, setAmtBefore] = useState(0)
  const [amtReceiving, setAmtReceiving] = useState(0)

  const swapContract = props.swapContract;
  const swapABI = props.swapABI;
  const DUSTContract = props.dust;
  const dustAbi = props.dustAbi;
  const ownerAllowance = props.available;
  const multiplier = props.multiplier;
  const user = props.user;

  const openModal = (e) => {
    e.preventDefault()
    var modal = document.getElementById("tokenModal");
    modal.style.display = "block";
  }

  const getAmountReceiving = async () => {
 
    const BDOGE = "0x121636C43E96D97AB00B6c6994cDDEBEf27dE1C7" //Real BDOGE (IN PLACE OF RANDOM TOKEN)
    const OMG = "0xe1E2ec9a85C607092668789581251115bCBD20de" //TRANSFER TOKEN
    const WETH = "0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000"; // TRANSFER TOKEN WETH
    const OLO = "0x5008F837883EA9a07271a1b5eB0658404F5a9610"; //REAL CONTRACT OLO(IN PLACE OF DUST)

    // const BDOGE = "0x8c6768bb5448F910D15AdAa1Cf6B0076c6487962" //Real BDOGE (IN PLACE OF RANDOM TOKEN)
    // const OMG = "0xC5086AA4BB6F18B3D966381E18Bcc317CeD9507c" //TRANSFER TOKEN
    // const WETH = "0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000"; // TRANSFER TOKEN WETH
    // const OLO = "0x4204a0aF0991b2066d2D617854D5995714a79132"; //REAL CONTRACT OLO(IN PLACE OF DUST)
    const uRouterV2 = process.env.REACT_APP_ROUTER_ETH

    const provider = detectProvider()
    const eth = new ethers.providers.Web3Provider(provider)
    const signer = eth.getSigner()
    const router = new ethers.Contract(uRouterV2, IUniswapV2Router02.abi, signer)
    const tk = ethers.utils.parseEther(tokenAmount.toString())
    console.log(parseInt(tk))
    if(parseInt(tk)){
      try{
        const amountOut = await router.getAmountsOut(tk, [BDOGE,OMG,WETH,OLO])
        const amountBefore = Number(amountOut[3])
        const amountAfter = amountBefore * multiplier
        setAmtBefore(amountBefore/(10**18));
        setAmtReceiving(amountAfter);
      }catch{
        const amountBefore = parseInt(tk);
        const amountAfter = parseInt(tk) * multiplier;
        setAmtBefore(amountBefore/(10**18));
        setAmtReceiving(amountAfter);
      }
      
    }
  }

  useEffect(() => {
    getAmountReceiving()
  }, [tokenAmount])
  

  useEffect(() => {
    getTokenData()
  }, [])

  useEffect(() => {
    getTokenData()
  }, [user, currContract, ownerAllowance])
  
  const getTokenData = async () => {
    const provider = detectProvider()
    setProvider(provider)
    const eth = new ethers.providers.Web3Provider(provider)
    const signer = eth.getSigner()
    const DUST = new ethers.Contract(DUSTContract, dustAbi, signer)
    const accounts = await eth.listAccounts()
    setApproved(false)
    try{
      const DUSTbalance = await DUST.balanceOf(user, {gasLimit: 30000000})
      setDUSTBal((Number(DUSTbalance)/(10**18)).toFixed(2));
    }catch(err){
      setDUSTBal(0)
    }
    if(currContract.length > 39){
      const Token = new ethers.Contract(currContract, ERC20, signer)
      const tokenName = await Token.name();
      const tokenSymbol = await Token.symbol();
      // Get Token Name and Symbol
      setTokenName(tokenName);
      setTokenSymbol(tokenSymbol);
      // Get Token Allowance
      try{
        const allow = await Token.allowance(user, swapContract);
        if(Number(allow) > tokenAmount){
          setApproved(true)
        }else{
          setApproved(false)
        }
        setTokenAllowance(Number(allow))
      }catch(err){
        setTokenAllowance(0)
        setApproved(false)
      }
      // GET Token Balance
      try{
        const balance = await Token.balanceOf(user, {gasLimit: 30000000})
        setTokenBal((Number(balance)/(10**18)).toFixed(2));
      }catch(err){
        setTokenBal(0)
      }

    }else{
      const weiBalance = (await eth.getBalance(accounts[0])).toString()
      const etherBalance = (Number(weiBalance)/10**18).toFixed(5)
      setTokenBal(etherBalance)
      setTokenSymbol("ETH")
      setTokenName("ETH")
      if(ownerAllowance === 0){
        setApproved(false)
      }else{
        setApproved(true)
      }
    }
  }

  const available = (props.available / (10**18)).toFixed(2)
  return (
    <div className='swap-card-wrap'>
      <div id="main-swap" className='swap-card'>
        <div>
          <div className='title swap-title'>Swap</div>
          <div>
            <Modal 
              setContract={setCurrContract}
              getTokenData={getTokenData}/>
          </div>
          <form action="" className='swap-form'>
            <div className='input-wrap'>
              <div className='change-token'>
                <div className='token-wrap'>
                  <div className='swap-logo'>
                    <img className='swap-logo-img' alt="" />
                  </div>
                  <div>{tokenName}</div>
                </div>
                <div>
                  <button className='change-token-btn' onClick={(e) => openModal(e)}>Change Token</button>
                </div>
              </div>
              <input className='swap-input' min={0} defaultValue={0} type="number" onChange={(e) => setTokenAmount(e.target.value)}/>
              <div className='bal-info'>
                <small>Balance: {tokenBal} {tokenSymbol}</small>
              </div>
            </div>
            <div className='arrow-wrap'>
              <BsArrowDownCircle className='arrow-icon'/>
            </div>
            <div className='input-wrap'>
              <div className='token-wrap'>
                <div className='swap-logo'>
                  <img className='swap-logo-img' alt="" />
                </div>
                <div>{props.symbol}</div>
              </div>
              <input className='swap-input' type="number" min={0} value={amtReceiving/(10**18)} disabled/>
              <div className='bal-info'>
                <small>Balance: {DUSTBal} {props.symbol}</small>
              </div>
            </div>
            {
              approved ?
                <SwapTokens
                  contract={currContract}
                  amountSending={tokenAmount}
                  amountReceiving={amtReceiving}
                  swapContract={swapContract}
                  swapABI={swapABI}/>
              :
              <ApproveTokens
                user={props.user}
                currentToken={currContract}
                tokenABI={ERC20}
                tokensToApprove={tokenBal}
                tokenAmount={tokenAmount}
                ownerAllowance={ownerAllowance}
                tokenAllowance={tokenAllowance}
                DUSTContract={DUSTContract}
                dustAbi={dustAbi}
                swapContract={swapContract}
                swapABI={swapABI}
                approved={setApproved}/>
            }
          </form>
          <OwnerDash 
            user={user}
            contract={currContract}
            swapContract={swapContract}
            swapABI={swapABI}/>
        </div>
      </div>
      <div className='swap-card'>
        <div>
          <div className='info-wrap'>
            <div className='info-title'>Multiplier</div>
            <div>{props.multiplier} x</div>
          </div>
          <div className='info-wrap'>
            <div className='info-title'>Tokens Available</div>
            <div>{available} <small>{props.symbol}</small></div>
          </div>
          <div className='info-wrap'>
            <div className='info-title'>Max Swap</div>
            <div>{props.maxTX} <small>{props.symbol}</small></div> 
          </div>
          <div className='info-wrap'>
            <div className='info-title'>Amount Before</div>
            <div>{amtBefore} <small>{props.symbol}</small></div>
          </div>
          <div className='info-wrap'>
            <div className='info-title'>Amount Receiving</div>
            <div>{amtReceiving/(10**18)} <small>{props.symbol}</small></div>
          </div>
          <div className='info-wrap'>
            <div className='info-title'>Route</div>
            <div>{tokenSymbol} {'>'} OMG {'>'} WETH {'>'} {props.symbol}</div>
          </div>
        </div>
      </div>
    </div>
    
  )
}

export default SwapCard