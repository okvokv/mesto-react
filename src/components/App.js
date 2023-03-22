import { useState, useEffect } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import avatar from '../images/avatar.png';
import auth from '../utils/auth.js';
import api from '../utils/api.js';
import Header from './Header.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './Register.js';
import Login from './Login.js';
import ProtectedRoute from './ProtectedRoute.js';
import Main from './Main.js';
import Footer from './Footer.js';
import AvatarEditPopup from './EditAvatarPopup.js'
import ProfileEditPopup from './EditProfilePopup.js'
import CardAddPopup from './AddPlacePopup.js';
import PopupWithConfirmation from './ConfirmationPopup.js';
import ImagePopup from './ImagePopup.js';
import InfoTooltip from './InfoTooltip.js';

//гибридный элемент всего проекта
function App() {

  //---------------------------------------------------------------------------------
  //объявление данных пользователя в глобальной области
  const [currentUserData, setCurrentUserData] = useState({ name: 'Жак-Ив Кусто', about: 'Исследователь океана', avatar: avatar });

  //аутентификация пользователя при открытии страницы
  // useEffect(() => {
  // handleTokenCheck();
  // }, []);

  //объявление данных массива карточек в глобальной области
  const [cardsData, setCardsData] = useState([]);

  //получение начальных данных с сервера, однократно
  useEffect(() => {
    api.getInitialData()
      .then(data => {
        const [currentUserData, cardsData] = data;
        setCurrentUserData(currentUserData);
        setCardsData(cardsData);
      })
      .catch(err => console.log('Внутренняя ошибка: ', err))
  }, []);

  //----------------------------------------------------------------------------------
  //функция закрытия попапов
  function closeAllPopups() {
    setAvatarEditPopupOpened(false);
    setProfileEditPopupOpened(false);
    setCardAddPopupOpened(false);
    setPopupWithConfirmationOpened(false);
    setImagePopupOpened(false);
    setClickedImage({});
    setInfoTooltipOpened(false);
  };

  //-------------------------------------------------------------------------------
  //задание текста кнопки header'а в глобальной области
  const [headerBtnText, setHeaderBtnText] = useState('Регистрация')
  //задание текста кнопки сохранения в глобальной области
  const [submitBtnText, setSubmitBtnText] = useState('Войти');
  //функция для изменения текста кнопки при загрузке
  function changeSubmitBtnText(text) {
    setSubmitBtnText(text);
  };

  //----------------------------------------------------------------------------
  //объявление состояния индикатора входа в глобальной области
  const [loggedIn, setLoggedIn] = useState(false);                    //----------//

  //функция отправки данных для входа и обработки ответа
  function handleLogIn(email, password) {
    auth.logIn(email, password)
      .then(token => {
        setLoggedIn(true);
        localStorage.setItem('jwt', token);
        //почистить форму
      })
      .catch(err => {
        setLoggedIn(false);
        setSubmitBtnText('Ошибка. Попробуйте снова');
        console.log('Внутренняя ошибка: ', err);
      })
  };

  //объявление состояния попапа информации о регистрации в глобальной области
  const [infoTooltipOpened, setInfoTooltipOpened] = useState(false);
  //объявление состояния регистрации в глобальной области
  const [regSuccess, setRegSuccess] = useState(false);
  //обьявление значения почты пользователя в глобальной области
  const [userEmail, setUserEmail] = useState('***@***.***');

  //функция отправки данных на регистрацию и обработки ответа
  function handleRegistration(email, password) {
    auth.registrate(email, password)
      .then(data => {
        setRegSuccess(true);
        setInfoTooltipOpened(true);
        setUserEmail(data.email);
        //почистить форму
      })
      .catch(err => {
        setRegSuccess(false);
        setInfoTooltipOpened(true);
        console.log('Внутренняя ошибка: ', err);
      })
  };

  //функция отправки жетона для аутентификации
  function handleTokenCheck() {
    const token = localStorage.getItem('jwt');
    auth.checkToken(token)
      .then(data => {
        setUserEmail(data.email);
        setLoggedIn(true);
      })
      .catch(err => {
        setLoggedIn(false);
        console.log('Внутренняя ошибка: ', err);
      })
  };

  //задание переменной навигации
  //const navigate = useNavigate();
  //функция замены страницы
  function handleTogglePage() {
    //как программно узнать на каком линке мы находимся сейчас ? 
    //линк ? {   
    //navigate('/sign-up')
    //setHeaderBtnText('Вход')
    //}
    //:
    //{
    //navigate('/sign-in')
    //setHeaderBtnText('Регистрация')
    //}
  };

  //функция обработки выхода с сайта
  function handleLogOut() {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
  };

  //----------------------------------------------------------------------------------
  //объявление состояния попапа с аватаром в глобальной области
  const [avatarEditPopupOpened, setAvatarEditPopupOpened] = useState(false);
  //функция обработки нажатия на аватар
  function handleAvatarBtnClick() {
    setSubmitBtnText('Сохранить');
    setAvatarEditPopupOpened(true);
  };

  //объявление состояния попапа с профилем в глобальной области
  const [profileEditPopupOpened, setProfileEditPopupOpened] = useState(false);
  //функция обработки нажатия на кнопку редактировать профиль
  function handleProfileBtnClick() {
    setSubmitBtnText('Сохранить');
    setProfileEditPopupOpened(true);
  };

  //объявление состояния попапа добавления контента в глобальной области
  const [cardAddPopupOpened, setCardAddPopupOpened] = useState(false);
  //функция обработки нажатия на кнопку добавления контента
  function handleCardBtnClick() {
    setSubmitBtnText('Создать');
    setCardAddPopupOpened(true);
  };

  //объявление состояния попапа с большой картинкой в глобальной области
  const [imagePopupOpened, setImagePopupOpened] = useState(false);
  //объявление данных нажатой картики в глобальной области
  const [clickedImage, setClickedImage] = useState({});
  //функция обработки нажатия на картинку
  function handleImageClick(cardData) {
    setClickedImage(cardData);
    setImagePopupOpened(true);
  };

  //объявление состояния попапа подтверждения удаления в глобальной области
  const [popupWithConfirmationOpened, setPopupWithConfirmationOpened] = useState(false);
  //функция обработки нажатия на корзину 
  function handleDeleteCardClick(cardId) {
    setClickedImage(cardId);
    setSubmitBtnText('Да');
    setPopupWithConfirmationOpened(true);
  };

  //---------------------------------------------------------------------------------  
  //функция отправки данных для смены аватара
  function handleUpdateAvatar(link) {
    api.setAvatar(link)
      .then(data => {
        setCurrentUserData(data);
        closeAllPopups();
        //почистить форму
      })
      .catch(err => {
        setSubmitBtnText('Ошибка. Попробуйте снова');
        console.log('Внутренняя ошибка: ', err);
      })
  };

  //функция отправки данных для обновления данных пользователя
  function handleUpdateUser(name, description) {
    api.setUserInfo(name, description)
      .then(data => {
        setCurrentUserData(data);
        closeAllPopups();
        //почистить форму
      })
      .catch(err => {
        setSubmitBtnText('Ошибка. Попробуйте снова');
        console.log('Внутренняя ошибка: ', err);
      })
  };

  //функция отправки данных для добавления новой карточки  
  function handleCardAdd(cardName, cardLink) {
    api.addNewCard(cardName, cardLink)
      .then(newCardData => {
        setCardsData([newCardData, ...cardsData]);
        closeAllPopups();
        //почистить форму
      })
      .catch(err => {
        setSubmitBtnText('Ошибка. Попробуйте снова');
        console.log('Внутренняя ошибка: ', err);
      })
  };

  //функция отправки данных для удаления карточки  
  function handleDeleteCard(cardId) {
    //запрос в api и удаление из массива всех карточек с cardId 
    api.deleteCard(cardId)
      .then(() => {
        setCardsData(cardsData.filter(cardData => cardData._id !== cardId));
        closeAllPopups();
      })
      .catch(err => {
        setSubmitBtnText('Ошибка. Попробуйте снова');
        console.log('Внутренняя ошибка: ', err);
      })
  };

  //-----------------------------------------------------------------------
  //функция обработки нажатия на кнопку <Like>
  function handleLikeClick(cardId, liked) {
    //запрос в api, получение обновлённых данных карточки и замена на них в массиве
    (liked ? api.deleteLike(cardId) : api.setLike(cardId))
      .then(newCardData => setCardsData(cardsData.map(cardData => (cardData._id === cardId) ? newCardData : cardData)))
      .catch(err => console.log('Внутренняя ошибка: ', err))
  };

  //-----------------------------------------------------------------------
  return (
    <CurrentUserContext.Provider value={currentUserData}>
      <div className="page">

        {/*Секция заголовок ======================================= */}
        <Header
          loggedIn={loggedIn}
          userEmail={userEmail}
          btnText={headerBtnText}
          onTogglePage={handleTogglePage}
          onLogOut={handleLogOut}
        />
        <Routes>
          <Route path="/" element={
            <ProtectedRoute
              //Основная секция ======================================//
              element={Main}
              cardsData={cardsData}
              onAvatarBtnClick={handleAvatarBtnClick}
              onProfileBtnClick={handleProfileBtnClick}
              onCardBtnClick={handleCardBtnClick}
              onImageClick={handleImageClick}
              onCardDelete={handleDeleteCardClick}
              onLikeClick={handleLikeClick}
              loggedIn={loggedIn}
            />}
          />
          <Route path='/sign-up' element={
            <Register
              btnText='Зарегистрироваться'
              onRegistration={handleRegistration}
            />}
          />
          <Route path='/sign-in' element={
            <Login
              btnText={submitBtnText}
              changeBtnText={changeSubmitBtnText}
              userEmail={userEmail}
              onLogIn={handleLogIn}
            />}
          />
        </Routes>

        {/*Подножие сайта =========================================*/}
        <Footer />

        {/*Всплывающие окна c формой смены аватара ================*/}
        <AvatarEditPopup
          btnText={submitBtnText}
          changeBtnText={changeSubmitBtnText}
          opened={avatarEditPopupOpened}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        {/*Всплывающие окна c формой редактирования профиля ========*/}
        <ProfileEditPopup
          btnText={submitBtnText}
          changeBtnText={changeSubmitBtnText}
          opened={profileEditPopupOpened}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        {/*Всплывающие окна c формой добавления контента ===========*/}
        <CardAddPopup
          btnText={submitBtnText}
          changeBtnText={changeSubmitBtnText}
          opened={cardAddPopupOpened}
          onClose={closeAllPopups}
          onCardAdd={handleCardAdd}
        />

        {/*Всплывающее окно с формой подтверждения удаления ========*/}
        <PopupWithConfirmation
          btnText={submitBtnText}
          changeBtnText={changeSubmitBtnText}
          clickedImage={clickedImage}
          opened={popupWithConfirmationOpened}
          onClose={closeAllPopups}
          onCardDelete={handleDeleteCard}
        />

        {/*Всплывающее окно с картинкой ============================= */}
        <ImagePopup
          selectedCard={clickedImage}
          opened={imagePopupOpened}
          onClose={closeAllPopups}
        />

        {/*всплывающее окно с сообщением о регистрации =============== */}
        <InfoTooltip
          success={regSuccess}
          opened={infoTooltipOpened}
          onClose={closeAllPopups}
        />

      </div>
    </CurrentUserContext.Provider>
  );
};

export default App;
