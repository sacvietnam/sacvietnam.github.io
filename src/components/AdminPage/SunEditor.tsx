/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import SunEditor from "suneditor-react";
import {
	UploadBeforeHandler,
	UploadBeforeReturn,
} from "suneditor-react/dist/types/upload";
import "suneditor/dist/css/suneditor.min.css";
import { SunEditorOptions } from "suneditor/src/options";
import { uploadFile } from "../../services/fileService";
import { baseURL } from "../../util/axios/AxiosUtils";

const option: SunEditorOptions = {
	mode: "classic",
	rtl: false,
	katex: "window.katex",
	imageWidth: "",
	imageHeight: "",
	imageRotation: true,
	imageUploadUrl: "",
	imageUploadSizeLimit: 1000000,
	videoFileInput: false,
	tabDisable: false,
	buttonList: [
		["undo", "redo", "removeFormat"],
		[
			"font",
			"fontSize",
			"bold",
			"underline",
			"italic",
			"strike",
			"subscript",
			"superscript",
		],
		["fontColor", "hiliteColor"],
		[
			"formatBlock",
			"paragraphStyle",
			"blockquote",
			"outdent",
			"indent",
			"align",
			"lineHeight",
		],
		["table", "link", "image", "video", "audio", "math", "template"],
		["fullScreen", "showBlocks", "codeView", "preview", "print"],
		["save"],
	],
};

const SunEditorComponent = () => {
	const [content, setContent] = useState("");
	const lastImgPath = useRef<any>("");

	useEffect(() => {
		const onConfirmRefresh = function (event: any) {
			event.preventDefault();
			return (event.returnValue = "Are you sure you want to leave the page?");
		};

		window.addEventListener("beforeunload", onConfirmRefresh, {
			capture: true,
		});
		return () => {
			window.removeEventListener("beforeunload", onConfirmRefresh, {
				capture: true,
			});
		};
	});

	const handleImageUploadBefore = function (
		files: File[],
		info: object,
		uploadHandler: UploadBeforeHandler
	): UploadBeforeReturn {
		console.log(files, info, uploadHandler);

		uploadFile(files[0], "662e5389423e448006195c23", "article").then((path) => {
			uploadHandler(path); // Set the path to the uploadHandler
		});

		return true;
	};

	function handleImageUpload(targetImgElement: any) {
		lastImgPath.current = targetImgElement;
	}

	function handleImageUploadError(path_from_server: string, result: any) {
		console.log(path_from_server, result);
		lastImgPath.current.src = baseURL + "/" + path_from_server;
	}

	return (
		<div>
			<SunEditor
				onImageUploadBefore={handleImageUploadBefore}
				onImageUpload={handleImageUpload}
				onImageUploadError={handleImageUploadError}
				setOptions={option}
				autoFocus={true}
				setContents={content}
				onChange={setContent}
			/>
		</div>
	);
};
export default SunEditorComponent;
