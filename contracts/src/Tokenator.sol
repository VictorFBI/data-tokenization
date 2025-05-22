// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.29;

contract Tokenator {
    mapping(string => mapping(string => string)) private signatureToNamePathMap;
    address private contractOwner;

    constructor() {
        contractOwner = msg.sender;
    }

    modifier isOwner() {
        require(msg.sender == contractOwner, "Unauthorized");
        _;
    }

    function tokenize(string memory signature, string memory tokenName, string memory ipfsPath) external isOwner {
        signatureToNamePathMap[signature][tokenName] = ipfsPath;
    }

    function getTokenPathBySignatureAndName(string memory signature, string memory tokenName) external view isOwner returns (string memory) {
        return signatureToNamePathMap[signature][tokenName];
    }
}
