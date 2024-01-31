// SPDX-License-Identifier: MIT
pragma solidity ^0.5.17;

import "github.com/OpenZeppelin/openzeppelin-contracts/blob/v2.3.0/contracts/examples/SimpleToken.sol#L20";
import "github.com/athiwatp/openzeppelin-solidity/blob/master/contracts/utils/Address.sol";

contract TokenAirdrop {
    address public owner;
    IERC20 public token;
    uint256 public airdropAmount;
    uint256 public multiplier;

    event Airdrop(address indexed recipient, uint256 amount);
    event AirdropModified(uint256 oldAmount, uint256 newAmount);

    constructor(IERC20 _token, uint256 _airdropAmount, uint256 _multiplier) public {
        owner = msg.sender;
        token = _token;
        airdropAmount = _airdropAmount;
        multiplier = _multiplier;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Caller is not the owner");
        _;
    }

    function airdrop(
        address source,
        address[] memory dests,
        uint256[] memory values
    ) public onlyOwner {
        require(dests.length == values.length, "Mismatched array lengths");

        uint256 totalAmount = 0;

        for (uint256 i = 0; i < dests.length; i++) {
            require(!Address.isContract(dests[i]), "Recipient is a contract");

            // Use safeTransferFrom from OpenZeppelin to handle potential transfer errors
            bool success = token.transferFrom(source, dests[i], values[i] * multiplier);
            require(success, "Token transfer failed");

            totalAmount += values[i] * multiplier;
            emit Airdrop(dests[i], values[i] * multiplier);
        }

        require(
            token.balanceOf(address(this)) >= totalAmount,
            "Insufficient token balance"
        );
    }

    function withdrawTokens(uint256 _amount) external onlyOwner {
        require(
            _amount <= token.balanceOf(address(this)),
            "Insufficient token balance"
        );
        token.transfer(owner, _amount);
    }
}
