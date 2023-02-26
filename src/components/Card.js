//гибридный элемент одной карточки массива
function Card(props) {
	function handleClick() {
		props.onImageClick(props.cardData);
	}
 
	return (
		<li className="element">

			<img
				className="element__image"
				src={`${props.cardData.link}`}
				alt={`Фото ${props.cardData.name}`}
				onClick={handleClick}
			/>

			<button className="element__trash-button" type="button"></button>

			<div className="element__caption">
				<h2 className="element__text">{props.cardData.name}</h2>
				<div className="element__group">
					<button className="element__icon-button" type="button"></button>
					<h2 className="element__counter">{props.cardData.likes.length}</h2>
				</div>
			</div>

		</li>
	);

};

export default Card;