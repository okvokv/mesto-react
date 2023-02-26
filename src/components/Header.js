import logo from '../images/logo.svg';
//Секция заголовок =============================================================
function Header() {
	return (
		<header className="header">
			<img className="header__logo" src={logo} alt="Логотип" />
		</header>
	);
};

export default Header;