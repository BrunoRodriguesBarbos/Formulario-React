import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTrash, FaEdit } from "react-icons/fa";

const Principal = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [editando, setEditando] = useState(null);
  const [dadosEditados, setDadosEditados] = useState({
    nome: "",
    email: "",
    profissao: "",
  });

  const carregarUsuarios = async () => {
    try {
      const response = await axios.get("http://localhost:3000/usuarios");
      setUsuarios(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/usuarios/${id}`);
      carregarUsuarios();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (id) => {
    setEditando(id);
    const usuarioEditando = usuarios.find((usuario) => usuario.id === id);
    setDadosEditados({
      nome: usuarioEditando.nome,
      email: usuarioEditando.email,
      profissao: usuarioEditando.profissao,
    });
  };

  const handleSaveEdit = async (id) => {
    try {
      if (
        setDadosEditados.nome.trim() === "" ||
        setDadosEditados.email.trim() === "" ||
        !isValidEmail(dadosEditados.email) ||
        dadosEditados.profissao.trim() === ""
      ) {
        alert("Por favor, preencha os campos corretamente");
        return;
      }

      await axios.put(`http://localhost:3000/usuarios/${id}`);
      setEditando(null);
      carregarUsuarios();
    } catch (error) {
      console.error(error);
    }
  };

  const isValidEmail = (email) => {
    //Expressoes Regulares
    return email.includes("@");
  };

  useEffect(() => {
    carregarUsuarios();
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <h1>mostrar Usuario</h1>
      <ul>
        {usuarios.map((usuario) => (
          <li
            key={usuario.id}
            style={{
              border: "lpx solid #ccc",
              borderRadius: "8px",
              margin: "10px",
              padding: "10px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {" "}
            {editando === usuario.id ? (
              <>
                <input
                  type="text"
                  value={dadosEditados.nome}
                  onChange={(e) =>
                    setDadosEditados({ ...dadosEditados, nome: e.target.value })
                  }
                />
                <input
                  type="email"
                  value={dadosEditados.email}
                  onChange={(e) =>
                    setDadosEditados({
                      ...dadosEditados,
                      email: e.target.value,
                    })
                  }
                />
                <select
                  id="profissao"
                  nome="profissao"
                  value={dadosEditados.profissao}
                  onChange={(e) =>
                    setDadosEditados({
                      ...dadosEditados,
                      profissao: e.target.value,
                    })
                  }
                  required
                >
                  <option value="">selecione a opcao</option>
                  <option value="estudante">estudante </option>
                  <option value="engenheiro">engenheiro</option>
                  <option value="professor">professorC</option>
                  <option value="">Outro </option>
                </select>
                <button onClick={() => handleSaveEdit(usuario.id)}></button>
              </>
            ) : (
              <>
                <div>
                  <strong>Nome:</strong>
                  {usuario.nome} {"   "}
                  <strong>Email:</strong>
                  {usuario.email} {"   "}
                  <strong>Profissao: </strong>
                  {usuario.profissao} {"   "}
                </div>
                <div>
                  <button onClick={() => handleDelete(usuario.id)}>
                    {" "}
                    /<FaTrash />{" "}
                  </button>
                  <button onClick={() => handleEdit(usuario.id)}>
                    <FaEdit />
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Principal;
