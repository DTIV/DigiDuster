import Account from './Account';
import Network from "./Network";
import ConnectButton from './ConnectButton';
import "./header.css"

const Header = (props) => {
    return (
        <div className='top-menu-wrap'>
            <div className='logo-title'>
                <div className='logo-wrap'>
                    <img className='logo' src="https://img.icons8.com/dotty/80/588157/duster.png" alt="" />
                </div>
                <h1 className='main-title'>DigiDuster</h1>
            </div>
            <div className='menu-btn-wrap'>
                <a className='menu-btn' href="https://dtiv.gitbook.io/digiduster/" target="__blank">Docs</a>
            </div>
            <div className='account-top'>
                <ConnectButton connecting={props.connecting} connected={props.connected} connect={props.connect} />
                <Account account={props.account}/>
                <Network currentNetwork={props.network}/>
            </div>
        </div>
    )
}

export default Header
