import Logo from './Logo';
import Menu from './Menu';

const Header = () => {
	return (
		<header className="border-b py-5">
			<div className="container flex items-center justify-between">
				<Logo />
				<Menu />
			</div>
		</header>
	);
};

export default Header;
