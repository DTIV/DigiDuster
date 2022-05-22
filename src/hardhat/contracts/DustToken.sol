//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract DigiDust is ERC20 {
    address owner;

    mapping(address => uint256) balances;
    constructor() ERC20('DigiDust', 'DUST'){
        _mint(msg.sender, 1000000000000 * (10**18));
    }
}