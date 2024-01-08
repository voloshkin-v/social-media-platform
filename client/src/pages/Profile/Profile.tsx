import { useParams } from 'react-router-dom';
import { calculateUserAge } from '@/lib/utils';
import useUser from '@/features/profile/hooks/useUser';
// import { getCountryCode } from 'countries-list';
import '/node_modules/flag-icons/css/flag-icons.min.css';

import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { Badge } from '@/components/ui/badge';

const Profile = () => {
	const { id } = useParams();
	const { data: user, isPending, isError } = useUser(id || '');

	if (isPending) {
		return <p>Loading...</p>;
	}

	if (isError) {
		return <p>User not found</p>;
	}

	// const isCountryCodeAvailable = getCountryCode(user.country || '');
	// const countryCode = isCountryCodeAvailable
	// 	? isCountryCodeAvailable.toLowerCase()
	// 	: '';

	const countryCode = 'ua';

	return (
		<div className="flex flex-col gap-10">
			<div className="flex flex-wrap items-center gap-x-8 gap-y-5 md:gap-20">
				<Avatar className="h-24 w-24 shrink-0 md:h-44 md:w-44">
					<AvatarImage
						src={user.profilePicture}
						className="rounded-[50%]"
					/>
					<AvatarFallback>CN</AvatarFallback>
				</Avatar>

				<div className="flex flex-col gap-5">
					<h1>{user.username}</h1>

					<ul className="flex flex-wrap gap-5 md:gap-14">
						<li className="flex flex-col">
							<div>
								{calculateUserAge(user.birthDate || '') ?? (
									<p>Not specified</p>
								)}
							</div>
							<span className="text-xs opacity-85">Age</span>
						</li>

						<li className="flex flex-col">
							<div>{user.gender ?? <p>Not specified</p>}</div>
							<span className="text-xs opacity-85">Gender</span>
						</li>

						<li className="flex flex-col">
							<div className="space-x-2">
								{user.country ? (
									<>
										<span>{user.country}</span>
										<span
											className={`fi fi-${countryCode}`}
										></span>
									</>
								) : (
									<p>Not specified</p>
								)}
							</div>

							<span className="text-xs opacity-85">
								Country of residence
							</span>
						</li>
					</ul>

					<ul className="flex flex-wrap gap-2">
						{['dance', 'it', 'math', 'football'].map((item) => (
							<li key={item}>
								<Badge variant="secondary">{item}</Badge>
							</li>
						))}
					</ul>
				</div>
			</div>

			{user.description && (
				<div className="rounded-xl bg-secondary p-6">
					<h2 className="mb-3">About me</h2>
					<p className="text-sm">{user.description}</p>
				</div>
			)}

			<div>
				<h2 className="mb-3">Languages learning</h2>

				<div className="grid gap-5 md:grid-cols-3">
					<div className="flex flex-col gap-2 rounded-xl bg-secondary p-6">
						<span className="fi fi-us"></span>
						<span className="text-sm">English - B2</span>
					</div>

					<div className="flex flex-col gap-2 rounded-xl bg-secondary p-6">
						<span className="fi fi-pl"></span>
						<span className="text-sm">Polish - B1</span>
					</div>

					<div className="flex flex-col gap-2 rounded-xl bg-secondary p-6">
						<span className="fi fi-fr"></span>
						<span className="text-sm">French - B1</span>
					</div>
				</div>
			</div>

			<div>
				<h2 className="mb-3">Native languages</h2>

				<div className="grid gap-5 md:grid-cols-3">
					<div className="flex flex-col gap-2 rounded-xl bg-secondary p-6">
						<span className="fi fi-ua"></span>
						<span className="text-sm">Ukraine</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Profile;
