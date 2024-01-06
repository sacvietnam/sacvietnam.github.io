const TitleNSub = ({ title, sub }: { title: string; sub: string }) => {
	return (
		<>
			<h4 className="text-3xl font-semibold text-primary">{title}</h4>
			<p className="text-lg md:text-xl text-secondary">{sub}</p>
		</>
	);
};

export default TitleNSub;
