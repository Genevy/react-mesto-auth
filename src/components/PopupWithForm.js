import React from "react";

function PopupWithForm(props) {
  const { name, title, children, textsubmit, isOpen, onClose, onSubmit, isRenderLoading, renderLoadingButtonText } = props;

  return (
    <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button className="popup__close" aria-label="Закрыть" onClick={onClose}></button>
        <h3 className="popup__title">{title}</h3>
        <form className="form" onSubmit={onSubmit}>
          {children}
          <button className="form__save-button" type="submit">{isRenderLoading ? renderLoadingButtonText : textsubmit}</button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
