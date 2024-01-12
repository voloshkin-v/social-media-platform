import { Skeleton } from '@/components/ui/skeleton';

interface UserProfileSkeletonProps {
	isActivated: boolean;
}

const UserProfileSkeleton = ({ isActivated }: UserProfileSkeletonProps) => {
	return (
		<div className="flex flex-col gap-10">
			<div className="flex flex-wrap items-center gap-x-8 gap-y-5 md:flex-nowrap md:gap-20">
				<Skeleton className="h-24 w-24 shrink-0 rounded-[50%] md:h-44 md:w-44" />
				<Skeleton className="h-32 w-full" />
				{/* <div className="flex flex-col gap-5">
					<Skeleton className="h-8 w-full" />

					<ul className="flex flex-wrap gap-5 md:gap-10">
						<li className="flex flex-col gap-1">
							<Skeleton className="h-5 w-6" />
							<Skeleton className="h-4 w-6" />
						</li>

						<li className="flex flex-col gap-1">
							<Skeleton className="h-5 w-10" />
							<Skeleton className="h-4 w-11" />
						</li>

						<li className="flex flex-col gap-1">
							<Skeleton className="h-5 w-40" />
							<Skeleton className="h-4 w-[125px]" />
						</li>

						<li className="flex flex-col gap-1">
							<Skeleton className="h-5 w-20" />
							<Skeleton className="h-4 w-24" />
						</li>
					</ul>

					<div className="flex gap-2">
						{Array.from({ length: 7 }, (i, index) => (
							<Skeleton key={index} className="h-[22px] w-14" />
						))}
					</div>
				</div> */}
			</div>

			{isActivated && <Skeleton className="h-10 w-[137px]" />}

			<Skeleton className="h-[108px] rounded-xl" />
			<Skeleton className="h-[108px] rounded-xl" />
		</div>
	);
};

export default UserProfileSkeleton;
