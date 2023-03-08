import { useState } from 'react';
import PopupWithForm from './PopupWithForm.js';

//гибридный элемент - всплывающее окно добавления контента
function CardAddPopup(props) {

	//объявление данных карточки в глобальной области
	const [cardName, setCardName] = useState('');
	const [cardLink, setCardLink] = useState('');

	//функция задания названия
	function handleSetName(event) {
		setCardName(event.target.value)
	}

	//функция задания ссылки
	function handleSetLink(event) {
		setCardLink(event.target.value)
	}

	//промежуточная функция отправки данных карточки
	function handleSubmit(event) {
		event.preventDefault();
		props.onCardAdd(cardName, cardLink);
	};

	return (
		<PopupWithForm
			type={'card'}
			formTitle="Новое место"
			btnText="Создать"
			opened={props.opened}
			onClose={props.onClose}
			onSubmit={handleSubmit}
		>
			{/* == ядро с формой добавления контента ===============================*/}
			<input className="form__field form__field_type_cardname" type="text" placeholder="Название" name="cardName" required
				minLength="2" maxLength="30" value={cardName} onChange={handleSetName}/>
			<span className="form__error-message" id="cardName-error"></span>
			<input className="form__field form__field_type_cardlink" type="url" placeholder="Ссылка на картинку" name="cardLink" required value={cardLink} onChange={handleSetLink} />
			<span className="form__error-message" id="cardLink-error"></span>
		</PopupWithForm>
	);
};

export default CardAddPopup;