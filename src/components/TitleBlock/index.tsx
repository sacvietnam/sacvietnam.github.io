import AnimatedText from "../AnimatedText";

type ConceptBlockProps = {
  title: string;
  description: string;
};

const ConceptBlock = ({ title, description }: ConceptBlockProps) => {
  return (
    <div className="text-center max-w-[800px] min-h-[200px] mx-auto my-2">
      <AnimatedText
        text={title}
        className="mb-4 text-4xl font-medium tracking-wide md:text-5xl font-display text-primary"
      />
      <p className="max-w-[90%] md:max-w-[80%] mx-auto text-lg md:text-xl text-secondary ">
        {description}
      </p>
    </div>
  );
};

export default ConceptBlock;
