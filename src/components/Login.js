import React, { useState } from "react";

function Login(props) {

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
    props.onLogin({ email, password });
  }

  return (
    <div className="auth">
      <h2 className="auth__title">Вход</h2>
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
        <button className="auth__submit">Войти</button>
      </form>
    </div>
  );
}

export default Login;
