import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { detectProvider } from "./functions";
import SwapAddress from './contractData/swap-address.json'
import SwapArtifacts from './contractData/Swap.json'
import DUSTAddress from './contractData/dust-address.json'
import DUSTArtifacts from './contractData/DUSTToken.json'
import Header from './components/header/Header';
import SwapCard from "./components/swap/SwapCard";

function App() {
  const [connected, setConnected] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [getCurrentAccount, setCurrentAccount] = useState("");
  const [getCurrentNetwork, setCurrentNetwork] = useState("");
  const [getProvider, setProvider] = useState(false);
  const [ownerAllowance, setOwnerAllowance] = useState(0)
  const [getMaxTX, setMaxTX] = useState(0)
  const [getMultiplier, setMultiplier] = useState(0)
  const [mainName, setMainName] = useState("")
  const [mainSymbol, setMainSymbol] = useState("")

  // SWAP CONTRACT
  const SwapContract = SwapAddress.Token
  const SwapABI = SwapArtifacts.abi

  //CONTRACT MOCK TOKEN
  const DUST = DUSTAddress.Token;
  const DUSTabi = DUSTArtifacts.abi;
  

  useEffect(()=> {
    // Set provider and check connection
    const Disconnect = () => {
      setConnected(false)
      setCurrentAccount("")
      setCurrentNetwork("")
    }

    const provider = detectProvider()
    setProvider(provider)
    if(provider){
      provider.request({ method: 'eth_accounts' })
      .then((res) => {
        if(res.length > 0){
          setConnected(true)
          onConnect(provider)
        }else{
          Disconnect()
        }
      })
    }
    getData()
  },[getCurrentAccount, getProvider])

  useEffect(() => { 
    // Handle account and network changes
    const handleAccountsChanged = async () => {
      const accounts = await getProvider.request({method: 'eth_accounts'})
      setCurrentAccount(accounts)
    }

    const handleNetworkChanged = async () => {
      const chainId = await getProvider.request({ method: 'eth_chainId' });
      setCurrentNetwork(parseInt(chainId))
    }

    if(connected){
      getProvider.on('accountsChanged', handleAccountsChanged);
      getProvider.on('chainChanged', handleNetworkChanged);
      return () => {
        getProvider.removeListener('accountsChanged', handleAccountsChanged);
        getProvider.removeListener('chainChanged', handleNetworkChanged);
      }
    }
  }, [connected, getProvider])
  
  const Connect = async () => {
    // METAMASK CONNECT
    if(getProvider) {
      if(getProvider !== window.ethereum) {
        console.error("Not window.ethereum provider!")
      }
      setConnecting(true);
      try{
        await getProvider.request({
          method: "eth_requestAccounts"
        })
      }catch(err){
        console.log(err)
      }
      onConnect(getProvider)
      setConnecting(false);
    }
  }

  const onConnect = async (provider) => {
    const chain_id = await provider.request({ method: 'eth_chainId' })
    const eth = new ethers.providers.Web3Provider(provider);
    const accounts = await eth.listAccounts()
    try{
      provider.request({ method: 'eth_accounts' })
      .then((res) => {
        if(res.length > 0){
          setConnected(true)
          setCurrentAccount(accounts[0])
          setCurrentNetwork(parseInt(chain_id))
        }else{
          setConnected(false)
        }
      })
    }catch (err) {
      console.log(err)
    }
  }

  const getData = async () => {
    const provider = detectProvider()
    const eth = new ethers.providers.Web3Provider(provider)
    const signer = eth.getSigner()
    const tokenWallet= process.env.REACT_APP_TOKEN_WALLET_ETH
    const DUSTContract = new ethers.Contract(DUST, DUSTabi, signer)
    const Swap = new ethers.Contract(SwapContract, SwapABI, signer)
    const allow = await DUSTContract.allowance(tokenWallet, Swap.address);
    const mult = await Swap.getMultiplier();
    const maxTX = await Swap.getMaxTX();
    const name = await DUSTContract.name()
    const symbol = await DUSTContract.symbol()
    setMainName(name)
    setMainSymbol(symbol)
    setOwnerAllowance(Number(allow))
    setMaxTX(Number(maxTX)) 
    setMultiplier(Number(mult))
  }

  return (
    <div className="App">
      <div className="app-wrap">
        <Header 
          connected={connected}
          connecting={connecting}
          connect={Connect}
          account={getCurrentAccount}
          network={getCurrentNetwork}/>
          <div className="swap-wrap-main">
            <SwapCard
              user={getCurrentAccount}
              swapContract={SwapContract}
              swapABI={SwapABI}
              dust={DUST}
              dustAbi={DUSTabi}
              multiplier={getMultiplier}
              maxTX={getMaxTX}
              available={ownerAllowance}
              symbol={mainSymbol}
              name={mainName}/>
          </div>
      </div>
    </div>
  );
}

export default App;
