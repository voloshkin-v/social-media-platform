import Logo from './Logo';
import Menu from './Menu';

const Header = () => {
	return (
		<header className="py-5">
			<div className="container flex items-center justify-between lg:px-10">
				<Logo />
				<Menu />
			</div>
		</header>
	);
};

export default Header;
