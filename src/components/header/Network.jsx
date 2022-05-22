
const Network = (props) => {
    if(props.currentNetwork){
        return (
            <div> 
                <div className="net-txt">
                  {props.currentNetwork}
                </div>
            </div>
        )
    }else{
        return <></>
    }
    
}

export default Network
