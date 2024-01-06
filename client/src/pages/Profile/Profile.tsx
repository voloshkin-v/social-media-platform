import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { Badge } from '@/components/ui/badge';

const Profile = () => {
	return (
		<div className="flex flex-col gap-10">
			<div className="flex max-w-2xl flex-wrap items-center gap-x-8 gap-y-5 md:gap-20">
				<Avatar className="shrink-0">
					<AvatarImage
						src="https://github.com/shadcn.png"
						className="h-24 w-24 rounded-[50%] md:h-44 md:w-44"
					/>
					<AvatarFallback>CN</AvatarFallback>
				</Avatar>

				<div className="flex flex-col gap-5">
					<h1>Vitalii Voloshyn</h1>

					<ul className="flex flex-wrap gap-5 md:gap-14">
						<li className="flex flex-col">
							<div>21</div>
							<span className="text-xs opacity-85">Age</span>
						</li>

						<li className="flex flex-col">
							<div>Male</div>
							<span className="text-xs opacity-85">Gender</span>
						</li>

						<li className="flex flex-col">
							<div>Ukraine</div>
							<span className="text-xs opacity-85">
								Country of residence
							</span>
						</li>
					</ul>

					<ul className="flex flex-wrap gap-2">
						{['dance', 'it', 'math', 'football'].map((item) => (
							<li key={item}>
								<Badge>{item}</Badge>
							</li>
						))}
					</ul>
				</div>
			</div>

			<div className="rounded-xl bg-secondary p-6">
				<h2 className="mb-3">About me</h2>

				<p className="text-sm">
					Lorem ipsum dolor sit, amet consectetur adipisicing elit.
					Nisi, tenetur animi ipsum sapiente dicta voluptatibus ad
					esse laborum ipsam harum assumenda, accusantium sunt
					corporis saepe consequuntur, maxime eos minus magni!
				</p>
			</div>

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
