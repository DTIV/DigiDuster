import React from 'react'


const Account = (props) => {
    if(props.account){
        return (
            <div className='account'>
                <div>
                    {props.account.slice(0,2)+"..."+props.account.slice(38,43)}
                </div>
            </div>
            
        )
    }else{
        return <></>
    }
    
}

export default Account
