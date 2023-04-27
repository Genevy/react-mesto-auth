import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  const { isOpen, onClose, isRenderLoading, renderLoading } = props;
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState(currentUser.name);
  const [description, setDescription] = React.useState(currentUser.about);

  function handleChangeName(e) {
    setName(e.target.value);
  }
  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  /* Загрузить данные пользователя в форму */
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    
    renderLoading();
    /* Передать значения управляемых компонентов во внешний обработчик */
    props.onUpdateUser({
      name,
      about: description,
    });
  } 

  return (
    <PopupWithForm
      name="edit"
      title="Редактировать профиль"
      textsubmit="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isRenderLoading={isRenderLoading}
      renderLoadingButtonText="Сохранение..."
      children={
        <fieldset className="form__set">
          <label className="form__field">
            <input
              className="form__input form__input_type_user-name"
              value={name}
              onChange={handleChangeName}
              type="text"
              name="name"
              id="username"
              placeholder="Укажите своё имя"
              minLength="2"
              maxLength="40"
              required
            />
            <span className="form__input-error username-error"></span>
          </label>
          <label className="form__field">
            <input
              className="form__input form__input_type_vocation"
              value={description}
              onChange={handleChangeDescription}
              type="text"
              name="about"
              id="vocation"
              placeholder="Укажите род деятельности"
              minLength="2"
              maxLength="200"
              required
            />
            <span className="form__input-error vocation-error"></span>
          </label>
        </fieldset>
      }
    />
  );
}

export default EditProfilePopup;