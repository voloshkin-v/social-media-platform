import EditProfileForm from '@/features/profile/EditProfileForm';
import useCurrentUser from '@/hooks/useCurrentUser';

const Edit = () => {
	const { user, dataUpdatedAt } = useCurrentUser();

	return (
		<>
			<h1>Edit Profile</h1>
			<EditProfileForm key={`user-form-${dataUpdatedAt}`} user={user} />
		</>
	);
};

export default Edit;
