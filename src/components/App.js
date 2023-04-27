import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import Register from './Register';
import Login from './Login';
import InfoTooltip from './InfoTooltip';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import DeletedCardPopup from './DeleteCardPopup';
import { CurrentUserContext, defaultCurrentUser } from '../contexts/CurrentUserContext';
import api from '../utils/Api';
import * as apiAuth from '../utils/apiAuth';
import ProtectedRoute from './ProtectedRoute';

function App() {
  /* Переменные состояния попапов */
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isCardPopupOpen, setIsCardPopupOpen] = useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = useState(false);
  
  const [isRenderLoading, setIsRenderLoading] = useState(false);
  
  /* Переменная состояния для попапа открытия карточки */
  const [selectedCard, setSelectedCard] = useState({});
  
  /* Переменная состояния для попапа страницы регистрации */
  const [isInfoTooltipPopup, setIsInfoTooltipPopup] = useState(false);

  /* Переменная состояния пользователя */
  const [currentUser, setCurrentUser] = useState(defaultCurrentUser);

  /* Переменная состояния карточек */
  const [cards, setCards] = useState([]);

  /* Переменные состояния зарегистрированного пользователя */
  const [loggedIn, setLoggedIn] = useState(false);
  const [isSignIn, setIsSignIn] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    if(loggedIn) {
      Promise.all([api.getUserInfo(), api.getAllCards()])
        .then(([data, cards]) => {
          setCurrentUser({ ...currentUser, ...data });
          setCards(cards);
        })
        .catch((err) => {
          console.log(err);
          openInfoTooltipPopup(false);
        })
    }
  }, [loggedIn])

  /* Рендер загрузки */
  function renderLoading() {
    setIsRenderLoading((isRenderLoading) => !isRenderLoading);
  };

  /* Открытие попапов */
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function handleCardClick(card) {
    setSelectedCard(card);
    setIsCardPopupOpen(true);
  }
  function handleDeleteCardClick(card) {
    setSelectedCard(card);
    setIsDeleteCardPopupOpen(true);
  };

  function openInfoTooltipPopup(isSignIn) {
    setIsInfoTooltipPopup(true);
    setIsSignIn(isSignIn);
  };

  function closePopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsCardPopupOpen(false);
    setIsDeleteCardPopupOpen(false);
    setIsInfoTooltipPopup(false);
    setSelectedCard({});
  }

  function handleCardLike(card) {
    /* Снова проверить, есть ли уже лайк на этой карточке */
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    
    /* Отправить запрос в API и получить обновлённые данные карточки */
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => { 
        console.log(err);
        openInfoTooltipPopup(false);
      })
  } 

  function handleCardDelete() {
    api.deleteCard(selectedCard._id)
      .then(() => {
        setCards((cards) => cards.filter((item) => item._id !== selectedCard._id))
      })
      .then(() => closePopups())
      .catch((err) => { 
        console.log(err);
        openInfoTooltipPopup(false);
      })
      .finally(() => renderLoading())
  }

  function handleAddCard(card) {
    api.addNewCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closePopups();
      })
      .catch((err) => { 
        console.log(err);
        openInfoTooltipPopup(false);
      })
      .finally(() => renderLoading())
  }

  /* Изменить данные пользователя */
  function handleUpdateUser(userData) {
    api.updateUserInfo(userData)
      .then((userDataServer) => {
        setCurrentUser({ ...currentUser, ...userDataServer })
        closePopups()
      })
      .catch((err) => { 
        console.log(err);
        openInfoTooltipPopup(false);
      })
      .finally(() => renderLoading())
  };

  /* Изменить аватар пользователя */
  function handleUpdateAvatar(userAvatar) {
    api.updateUserAvatar(userAvatar)
      .then((userAvatarServer) => {
        setCurrentUser({ ...currentUser, ...userAvatarServer })
        closePopups()
      })
      .catch((err) => { 
        console.log(err);
        openInfoTooltipPopup(false);
      })
      .finally(() => renderLoading())
  };

  /* Получить токен */
  function checkToken() {
    const token = localStorage.getItem('jwt');
    if (token) {
      apiAuth.checkToken(token)
        .then((res) => {
          if (res && res.data) {
            setLoggedIn(true);
            setCurrentUser({ ...currentUser, email: res.data.email });
            navigate('/');
          }
        })
        .catch((err) => {
          console.log(err);
          openInfoTooltipPopup(false);
        })
    }
  };
  useEffect(() => {
    checkToken();
  }, []);

  /* Зарегистрировать пользователя */
  function handleRegister(regData) {
    apiAuth.register(regData)
      .then((res) => {
        if (res && res.data) {
          openInfoTooltipPopup(true);
          navigate('/sign-in');
        }
      })
      .catch((err) => {
        console.log(err);
        openInfoTooltipPopup(false);
      })
  };

  /* Войти в профиль */
  function handleLogin(loginData) {
    apiAuth.login(loginData)
      .then((res) => {
        if (res && res.token) {
          setCurrentUser({ ...currentUser, email: loginData.email })
          localStorage.setItem('jwt', res.token);
          setLoggedIn(true); 
          navigate('/');
        }
      })
      .catch((err) => {
        console.log(err);
        openInfoTooltipPopup(false);
      })
  };

  /* Выйти из профиля */
  function logOut() {
    setLoggedIn(false);
    setCurrentUser(defaultCurrentUser);
    localStorage.removeItem('jwt')
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <div className='page__container'>
          <Header
            loggedIn={loggedIn}
            email={currentUser.email}
            logOut={logOut}
          />

          <Routes>
            <Route path='/sign-up' element={<Register onRegister={handleRegister} />} />
            <Route path='/sign-in' element={<Login onLogin={handleLogin} />} />
            <Route path='/' 
              element={<ProtectedRoute
                loggedIn={loggedIn}
                element={Main}
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleDeleteCardClick}
                cards={cards} 
              />} 
            />
          </Routes>

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closePopups}
            onUpdateUser={handleUpdateUser}
            isRenderLoading={isRenderLoading}
            renderLoading={renderLoading}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closePopups}
            onAddPlace={handleAddCard}
            isRenderLoading={isRenderLoading}
            renderLoading={renderLoading}
          />

          <ImagePopup
            card={selectedCard}
            isOpen={isCardPopupOpen}
            onClose={closePopups}
          />

          <DeletedCardPopup
            isOpen={isDeleteCardPopupOpen}
            onClose={closePopups}
            onDeleteCard={handleCardDelete}
            isRenderLoading={isRenderLoading}
            renderLoading={renderLoading}
          />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closePopups}
            onUpdateAvatar={handleUpdateAvatar}
            isRenderLoading={isRenderLoading}
            renderLoading={renderLoading}
          />

          <InfoTooltip 
            name="tooltip"
            isOpen={isInfoTooltipPopup}
            onClose={closePopups}
            isSignIn={isSignIn}
          />

          <Footer loggedIn={loggedIn} />

        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;