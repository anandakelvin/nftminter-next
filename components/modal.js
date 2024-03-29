import { AnimatePresence, motion } from "framer-motion";

export default function Modal({ children, show }) {
	return (
		<AnimatePresence>
			{show && (
				<div className="w-full h-full fixed z-50 flex flex-col justify-center">
					<div className="max-w-3xl w-full mx-auto p-7">
						<motion.div
							key="modal"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
						>
							<div className="rounded-xl bg-white w-full shadow-2xl">
								<div className="rounded-xl shadow-inner p-10">{children}</div>
							</div>
						</motion.div>
					</div>
				</div>
			)}
		</AnimatePresence>
	);
}
