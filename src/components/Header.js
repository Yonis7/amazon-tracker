import logo  from '../images/logo.png';
const Header = () => {
	const today = new Date().toString().slice(0, 10);

	return (
		<header>
			<div className="text-container">
				<h1> Deal Finder </h1>
				<p> Deals for {today}</p>
			</div>
            <div className="logo-container">
                <img src={logo} alt="logo" />
            </div>
		</header>
	);
};

export default Header;
