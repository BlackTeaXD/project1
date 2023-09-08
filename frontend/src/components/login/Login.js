import React,{useState} from "react";
import './styles.css'

const Login = () => {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const submit = (e) => {
    e.preventDefault();
    console.log(email,password)
  }
  return (
    <div className="col col-md-6 mt-3">
      <form>
        <div className="form-floating mb-3">
          <input
            className="form-control"
            id="data_email"
            value={email}
            placeholder="Email"
            type="text"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-floating mb-3">
          <input
            className="form-control"
            id="data_password"
            value={password}
            placeholder="Пароль"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <input className="btn" type="button" value="Войти" onClick={submit}/>
      </form>
    </div>
  )
}

export default Login;
//<div class="form-control-feedback invalid-feedback">Неправильный емейл или пароль</div>