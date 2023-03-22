import logo from '../images/logo.svg';

//Секция заголовок =============================================================
function Header(props) {

	function handleClick() {
		props.loggedIn ? props.onLogOut() : props.onTogglePage()
	};

	return (
		<header className="header">
			<img className="header__logo" src={logo} alt="Логотип" />

			<div className="header__group">
				<p className="header__email">{props.loggedIn && props.userEmail}</p>
					<h3 className="header__link" onClick={handleClick}>{(props.loggedIn && '   Выйти') || props.btnText}</h3>
			</div>

		</header>
	);
};

export default Header;