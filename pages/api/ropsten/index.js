import { mintNFT, transfer } from "../../../scripts/mint-nft";

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const pinataSDK = require("@pinata/sdk");
const pinata = pinataSDK(process.env.PINATA_API, process.env.PINATA_SECRET);

export default async function ropsten(req, res) {
	if (req.method === "POST") {
		const data = JSON.parse(req.body);
		const {
			title,
			description,
			traits,
			pinataHash: mediaHash,
			address: recipient,
			royalty,
		} = data;
		console.log("incoming: " + recipient);
		const data1 = {
			attributes: [...traits],
			description: description,
			image: "https://gateway.pinata.cloud/ipfs/" + mediaHash,
			name: title,
		};
		console.log(data1);
		console.log("begin");
		const result = await pinata
			.pinJSONToIPFS(data1)
			.catch(() => res.status(502));
		await mintNFT(
			"https://gateway.pinata.cloud/ipfs/" + result.IpfsHash,
			recipient,
			royalty
		).catch(() => res.status(502));
		await transfer(recipient).catch(() => res.status(502));
		res.status(201);
		res.end();
	}
}
