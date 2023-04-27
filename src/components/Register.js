import React, { useState} from "react";
import { Link } from "react-router-dom";

function Register(props) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }
  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onRegister({ email, password });
  }

  return (
    <div className="auth">
      <h2 className="auth__title">Регистрация</h2>
      <form className="auth__form" onSubmit={handleSubmit}>
        <fieldset className="auth__fieldset">
          <input
            type="email"
            name="email"
            value={email}
            className="auth__input"
            placeholder="Email"
            required=""
            onChange={handleChangeEmail}
          />
          <input
            type="password"
            name="password"
            value={password}
            className="auth__input"
            placeholder="Пароль"
            minLength={8}
            maxLength={50}
            required=""
            onChange={handleChangePassword}
          />
        </fieldset>
        <button className="auth__submit">Зарегистрироваться</button>
      </form>
      <Link to="/sign-in" className="auth__link">
        Уже зарегистрированы? Войти
      </Link>
    </div>
  );
}

export default Register;
