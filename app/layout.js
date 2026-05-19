import { Big_Shoulders, Outfit } from "next/font/google";
import { CartProvider } from "@/contexts/CartContext";
import "./globals.css";

const bigShoulders = Big_Shoulders({
	variable: "--font-big-shoulders",
	subsets: ["latin"],
	weight: "900",
});

const outfit = Outfit({
	variable: "--font-outfit",
	subsets: ["latin"],
	weight: ["300", "400", "500", "600"],
});

export const viewport = {
	width: "device-width",
	initialScale: 1,
	viewportFit: "cover",
	themeColor: "#070a14",
};

export const metadata = {
	title: "NJC Shoes Cleaning — Premium Schoenenverzorging",
	description:
		"Premium Nederlandse schoenenverzorgingskits voor de echte sneakerhead.",
};

export default function RootLayout({ children }) {
	return (
		<html lang="nl" className={`${bigShoulders.variable} ${outfit.variable}`}>
			<body>
				{/* Covers the iOS notch/safe-area — prevents content bleeding into status bar */}
				<div style={{
					position: 'fixed',
					top: 0,
					left: 0,
					right: 0,
					height: 'env(safe-area-inset-top, 0px)',
					background: '#070a14',
					zIndex: 99999,
					pointerEvents: 'none',
				}} />
				<CartProvider>{children}</CartProvider>
			</body>
		</html>
	);
}
