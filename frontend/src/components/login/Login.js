import React,{useState} from "react";

const Login = () => {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const submit = (e) => {
    e.preventDefault();
    console.log(email,password)
  }
  return (
    <div className="col-12 col-md-6 mt-3 mt-mb-0">
      <form>
        <div className="form-floating mb-3 field">
          <input
            className="form-control"
            id="data_email"
            value={email}
            placeholder="Email"
            type="text"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="data_email">Email</label>
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
          <label htmlFor="data_password">Пароль</label>
        </div>
        <input className="btn btn-primary" type="button" value="Войти" onClick={submit}/>
      </form>
    </div>
  )
}

export default Login;