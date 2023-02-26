import { useState, useEffect } from 'react';
import avatar from '../images/avatar.png';
import api from '../utils/api.js';
import Card from './Card.js';

//гибридный элемент 
function Main(props) {

	//объявление данных пользователя в глобальной области
	const [userData, setUserData] = useState({ name: 'Жак-Ив Кусто', about: 'Исследователь океана', avatar: avatar });
	//объявление данных массива карточек в глобальной области
	const [cardsData, setCardsData] = useState([]);

	//получение начальных данных с сервера однократно
	useEffect(() => {
		api.getInitialData()
			.then(data => {
				const [userData, cardsData] = data;
				setUserData(userData);
				setCardsData(cardsData);
			})
			.catch(err => console.log('Внутренняя ошибка: ', err))
	}, []);

	return (
		<main className="main">
			{/*== Секция профиль ===============================================*/}
			<section className="profile">
				<button className="profile__avatar-button" type="button" onClick={props.onAvatarBtnClick}><img className="profile__avatar" src={userData.avatar} alt="Аватар" /></button>
				<div className="profile__info">
					<div className="profile__title-group">
						<h1 className="profile__title">{userData.name}</h1>
						<button className="profile__edit-button" type="button" aria-label="кнопка Редактировать профиль" onClick={props.onProfileBtnClick}></button>
					</div>
					<p className="profile__subtitle">{userData.about}</p>
					<p className="profile__id" hidden>{userData._id}</p>
				</div>

				<button className="profile__add-button" type="button" aria-label="кнопка добавления контента" onClick={props.onCardBtnClick}></button>
			</section>
			{/*== Секция элементы ===============================================*/}
			<section className="elements">
				<ul className="elements__grid">
					{cardsData.map(({_id, ...cardData }) => (
						<Card
							key={_id}
							cardData={cardData}
							onImageClick={props.onImageClick}
						/>)
					)}
				</ul>
			</section >

		</main >
	);

};

export default Main;