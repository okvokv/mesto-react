import Card from './Card.js';
//гибридный элемент 
function Main(props) {
	return (
		<main className="main">
			{/*== Секция профиль ===============================================*/}
			<section className="profile">
				<button className="profile__avatar-button" type="button" onClick={props.onAvatarBtnClick}><img className="profile__avatar" src={props.userData.avatar} alt="Аватар" /></button>
				<div className="profile__info">
					<div className="profile__title-group">
						<h1 className="profile__title">{props.userData.name}</h1>
						<button className="profile__edit-button" type="button" aria-label="кнопка Редактировать профиль" onClick={props.onProfileBtnClick}></button>
					</div>
					<p className="profile__subtitle">{props.userData.about}</p>
					<p className="profile__id" hidden>{props.userData._id}</p>
				</div>

				<button className="profile__add-button" type="button" aria-label="кнопка добавления контента" onClick={props.onCardBtnClick}></button>
			</section>
			{/*== Секция элементы ===============================================*/}
			<section className="elements">
				<ul className="elements__grid">
					{props.cardsData.map((cardData, index) =>
						<Card
							key={index}
							cardData={cardData}
							onImageClick={props.onImageClick}
							/>
							)}
				</ul>
			</section >

		</main >
	);

};

export default Main;