import React from "react";
import PopupWithForm from "./PopupWithForm";

function DeletedCardPopup(props) {
  const { isOpen, onClose, onDeleteCard, isRenderLoading, renderLoading } = props;

  function handleSubmit(e) {
    e.preventDefault();
    renderLoading();
    onDeleteCard();
  }

  return (
    <PopupWithForm
      name="confirm"
      title="Вы уверены?"
      textsubmit="Да"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isRenderLoading={isRenderLoading}
      renderLoadingButtonText="Удаление..."
    />
  );
}

export default DeletedCardPopup;
