import Modal from "./modal";

export default function TimeoutModal({ show, setShow }) {
	return (
		<Modal show={show}>
			<p>Timeout! Please check your internet connection.</p>
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
