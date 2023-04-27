import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const { isOpen, onClose, onAddPlace, isRenderLoading, renderLoading } = props;

  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  function handlleNameChange(e) {
    setName(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    
    renderLoading();
    onAddPlace({
      name,
      link,
    });
  }

  React.useEffect(() => {
    setName('');
    setLink('');
  }, [isOpen])

  return (
    <PopupWithForm
      name="new-card"
      title="Новое место"
      textsubmit="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isRenderLoading={isRenderLoading}
      renderLoadingButtonText="Добавление..."
      children={
        <fieldset className="form__set">
          <label className="form__field">
            <input
              className="form__input form__input_type_image-name"
              onChange={handlleNameChange}
              value={name}
              type="text"
              name="name"
              id="imagename"
              placeholder="Название"
              minLength="2"
              maxLength="30"
              required
            />
            <span className="form__input-error imagename-error"></span>
          </label>
          <label className="form__field">
            <input
              className="form__input form__input_type_image-link"
              onChange={handleLinkChange}
              value={link}
              type="url"
              name="link"
              id="imagelink"
              placeholder="Ссылка на картинку"
              required
            />
            <span className="form__input-error imagelink-error"></span>
          </label>
        </fieldset>
      }
    />
  );
}

export default AddPlacePopup;