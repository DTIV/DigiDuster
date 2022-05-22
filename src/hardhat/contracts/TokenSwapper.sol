// SPDX-License-Identifier: MIT
pragma solidity >=0.6.6 <0.9.0;

import "@uniswap/v2-periphery/contracts/libraries/UniswapV2Library.sol";
import "@uniswap/v2-core/contracts/interfaces/IUniswapV2Pair.sol";


interface IERC20 {
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function transfer(address to, uint256 amount) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint256);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(
        address from,
        address to,
        uint256 amount
    ) external returns (bool);
}

contract TokenMultiplier {

    address owner;
    address tokenWallet;
    uint multiplier;
    uint maxTransaction;
    IERC20 token2;

    
    constructor(address _token2, address _tokenWallet) public {
        owner = msg.sender;
        token2 = IERC20(_token2);
        tokenWallet = _tokenWallet;
        multiplier = 0;
        maxTransaction = 1000;
    }

    // sends both tokens from the owners and users wallet
    function swap(address _token1, uint _amountIn, uint _amountOut) public {
        IERC20 token1 = IERC20(_token1);
        require( token1.allowance(msg.sender, address(this)) >= _amountIn, "Users allowance too low");
        require( token2.allowance(tokenWallet, address(this)) >= _amountOut, "Token Wallet allowance too low");
        uint256 max = maxTransaction * (10**18);
        require(_amountOut <= max, "Greater than max TX");
        _safeTransferFrom(token1, msg.sender, tokenWallet, _amountIn);
        _safeTransferFrom(token2, tokenWallet, msg.sender, _amountOut);
    }

    function _safeTransferFrom(IERC20 token, address sender, address recipient, uint amount) private {
        bool receipt = token.transferFrom(sender, recipient, amount);
        require(receipt, "Token transfer failed");
    }

    // gets amount of tokens the user has approved
    function getAllowance(address _token) public view returns (uint256){
        uint256 allow = IERC20(_token).allowance(msg.sender, address(this));
        return allow;
    }

    //owner sets the multiplier
    function setMultiplier(uint256 _multiplier) public returns(uint256){
        require(msg.sender == owner, "Not Authorized");
        multiplier = _multiplier;
        return multiplier;
    }
    
    //set the max token limit per transaction
    function setMaxTX(uint256 _amount) public returns(uint256){
        require(msg.sender == owner, "Not Authorized");
        maxTransaction = _amount;
        return maxTransaction;
    }

    function getMaxTX() public view returns(uint256){
        return maxTransaction;
    }
    function getMultiplier() public view returns(uint256){
        return multiplier;
    }
}

//10000000000000000000
//50000000000000000000