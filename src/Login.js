import React, { useState } from "react";

const Login = () => {
    const [ email, setEmail] = useState('')
    const [ senha, setSenha] = useState('')

    const handleLoginSubmit = (event) => {
        event.preventDefault()
        console.log("Enivou", {email: email, senha: senha,})
        //Logica para autenticar.
             
    }
  return (
    <div>
      <form onSubmit={handleLoginSubmit} >
        <div>
          <h1>login</h1>
        </div>
        <div>
         
          <h4>Email</h4>
          <input
            required
            type="email"
            placeholder="insira seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <h4>Senha</h4>
          <input
            required
            type="password"
            placeholder="Insira sua senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
        </div>
        <button type="submit" > Entra</button>
      </form>
    </div>
  );
};

export default Login;
