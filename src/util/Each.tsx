import React, { Children } from "react";

type EachProps<Type> = {
	render: (element: Type, index: number) => React.ReactElement;
	of: Type[];
};

const Each = <Type,>({ of, render }: EachProps<Type>) =>
	Children.toArray(of.map((item, index) => render(item, index)));

export default Each;
