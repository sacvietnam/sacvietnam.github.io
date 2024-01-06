import { FcAndroidOs } from "react-icons/fc";
import { MdOutlineFileDownload } from "react-icons/md";
import appIconSrc from "../../assets/imgs/product/app_icon.png";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Image, Spin } from "antd";
import img1 from "./appImgs/1.jpg";
import img2 from "./appImgs/2.jpg";
import img3 from "./appImgs/3.jpg";
import img4 from "./appImgs/4.jpg";
import { motion } from "framer-motion";

const imgSources = [img1, img2, img3, img4];

const Download = () => {
	const [isClicked, setClicked] = useState<boolean>(false);

	useEffect(() => {
		let to = 0;
		if (isClicked) {
			to = setTimeout(() => {
				setClicked(false);
			}, 1000);
		}

		return () => {
			clearTimeout(to);
		};
	}, [isClicked]);
	return (
		<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
			<div className="max-w-screen-xl px-2 py-4 mx-auto">
				<div className="flex flex-col gap-8 md:gap-16 md:flex-row">
					<div className="grid place-items-center">
						<img
							className="w-1/2 rounded-lg md:w-full"
							src={appIconSrc}
							alt="App icon"
						/>
					</div>
					<div className="flex flex-col gap-2 text-center md:text-left">
						<h2 className="text-5xl font-display text-primary">SAC Remote</h2>
						<p className="text-justify text-secondary">
							The application allows viewing temperature, humidity, and battery
							information sent from the SAC device. You can also set the fan
							speed and automatically turn the device on and off.
						</p>
						<div className="flex flex-col items-center gap-2 md:items-start">
							<p>Available in:</p> <FcAndroidOs className="text-5xl" />
						</div>
						<p>Size: ~38mb</p>
						{isClicked ? (
							<button
								disabled
								className="flex items-center gap-2 px-4 py-2 mx-auto transition-all bg-white rounded-md text-text md:mx-0 drop-shadow-lg w-fit"
							>
								<Spin /> Downloading
							</button>
						) : (
							<Link
								onClick={() => setClicked(true)}
								download
								to="/apk/SAC Remote.apk"
								target="_blank"
								className="mx-auto md:mx-0 w-fit"
							>
								<button className="flex items-center gap-2 px-4 py-2 mx-auto text-white transition-all rounded-md md:mx-0 bg-primary drop-shadow-lg w-fit hover:bg-light_primary hover:scale-105 active:scale-95">
									<MdOutlineFileDownload className="text-xl text-white" />
									Download for Android
								</button>
							</Link>
						)}
					</div>
				</div>
				<div className="w-full mt-8">
					<h3 className="mb-2 text-xl">Some images of the software:</h3>
					<Image.PreviewGroup items={imgSources}>
						<div className="flex gap-2 overflow-x-auto flex-nowrap snap-mandatory snap-x">
							{imgSources.map((path, index) => (
								<motion.div
									initial={{ x: -100, opacity: 0 }}
									animate={{ x: 0, opacity: 1 }}
									transition={{ delay: 0.5 * index + 0.5, duration: 0.5 }}
								>
									<Image
										key={path}
										src={path}
										width={200}
										height={400}
										className="object-contain select-none min-w-[200px]  snap-center"
									/>
								</motion.div>
							))}
						</div>
					</Image.PreviewGroup>
				</div>
			</div>
		</motion.div>
	);
};

export default Download;
