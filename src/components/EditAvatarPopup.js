import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditAvatarPopup(props) {
  const { isOpen, onClose, onUpdateAvatar, isRenderLoading, renderLoading } = props;
  const currentUser = React.useContext(CurrentUserContext);
  const avatarRef = React.useRef(currentUser.avatar);

  /* Очистить форму от предыдущей ссылки */
  React.useEffect(() => {
    avatarRef.current.value = ''
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    renderLoading();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      textsubmit="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isRenderLoading={isRenderLoading}
      renderLoadingButtonText="Обновление..."
      children={
        <fieldset className="form__set">
          <label className="form__field">
            <input
              className="form__input form__input_type_avatar"
              ref={avatarRef}
              type="url"
              name="avatar"
              id="avatar"
              placeholder="Ссылка на аватар"
              required
            />
            <span className="form__input-error avatar-error"></span>
          </label>
        </fieldset>
      }
    />
  );
}

export default EditAvatarPopup;