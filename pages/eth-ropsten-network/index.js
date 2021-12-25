import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import FileForm from "../../components/fileform";
import Navbar from "../../components/navbar";
import Screen from "../../components/screen";
import Spinner from "../../components/spinner";
import SuccessModal from "../../components/successmodal";
import TimeoutModal from "../../components/timeoutmodal";

export default function NFTMinter() {
	const [timeoutModal, toggleTimeoutModal] = useState(false);
	const [successModal, toggleSuccessModal] = useState(false);
	const [loading, setLoading] = useState(false);
	const [pinataHash, setPinataHash] = useState("");
	const [file, setFile] = useState(null);
	const [royalty, setRoyalty] = useState("");
	const [address, setAddress] = useState("");
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [traits, setTraits] = useState([
		{
			trait_type: "",
			value: "",
		},
	]);

	const uploadToServer = async (event) => {
		setLoading(true);
		const body = new FormData();
		body.append("file", file);
		const response = await fetch("/api/topinata", {
			method: "POST",
			body,
		});
		const result = await response.json();
		setPinataHash(result.hash);
		setLoading(false);
	};

	useEffect(() => {
		file && uploadToServer();
	}, [file]);

	useEffect(() => {
		if (loading) {
			const kill = setTimeout(() => {
				setLoading(false);
				toggleTimeoutModal(true);
			}, 30000);

			return () => clearTimeout(kill);
		}
	}, [loading]);

	async function handleSubmit() {
		setLoading(true);
		const fire = await fetch("/api/ropsten", {
			method: "POST",
			body: JSON.stringify({
				title,
				description,
				traits: [...traits.filter((el) => el.trait_type !== "")],
				pinataHash,
				address,
				royalty: !isNaN(Number(royalty)) ? Number(royalty) * 100 : 0,
			}),
		});
		if (fire.ok) {
			toggleSuccessModal(true);
		}
		setLoading(false);
	}

	return (
		<Screen>
			<Spinner show={loading} />
			<TimeoutModal show={timeoutModal} setShow={toggleTimeoutModal} />
			<SuccessModal
				show={successModal}
				setShow={toggleSuccessModal}
				address={address}
			/>
			<Navbar />
			<div className="bg-brightGray pb-10">
				<div className="absolute top-0 left-0 h-72 w-full text-black bg-brightTurqoise py-32" />
				<div className="w-full max-w-5xl mx-auto p-5 flex relative flex-col gap-4 text-black">
					<div className="flex mt-20 sm:mt-24">
						<motion.div
							initial={{ opacity: 0, x: -200 }}
							animate={{ opacity: 1, x: 0 }}
							className="flex flex-col"
						>
							<h1 className="text-4xl">
								<span
									onClick={() => toggleSuccessModal(true)}
									className="font-semibold"
								>
									Create{" "}
								</span>
								your own NFT with ease.
							</h1>
						</motion.div>
					</div>
					<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
						<div className="sm:my-10 w-full bg-white border shadow-2xl rounded-lg flex flex-col">
							<div className="shadow-inner">
								<div className="flex flex-col md:flex-row gap-5 p-4">
									<div className="flex flex-col md:w-1/2">
										<FileForm pinataHash={pinataHash} setFile={setFile} />
									</div>
									<div className="flex flex-col gap-4 w-full md:w-1/2">
										<div>
											<label>Title</label>
											<input
												value={title}
												onChange={(e) => setTitle(e.target.value)}
												placeholder="Cooked Sushi"
												className="mt-1 p-3 border rounded-lg block w-full"
											/>
										</div>
										<div>
											<label>Description</label>
											<textarea
												value={description}
												onChange={(e) => setDescription(e.target.value)}
												placeholder="A poor cooked Sushi"
												rows={3}
												className="mt-1 p-3 border rounded-lg block w-full"
											/>
										</div>
										<div>
											<label>Add details about the NFT</label>
											<div className="flex flex-col gap-2 mt-1 border rounded-lg p-4">
												{traits.map((el, index) => {
													return (
														<motion.div
															key={index}
															initial={{
																opacity: 0,
															}}
															animate={{
																opacity: 1,
															}}
														>
															<div className="flex gap-2">
																<div className="w-1/2">
																	<label>Trait Type</label>
																	<input
																		value={traits[index].trait_type}
																		onChange={(e) => {
																			const old = [...traits];
																			old[index].trait_type = e.target.value;
																			setTraits(old);
																		}}
																		placeholder="Shape"
																		className="mt-1 p-3 border rounded-lg block w-full"
																	/>
																</div>
																<div className="w-1/2">
																	<label>Value</label>
																	<input
																		value={traits[index].value}
																		onChange={(e) => {
																			const old = [...traits];
																			old[index].value = e.target.value;
																			setTraits(old);
																		}}
																		placeholder="Rectangle"
																		className="mt-1 p-3 border rounded-lg block w-full"
																	/>
																</div>
															</div>
														</motion.div>
													);
												})}
												<div className="mt-2 flex justify-end">
													<button
														onClick={() =>
															setTraits((prev) => [
																...prev,
																{ trait_type: "", value: "" },
															])
														}
														className="p-4 py-2 text-sm rounded-md bg-blue-800 text-white text-center hover:scale-110 active:scale-90 transform transition ease-in-out"
													>
														Add More
													</button>
												</div>
											</div>
										</div>
										<div>
											<label>Royalty for each marketplace sales (%)</label>
											<input
												type="number"
												value={royalty}
												onChange={(e) => setRoyalty(e.target.value)}
												placeholder="2.5"
												className="mt-1 p-3 border rounded-lg block w-full"
											/>
										</div>
										<div className="mt-5 mb-1 text-xs text-spanishGray">
											<div>
												<label>Your wallet address</label>
												<input
													value={address}
													onChange={(e) => setAddress(e.target.value)}
													placeholder="0x691840dD3..."
													className="mt-1 p-3 border rounded-lg block w-full text-black text-base"
												/>
											</div>
											<div className="flex justify-end">
												<button
													onClick={() => {
														handleSubmit();
													}}
													className="mt-2 p-4 py-2 text-sm rounded-md bg-blue-800 text-white text-center hover:scale-110 active:scale-90 transform transition ease-in-out"
												>
													Proceed to mint
												</button>
											</div>
											<p className="mt-4">
												Once your NFT is minted on the Ropstein{" "}
												<span className="font-bold underline">test</span>{" "}
												blockchain, you will not be able to edit or update any
												of its information.
											</p>
											<p className="mt-4">
												You agree that any information uploaded to our NFT
												Minter will not contain material subject to copyright or
												other proprietary rights, unless you have necessary
												permission or are otherwise legally entitled to post the
												material.
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</motion.div>
				</div>
			</div>
			<div className="bg-darkGunmetal border-t-10 border-violetsAreBlue">
				<div className="p-5 py-2 container mx-auto flex text-spanishGray text-xs">
					<p>© 2022</p>
				</div>
			</div>
		</Screen>
	);
}
