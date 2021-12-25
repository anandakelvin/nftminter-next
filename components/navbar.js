import { motion } from "framer-motion";

export default function Navbar() {
	return (
		<motion.div
			initial={{ opacity: 0, y: -200 }}
			animate={{ opacity: 1, y: 0 }}
			transition={"tween"}
			className="bg-darkCharcoal absolute top-0 left-0 w-full z-50"
		>
			<ul className="p-4 container mx-auto flex items-center text-white font-bold">
				<li>NFTMinter</li>
			</ul>
		</motion.div>
	);
}
