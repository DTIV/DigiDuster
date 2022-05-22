import "./header.css"

const ConnectButton = (props) => {
    if(props.connecting){
        return (
            <div>
                <button className="connect-btn" disabled>Connecting...</button>
            </div>
        ) 
    }else{
        if(props.connected){
            return(
                <></>
            )   
        }else{
            return(
                <div >
                    <button className="connect-btn" onClick={props.connect}>Connect</button>
                </div>
            )
        }
    }
}
export default ConnectButton
