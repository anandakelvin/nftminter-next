require("dotenv").config();
const API_URL = process.env.API_URL;
const PUBLIC_KEY = process.env.PUBLIC_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(API_URL);
const contract = require("../artifacts/contracts/MyNFT.sol/KelvinNFT.json");
// const contractAddress = "0x81c587EB0fE773404c42c1d2666b5f557C470eED";
// const contractAddress = "0xA432d785f35440abA06aF92FC216978967087D32";
const contractAddress = "0x0b6fd8e0229428bF50042130c3409a9B71d73950";

const nftContract = new web3.eth.Contract(contract.abi, contractAddress);

async function sign(tx) {
	const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY);
	return signPromise
		.then((signedTx) => {
			web3.eth.sendSignedTransaction(
				signedTx.rawTransaction,
				function (err, hash) {
					if (!err) {
						console.log(
							"The hash of your transaction is: ",
							hash,
							"\nCheck Alchemy's Mempool to view the status of your transaction!"
						);
					} else {
						console.log(
							"Something went wrong when submitting your transaction:",
							err
						);
					}
				}
			);
		})
		.catch((err) => {
			console.log(" Promise failed:", err);
		});
}

export async function mintNFT(tokenURI, recipient, royalty = 0) {
	const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest");
	//the transaction
	const tx = {
		from: PUBLIC_KEY,
		to: contractAddress,
		nonce: nonce,
		gas: 500000,
		data: nftContract.methods
			.mintNFT(PUBLIC_KEY, tokenURI, recipient, royalty)
			.encodeABI(),
	};
	console.log("passed2");
	await sign(tx);
}

export async function transfer(recipient) {
	const nonce = (await web3.eth.getTransactionCount(PUBLIC_KEY, "latest")) + 1;
	//the transaction
	const tx = {
		from: PUBLIC_KEY,
		to: contractAddress,
		nonce: nonce,
		gas: 500000,
		data: nftContract.methods
			// .safeTransferFrom(PUBLIC_KEY, recipient, tokenId)
			.transfer(PUBLIC_KEY, recipient)
			.encodeABI(),
	};
	console.log("passed4");
	await sign(tx);
}
