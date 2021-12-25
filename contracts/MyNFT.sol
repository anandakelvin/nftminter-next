//Contract based on [https://docs.openzeppelin.com/contracts/3.x/erc721](https://docs.openzeppelin.com/contracts/3.x/erc721)
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "./base/ERC2981PerTokenRoyalties.sol";

contract KelvinNFT is ERC721URIStorage, Ownable, ERC2981PerTokenRoyalties {
    using Counters for Counters.Counter;
    Counters.Counter internal _tokenIds;

    constructor() public ERC721("KelvinNFT", "KNFT") {}

    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(ERC721, ERC2981Base)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function getLastId() external view onlyOwner returns (uint256) {
        return _tokenIds.current();
    }

    function mintNFT(
        address recipient,
        string memory tokenURI,
        address royaltyRecipient,
        uint256 royaltyValue
    ) public onlyOwner returns (uint256) {
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _safeMint(recipient, newItemId, "");
        _setTokenURI(newItemId, tokenURI);
        if (royaltyValue > 0) {
            _setTokenRoyalty(newItemId, royaltyRecipient, royaltyValue);
        }

        return newItemId;
    }

    function transfer(address from, address recipient) public onlyOwner {
        safeTransferFrom(from, recipient, _tokenIds.current());
    }
}
