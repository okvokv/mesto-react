import { useState, useEffect } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import avatar from '../images/avatar.png';
import api from '../utils/api.js';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import AvatarEditPopup from './EditAvatarPopup.js'
import ProfileEditPopup from './EditProfilePopup.js'
import CardAddPopup from './AddPlacePopup.js';
import PopupWithConfirmation from './ConfirmationPopup.js';
import ImagePopup from './ImagePopup.js';

//гибридный элемент всего проекта
function App() {

  //объявление данных пользователя в глобальной области
  const [currentUserData, setCurrentUserData] = useState({ name: 'Жак-Ив Кусто', about: 'Исследователь океана', avatar: avatar });

  //объявление данных массива карточек в глобальной области
  const [cardsData, setCardsData] = useState([]);

  //получение начальных данных с сервера, однократно
  api.getInitialData()
    .then(data => {
      const [currentUserData, cardsData] = data;
      setCurrentUserData(currentUserData);
      setCardsData(cardsData);
    })
    .catch(err => console.log('Внутренняя ошибка: ', err))

  //задание обновления локального массива карточек
  useEffect(() => {
    setCardsData(cardsData);
  }, [cardsData]);

  //----------------------------------------------------------------------------------
  //функция закрытия попапов
  function closeAllPopups() {
    setAvatarEditPopupOpened(false);
    setProfileEditPopupOpened(false);
    setCardAddPopupOpened(false);
    setPopupWithConfirmationOpened(false);
    setImagePopupOpened(false);
    setClickedImage({});
  };

  //----------------------------------------------------------------------------------
  //объявление состояния попапа с аватаром в глобальной области
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

  //---------------------------------------------------------------------------------
  //объявление состояния попапа с большой картинкой в глобальной области
  const [imagePopupOpened, setImagePopupOpened] = useState(false);
  //объявление данных нажатой картики в глобальной области
  const [clickedImage, setClickedImage] = useState({});
  //функция обработки нажатия на картинку
  function handleImageClick(cardData) {
    setClickedImage(cardData);
    setImagePopupOpened(true);
  };

  //---------------------------------------------------------------------------------  
  //объявление состояния попапа подтверждения удаления в глобальной области
  const [popupWithConfirmationOpened, setPopupWithConfirmationOpened] = useState(false);
  //функция обработки нажатия на корзину 
  function handleDeleteCardClick(cardId) {
    setClickedImage(cardId);
    setPopupWithConfirmationOpened(true);
  };

  //функция отправки данных для удаления карточки  
  function handleDeleteCard(cardId) {
    //запрос в api и удаление из массива всех карточек с cardId 
    api.deleteCard(cardId)
      .then(() => {
        setCardsData(cardsData.filter(cardData => cardData._id !== cardId));
        closeAllPopups();
      })
      .catch(err => console.log('Внутренняя ошибка: ', err))
  };

  //---------------------------------------------------------------------------------
  //функция обработки нажатия на кнопку <Like>
  function handleLikeClick(cardData, liked) {
    //запрос в api, получение обновлённых данных карточки и замена на них в массиве
    liked ?
      api.deleteLike(cardData._id)
        .then(newCardData => cardData.likes.length = newCardData.likes.length)
        .catch(err => console.log('Внутренняя ошибка: ', err))
      :
      api.setLike(cardData._id)
        .then(newCardData => cardData.likes.length = newCardData.likes.length)
        .catch(err => console.log('Внутренняя ошибка: ', err))
  };

  //функция отправки данных для смены аватара
  function handleUpdateAvatar(link) {
    api.setAvatar(link)
      .then(data => {
        setCurrentUserData(data);
        closeAllPopups();
        //почистить форму
        //form.reset()
      })
      .catch(err => console.log('Внутренняя ошибка: ', err))
  };

  //функция отправки данных для обновления данных пользователя
  function handleUpdateUser(name, description) {
    api.setUserInfo(name, description)
      .then(data => {
        setCurrentUserData(data);
        closeAllPopups();
      })
      .catch(err => console.log('Внутренняя ошибка: ', err))
  };

  //функция отправки данных для добавления новой карточки  
  function handleCardAdd(cardName, cardLink) {
    api.addNewCard(cardName, cardLink)
      .then(newCardData => {
        setCardsData([newCardData, ...cardsData]);
        closeAllPopups();
      })
      .catch(err => console.log('Внутренняя ошибка: ', err))
  };

  //--------------------------------------------------------------------------
  return (
    <CurrentUserContext.Provider value={currentUserData}>
      <div className="page">
        {/*Секция заголовок =========================================== */}
        <Header />

        {/*Основная секция ============================================ */}
        <Main
          cardsData={cardsData}
          onAvatarBtnClick={handleAvatarBtnClick}
          onProfileBtnClick={handleProfileBtnClick}
          onCardBtnClick={handleCardBtnClick}
          onImageClick={handleImageClick}
          onCardDelete={handleDeleteCardClick}
          onLikeClick={handleLikeClick}
        />

        {/*Подножие сайта ===============================================*/}
        <Footer />

        {/*Всплывающие окна c формой смены аватара ======================*/}
        <AvatarEditPopup
          opened={avatarEditPopupOpened}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        {/*Всплывающие окна c формой редактирования профиля ==============*/}
        <ProfileEditPopup
          opened={profileEditPopupOpened}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        {/*Всплывающие окна c формой добавления контента =================*/}
        <CardAddPopup
          opened={cardAddPopupOpened}
          onClose={closeAllPopups}
          onCardAdd={handleCardAdd}
        />

        {/*Всплывающее окно с формой подтверждения удаления ==============*/}
        <PopupWithConfirmation
          clickedImage={clickedImage}
          opened={popupWithConfirmationOpened}
          onClose={closeAllPopups}
          onCardDelete={handleDeleteCard}
        />

        {/*Всплывающее окно с картинкой ================================= */}
        <ImagePopup
          selectedCard={clickedImage}
          opened={imagePopupOpened}
          onClose={closeAllPopups}
        />

      </div>
    </CurrentUserContext.Provider>
  );
};

export default App;
