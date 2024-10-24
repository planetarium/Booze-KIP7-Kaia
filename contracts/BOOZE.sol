// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

import "@klaytn/contracts/KIP/token/KIP7/KIP7.sol";
import "@klaytn/contracts/access/Ownable.sol";
import "@klaytn/contracts/security/Pausable.sol";


contract BOOZE is KIP7, Ownable, Pausable {
    constructor() KIP7("BOOZE", "BOOZE") {
        _mint(msg.sender, 1000000000 * (10 ** decimals()));
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function transferOwnership(address newOwner) public onlyOwner override {
        _transferOwnership(newOwner);
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal override {
        super._beforeTokenTransfer(from, to, amount);

        require(!paused(), "KIP7Pausable: token transfer while paused");
    }
}
