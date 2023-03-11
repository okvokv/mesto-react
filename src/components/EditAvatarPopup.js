import React from 'react';
import PopupWithForm from './PopupWithForm.js';

//гибридный элемент - всплывающее окно смены аватара
function AvatarEditPopup(props) {

	//задание рефа
	const avatarLink = React.useRef('');

	//промежуточная функция отправки ссылки
	function handleSubmit(event) {
		event.preventDefault();
		props.onUpdateAvatar(avatarLink.current.value);
	}

	return (
		<PopupWithForm
			type='avatar'
			formTitle='Обновить аватар'
			btnText='Сохранить'
			opened={props.opened}
			onClose={props.onClose}
			onSubmit={handleSubmit}
		>
			{/* == ядро с формой смены аватара ===================================*/}
			<input
				className="form__field form__field_type_avatarlink"
				type="url"
				placeholder="Ссылка на аватар"
				name="avatarLink"
				required
				ref={avatarLink} />
			<span className="form__error-message" id="avatarLink-error"></span>
		</PopupWithForm>
	);
};
export default AvatarEditPopup;