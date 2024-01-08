interface UserProps {
	user: {
		_id: string;
		username: string;
		description: string;
		country: string;
		profilePicture: string;
		birthDate: Date;
		nativaLanguages: string[];
	};
}

const User = ({ user }: UserProps) => {
	return (
		<li className="flex gap-6 rounded-xl bg-secondary p-6 text-sm">
			<div>avatar</div>
			<div className="space-y-1">
				<div className="flex items-center gap-2">
					<span className="text-base">{user.username}</span>
					<span>24</span>
					<span className={`fi fi-${user.country}`}></span>
				</div>

				<p>{user.description}</p>

				<div>
					<span>Speaks</span>
					
				</div>

				<div>
					<span>Learning</span>
				</div>
			</div>
		</li>
	);
};

export default User;
