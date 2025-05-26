// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.29;

contract Tokenator {
    mapping(string => string) private tokenNameToPath;
    mapping(string => string) private tokenNameToEncryptionKey;
    address private contractOwner;

    constructor() {
        contractOwner = msg.sender;
    }

    modifier isOwner() {
        require(msg.sender == contractOwner, "Unauthorized");
        _;
    }

    function savePath(
        string memory tokenName,
        string memory ipfsPath
    ) external isOwner {
        tokenNameToPath[tokenName] = ipfsPath;
    }

    function getPath(
        string memory tokenName
    ) external view isOwner returns (string memory) {
        string memory ipfsPath = tokenNameToPath[tokenName];
        require(!compareStrings(ipfsPath, ""), "No path for this token name");
        return ipfsPath;
    }

    function saveEncryptionKey(
        string memory tokenName,
        string memory encryptionKey
    ) external isOwner {
        tokenNameToEncryptionKey[tokenName] = encryptionKey;
    }

    function getEncryptionKey(
        string memory tokenName
    ) external view isOwner returns (string memory) {
        string memory encryptionKey = tokenNameToEncryptionKey[tokenName];
        require(
            !compareStrings(encryptionKey, ""),
            "No key for this token name"
        );
        return encryptionKey;
    }

    function compareStrings(
        string memory str1,
        string memory str2
    ) private pure returns (bool) {
        return keccak256(bytes(str1)) == keccak256(bytes(str2));
    }
}
