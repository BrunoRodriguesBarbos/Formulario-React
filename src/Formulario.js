import React, { useState } from "react";
import axios, { formToJSON } from "axios";

function Formulario() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [profissao, setProfissao] = useState("");
  const [aceitaTermos, setAceitaTermos] = useState(false);

  const handleCadastroFormulario = (event) => {
    event.preventDefault();

    try {
      const response = axios.post("http://localhost:3000/usuarios", {
        nome,
        email,
        senha,
        profissao,
        termos: aceitaTermos,
      });

      console.log("Resposta da Api", formToJSON(response.data));
    } catch (error) {
      console.error("error ao fazer solitacao", error);
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <form onSubmit={handleCadastroFormulario}>
        <div>
          <h1>Formulario de Cadastro</h1>
        </div>
        <div>
          <h4>Nome</h4>
          <input
            required
            type="text"
            placeholder="Nome Completo"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
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
        <div style={{ margin: "20px" }}>
          <label>profissao:</label>
          <select
            id="profissao"
            name="profissao"
            value={profissao}
            onChange={(e) => setProfissao(e.target.value)}
          >
            <option value="">Selecionar a Profissao</option>
            <option value="estudante">Estudante</option>
            <option value="engenheiro">Engenheiro</option>
            <option value="professor">professor</option>
            <option value="outros">Outros</option>
          </select>
        </div>
        <div>
          <input
            type="checkbox"
            id="aceitaTermos"
            checked={aceitaTermos}
            onChange={() => setAceitaTermos(!aceitaTermos)}
          />
          <label> Eu aceito os termos e condicoes</label>
        </div>
        <button submit="handleCadastroFormulario">Cadastrar</button>
      </form>
    </div>
  );
}
export default Formulario;
