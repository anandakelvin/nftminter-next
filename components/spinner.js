import { AnimatePresence, motion } from "framer-motion";

export default function Spinner({ show }) {
	return (
		<AnimatePresence>
			{show && (
				<div className="w-screen h-screen fixed z-50 flex flex-col justify-center">
					<div className="max-w-3xl w-full mx-auto p-7">
						<motion.div
							key="modal"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
						>
							<div className="bg-transparent w-min mx-auto">
								{/* {children} */}
								<div className="inline-block transition-all transform">
									<svg
										className="animate-spin h-20 w-20 text-black"
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
									>
										<circle
											className="opacity-25"
											cx="12"
											cy="12"
											r="10"
											stroke="currentColor"
											strokeWidth="4"
										></circle>
										<path
											className="opacity-75"
											fill="currentColor"
											d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
										></path>
									</svg>
								</div>
							</div>
						</motion.div>
					</div>
				</div>
			)}
		</AnimatePresence>
	);
}
