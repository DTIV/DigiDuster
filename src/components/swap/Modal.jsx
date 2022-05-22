import React from 'react'
import TokenList from './TokenList'


const Modal = (props) => {
    const closeModal = () => {
        var modal = document.getElementById("tokenModal");
        modal.style.display = "none";
    }
    
    window.onclick = function(event) {
        var modal = document.getElementById("tokenModal");
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    const changeContract = () => {
        
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const contract = e.target[0].value;
        props.setContract(contract)
        props.getTokenData()
    }

    return (
        <div id="tokenModal" className="modal">
            <div className="modal-content">
                <span onClick={closeModal} className="close">&times;</span>
                <div>
                    <form className='modal-form' action="" onSubmit={(e) => handleSubmit(e)}>
                        <div>
                            <input className='text-input' type="text" placeholder='Enter Contract Address'/>
                        </div>
                        <div>
                            <input className='swap-btn' type="submit" placeholder='Search'/>
                        </div>
                    </form>
                    
                    <div className=''>
                        <TokenList />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal