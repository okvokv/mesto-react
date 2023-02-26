import { useState, useEffect } from 'react';
import api from '../utils/api.js';
import avatar from '../images/avatar.png';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';


function App() {
  //объявление данных пользователя в глобальной области
  const [userData, setUserData] = useState(function () { return { name: 'Жак-Ив Кусто', about: 'Исследователь океана', avatar: avatar } });
  //объявление данных массива карточек в глобальной области
  const [cardsData, setCardsData] = useState(function () { return [] });

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

  //включение обновления массива с данными карточек
  useEffect(() => {
    api.getAllCardsData()
      .then(cardsData => setCardsData(cardsData))
      .catch(err => console.log('Внутренняя ошибка: ', err))
  }, []);
  
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
  const [avatarEditPopupOpened, setAvatarEditPopupOpened] = useState(function () { return false });
  //функция обработки нажатия на аватар
  function handleAvatarBtnClick() {
    setAvatarEditPopupOpened(true);
  };

  //объявление состояния попапа с профилем в глобальной области
  const [profileEditPopupOpened, setProfileEditPopupOpened] = useState(function () { return false });
  //функция обработки нажатия на кнопку редактировать профиль
  function handleProfileBtnClick() {
    setProfileEditPopupOpened(true);
  };

  //объявление состояния попапа добавления контента в глобальной области
  const [cardAddPopupOpened, setCardAddPopupOpened] = useState(function () { return false });
  //функция обработки нажатия на кнопку добавления контента
  function handleCardBtnClick() {
    setCardAddPopupOpened(true);
  };

  //объявление состояния попапа удаления в глобальной области
  //const [popupWithConfirmationOpened, setPopupWithConfirmationOpened] = useState(function () { return false });

  //объявление данных нажатой картики в глобальной области
  const [clickedImage, setClickedImage] = useState({});
  //функция обработки нажатия на картинку
  const [imagePopupOpened, setImagePopupOpened] = useState(function () { return false });
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
        userData={userData}
        cardsData={cardsData}
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
        children={
          <>
            {/* == ядро с формой смены аватара ===================================*/}
            <input className="form__field form__field_type_avatarlink" type="url" placeholder="Ссылка на аватар" name="avatarLink" required />
            <span className="form__error-message" id="avatarLink-error"></span>
          </>
        }
      />

      <PopupWithForm
        type={'profile'}
        formTitle="Редактировать профиль"
        btnText="Сохранить"
        opened={profileEditPopupOpened}
        onClose={closeAllPopups}
        children={
          <>
            {/* == ядро с формой редактирования профиля ===========================*/}
            <input class="form__field form__field_type_name" type="text" placeholder="Имя" name="name" autofocus required minlength="2" maxlength="50" />
            <span class="form__error-message" id="name-error"></span>
            <input class="form__field form__field_type_description" type="text" placeholder="О себе" name="description" required minlength="2" maxlength="200" />
            <span class="form__error-message" id="description-error"></span>
          </>
        }
      />

      <PopupWithForm
        type={'card'}
        formTitle="Новое место"
        btnText="Создать"
        opened={cardAddPopupOpened}
        onClose={closeAllPopups}
        children={
          <>
            {/* == ядро с формой добавления контента ===============================*/}
            <input class="form__field form__field_type_cardname" type="text" placeholder="Название" name="cardName" required
              minlength="2" maxlength="30" />
            <span class="form__error-message" id="cardName-error"></span>
            <input class="form__field form__field_type_cardlink" type="url" placeholder="Ссылка на картинку" name="cardLink" required />
            <span class="form__error-message" id="cardLink-error"></span>
          </>
        }
      />

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