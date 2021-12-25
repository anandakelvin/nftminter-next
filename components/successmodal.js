import Modal from "./modal";

export default function SuccessModal({ show, setShow, address }) {
	return (
		<Modal show={show}>
			<p>
				Head over to{" "}
				<a
					target="_blank"
					href={`https://ropsten.etherscan.io/address/${address}#tokentxnsErc721`}
					className="underline"
				>
					this link
				</a>{" "}
				to confirm your NFT retrieval
			</p>
			<div className="mt-4 flex justify-end">
				<button
					onClick={() => setShow(false)}
					className="p-4 py-2 text-sm rounded-md bg-blue-800 text-white text-center hover:scale-110 active:scale-90 transform transition ease-in-out"
				>
					Got it
				</button>
			</div>
		</Modal>
	);
}
