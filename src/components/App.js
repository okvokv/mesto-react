import { useState } from 'react';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';

function App() {
  //функция закрытия попапов
  function closeAllPopups() {
    setAvatarEditPopupOpened(false);
    setProfileEditPopupOpened(false);
    setCardAddPopupOpened(false);
    //setPopupWithConfirmationOpened(false);
    setImagePopupOpened(false);
    setClickedImage({});
  }

  //объявление состояния попапа с автаром в глобальной области
  const [avatarEditPopupOpened, setAvatarEditPopupOpened] = useState(false);
  //функция обработки нажатия на аватар
  function handleAvatarBtnClick() {
    setAvatarEditPopupOpened(true);
  };

  //объявление состояния попапа с профилем в глобальной области
  const [profileEditPopupOpened, setProfileEditPopupOpened] = useState(false);
  //функция обработки нажатия на кнопку редактировать профиль
  function handleProfileBtnClick() {
    setProfileEditPopupOpened(true);
  };

  //объявление состояния попапа добавления контента в глобальной области
  const [cardAddPopupOpened, setCardAddPopupOpened] = useState(false);
  //функция обработки нажатия на кнопку добавления контента
  function handleCardBtnClick() {
    setCardAddPopupOpened(true);
  };

  //объявление состояния попапа удаления в глобальной области
  //const [popupWithConfirmationOpened, setPopupWithConfirmationOpened] = useState(false);

  //объявление данных нажатой картики в глобальной области
  const [clickedImage, setClickedImage] = useState({});
  //функция обработки нажатия на картинку
  const [imagePopupOpened, setImagePopupOpened] = useState(false);
  function handleImageClick(cardData) {
    setClickedImage(cardData);
    setImagePopupOpened(true);
  }

  return (
    <div className="page">
      {/*Секция заголовок ==================================================== */}
      <Header />

      {/*Секции  */}
      <Main
        onAvatarBtnClick={handleAvatarBtnClick}
        onProfileBtnClick={handleProfileBtnClick}
        onCardBtnClick={handleCardBtnClick}
        onImageClick={handleImageClick}
      />

      {/*Подножие сайта =======================================================*/}
      <Footer />

      {/*Всплывающие окна =====================================================*/}

      <PopupWithForm
        type={'avatar'}
        formTitle="Обновить аватар"
        btnText="Сохранить"
        opened={avatarEditPopupOpened}
        onClose={closeAllPopups}
      >
        {/* == ядро с формой смены аватара ===================================*/}
        <input className="form__field form__field_type_avatarlink" type="url" placeholder="Ссылка на аватар" name="avatarLink" required />
        <span className="form__error-message" id="avatarLink-error"></span>
      </PopupWithForm>

      <PopupWithForm
        type={'profile'}
        formTitle="Редактировать профиль"
        btnText="Сохранить"
        opened={profileEditPopupOpened}
        onClose={closeAllPopups}
      >
        {/* == ядро с формой редактирования профиля ===========================*/}
        <input className="form__field form__field_type_name" type="text" placeholder="Имя" name="name" autoFocus required minLength="2" maxLength="50" />
        <span className="form__error-message" id="name-error"></span>
        <input className="form__field form__field_type_description" type="text" placeholder="О себе" name="description" required minLength="2" maxLength="200" />
        <span className="form__error-message" id="description-error"></span>
      </PopupWithForm>

      <PopupWithForm
        type={'card'}
        formTitle="Новое место"
        btnText="Создать"
        opened={cardAddPopupOpened}
        onClose={closeAllPopups}
      >
        {/* == ядро с формой добавления контента ===============================*/}
        <input className="form__field form__field_type_cardname" type="text" placeholder="Название" name="cardName" required
          minLength="2" maxLength="30" />
        <span className="form__error-message" id="cardName-error"></span>
        <input className="form__field form__field_type_cardlink" type="url" placeholder="Ссылка на картинку" name="cardLink" required />
        <span className="form__error-message" id="cardLink-error"></span>
      </PopupWithForm>

      {/*Всплывающее окно с формой подтверждения удаления */}
      <PopupWithForm
        type={'delConfirm'}
        formTitle="Вы уверены ?"
        btnText="Да"
        //opened={popupWithConfirmationOpened}
        onClose={closeAllPopups}
      />

      {/*Всплывающее окно с картинкой */}
      <ImagePopup
        selectedCard={clickedImage}
        opened={imagePopupOpened}
        onClose={closeAllPopups}
      />

    </div>
  );

};
export default App;