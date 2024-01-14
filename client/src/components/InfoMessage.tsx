interface InfoMessageProps {
	title: string;
	description?: string;
}

const InfoMessage = ({ title, description = '' }: InfoMessageProps) => {
	return (
		<div className="flex flex-col gap-2">
			<h2>{title}</h2>
			{description && <p>{description}</p>}
		</div>
	);
};

export default InfoMessage;
