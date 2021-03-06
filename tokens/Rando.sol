//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract RandoToken is ERC20 {
    constructor() ERC20('BDOGE', 'BDOGE') {
        _mint(msg.sender, 1000000000 * (10 ** 18));
    }
}