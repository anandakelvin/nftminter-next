import Image from "next/image";

export default function FileForm({ pinataHash, setFile }) {
	return (
		<div>
			<label>Upload</label>
			<div
				style={{ paddingBottom: "100%", position: "relative" }}
				className="mt-1 py-14 p-1 border rounded-lg flex flex-col gap-6 sm:gap-0 justify-center items-center text-sm text-center"
			>
				{/* {file && <p>{fileData}</p>} */}
				<div className="absolute inset-0">
					{pinataHash && (
						<Image
							className="object-cover"
							layout="fill"
							src={"https://gateway.pinata.cloud/ipfs/" + pinataHash}
						/>
					)}
				</div>
				<div className="absolute top-0 z-40 left-0 w-full h-full flex items-center justify-center object-none">
					<div className="flex flex-col rounded p-5 bg-white">
						<input
							type="file"
							className="w-min mx-auto border rounded-sm"
							onChange={(event) => {
								if (event.target.files && event.target.files[0]) {
									const i = event.target.files[0];
									setFile(i);
								}
							}}
						/>
						<p className="text-gray-400 font-normal">
							Supports JPG, GIF, PNG. Max file size: 2MB.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
