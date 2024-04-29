import { Image } from "antd";
import parser, { Element, HTMLReactParserOptions } from "html-react-parser";

const HTMLParserOptions: HTMLReactParserOptions = {
	replace: (domNode) => {
		if (domNode instanceof Element && domNode.attribs.src) {
			const src = domNode.attribs.src;
			console.log(src);
			return (
				<div className="mx-auto my-3 w-fit">
					<Image
						className="object-contain max-w-[800px] max-h-[400px] mx-auto"
						src={src ? src : "https://via.placeholder.com/800x400"}
						alt={domNode.attribs.alt}
					/>
				</div>
			);
		}
	},
};

class HTMLParser {
	static parse(html: string) {
		return parser(html, HTMLParserOptions);
	}
}

export default HTMLParser;
