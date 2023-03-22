//гибридный элемент - всплывающее окно с общей частью форм ==================
function PopupWithForm(props) {
	return (
		<div className={`popup popup_type_${props.type} ${props.opened && 'popup_opened'}`}>
			<div className="popup__container">

				<button
					className="popup__close-button"
					type="button"
					aria-label="кнопка Закрыть"
					onClick={props.onClose}>
				</button>

				<form className={`form form_type_${props.type}`} name={`${props.type}Form`} onSubmit={props.onSubmit}>
					<h2 className="form__title">{props.formTitle}</h2>

					{/* сюда поступает ядро попапов с формой */}
					{props.children}

					<button
						className="form__submit-button"
						type="submit"
						aria-label="кнопка cохранения">{props.btnText}
					</button>

				</form>
			</div>
		</div>
	);
};

export default PopupWithForm; 