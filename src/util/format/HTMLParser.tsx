import { Flex, Image } from "antd";
import parser, { Element, HTMLReactParserOptions } from "html-react-parser";

const HTMLParserOptions: HTMLReactParserOptions = {
	replace: (domNode) => {
		if (domNode instanceof Element && domNode.attribs.src) {
			const src = domNode.attribs.src;
			return (
				<Flex align="center" justify="center" className="my-4" >
					<Image
						className="object-cover w-[800px] max-w-dvh h-[600px] max-h-[80%] mx-auto"
						src={src ? src : "https://via.placeholder.com/800x400"}
						alt={domNode.attribs.alt}
					/>
				</Flex>
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
