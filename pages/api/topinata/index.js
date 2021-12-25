import formidable from "formidable";
import fs from "fs";
const pinataSDK = require("@pinata/sdk");
const pinata = pinataSDK(process.env.PINATA_API, process.env.PINATA_SECRET);

export const config = {
	api: {
		bodyParser: false,
	},
};

const post = async (req, res) => {
	const form = new formidable.IncomingForm();
	form.parse(req, async function (err, fields, files) {
		const readableStreamForFile = fs.createReadStream(files.file.filepath);
		// const result = await pinata.pinFileToIPFS(readableStreamForFile);
		const result = await pinata.pinFileToIPFS(readableStreamForFile);
		console.log("passed1");
		res.status(201).json({ hash: result.IpfsHash });
		res.end();
	});
};

export default (req, res) => {
	req.method === "POST" && post(req, res);
	// : req.method === "PUT"
	// ? console.log("PUT")
	// : req.method === "DELETE"
	// ? console.log("DELETE")
	// : req.method === "GET"
	// ? console.log("GET")
	// : res.status(404).send("");
};
