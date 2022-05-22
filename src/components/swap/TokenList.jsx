import React from 'react'
import "./swap.css"
const TokenList = (props) => {
  return (
    <div className='tokenlist-wrap'>
        <div className='imported-token'>
            <div className='import-logo'>
                <div>
                    <img className='swap-logo-img' alt="" />
                </div>
                <div>BNB</div>
            </div>
            <div>Imported</div>
        </div>
    </div>
  )
}

export default TokenList