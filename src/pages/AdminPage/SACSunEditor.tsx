/* eslint-disable @typescript-eslint/no-explicit-any */
import SunEditor from "suneditor-react";
import { UploadBeforeReturn } from "suneditor-react/dist/types/upload";
import "suneditor/dist/css/suneditor.min.css";
import { SunEditorOptions } from "suneditor/src/options";
import { uploadFileToTemp } from "../../services/fileService";
import { useRef } from "react";

const option: SunEditorOptions = {
	mode: "classic",
	rtl: false,
	katex: "window.katex",
	imageRotation: true,
	imageUploadUrl: "",
	imageUploadSizeLimit: 15000000,
	popupDisplay: "full",
	imageResizing: false,
	videoFileInput: false,
	tabDisable: false,
	buttonList: [
		["fullScreen"],
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
		["showBlocks", "codeView", "preview", "print"],
		["save"],
	],
};

type SACSunEditorProps = {
	value: string;
	setValue: (value: string) => void;
};

const SACSunEditor = ({ value, setValue }: SACSunEditorProps) => {
	const lastFile = useRef<File | null>(null);

	const handleImageUploadBefore = function (files: File[]): UploadBeforeReturn {
		lastFile.current = files[0];
		return true;
	};

	function handleImageUpload(targetImgElement: HTMLImageElement) {
		if (lastFile.current !== null) {
			uploadFileToTemp(lastFile?.current, "article").then((path) => {
				targetImgElement.src = path;
				targetImgElement.style.objectFit = "contain";
			});
		}
	}

	return (
		<div>
			<SunEditor
				onImageUploadBefore={handleImageUploadBefore}
				onImageUpload={handleImageUpload}
				setOptions={option}
				autoFocus={true}
				setContents={value}
				onChange={setValue}
			/>
		</div>
	);
};
export default SACSunEditor;
