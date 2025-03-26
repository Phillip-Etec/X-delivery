import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import client from "src/client.axios";

export default function Create() {

  const [User, setUser] = useState({
    name: "",
    email: "",
    password: "",
    ssn: "",
    birthday: "",
    isAdmin: null,
    isActive: null,
  });

  const navigate = useNavigate();

  const AddUser = (e) => {

    e.preventDefault();

    console.log(User)
    client
      .post('/users', User)

      .then((res) => {
        console.log(res);
        navigate('/users');
      })

      .catch((err) => console.log(err));
  };

  return (

    <div className="d-flex w-100 justify-content-center align-items-center bg-light">
      <div className="w-50 border bg white shadow px-5 pt-3 pb-5 rounded">

        <h1>Adicione um Usuário </h1>

        <form onSubmit={AddUser}>

          <div className="mb-2">
            <label htmlFor="name">Nome:</label>
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="nome"
              onChange={(e) =>
                setUser({ ...User, name: e.target.value }
                )}
            />
          </div>

          <div className="mb-2">
            <label htmlFor="email">e-mail:</label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="e-mail"
              onChange={(e) =>
                setUser({ ...User, email: e.target.value }
                )}
            />
          </div>

          <div>
            <div className="mb-2">
              <label htmlFor="senha">Senha:</label>
              <input
                type="text"
                name="senha"
                className="form-control"
                placeholder="senha"
                onChange={(e) =>
                  setUser({ ...User, password: e.target.value })
                }
              />
            </div>
          </div>

          <div>
            <div className="mb-2">
              <label htmlFor="cpf">CPF:</label>
              <input
                type="text"
                name="cpf"
                className="form-control"
                placeholder="12345678900"
                onChange={(e) =>
                  setUser({ ...User, ssn: e.target.value })
                }
              />
            </div>
          </div>

          <div>
            <div className="mb-2">
              <label htmlFor="dt">data de nascimento:</label>
              <input
                type="text"
                name="dt"
                className="form-control"
                placeholder="dd/mm/YYYY"
                onChange={(e) =>
                  setUser({ ...User, birthday: e.target.value })
                }
              />
            </div>
          </div>

          <div>
            <div className="mb-2">
              <label htmlFor="admin">Admin:</label>
              <input
                type="checkbox"
                name="admin"
                onChange={(e) =>
                  setUser({ ...User, isAdmin: e.target.value })
                }
              />
            </div>
          </div>

          <div>
            <div className="mb-2">
              <label htmlFor="ativo">Ativo:</label>
              <input
                type="checkbox"
                name="ativo"
                onChange={(e) =>
                  setUser({ ...User, isActive: e.target.value })
                }
              />
            </div>
          </div>

          <button className="btn btn-success">Adicionar</button>

          <Link to="/users" className="btn btn-primary ms-3">
            Voltar
          </Link>

        </form>

      </div>
    </div>

  );
}
