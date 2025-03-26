import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import client from "src/client.axios";

export default function Update() {

  const [User, setUser] = useState({
    name: "",
    email: "",
    password: "",
    ssn: "",
    birthday: "",
    isAdmin: false,
    isActive: false,
  });

  const { id } = useParams();

  useEffect(() => {

    client
      .get("/users/" + id)

      .then((res) => {
        setUser(res.data);
      })

      .catch((err) => console.log(err));

  }, []);

  const navigate = useNavigate();

  const UpdateUser = (e) => {

    e.preventDefault();

    client
      .put('/users/' + id,
        User
      )

      .then((res) => {
        navigate("/users");
      })

      .catch((err) => console.log(err));

  };

  return (
    <div className="d-flex w-100 justify-content-center align-items-center bg-light">
      <div className="w-50 border bg white shadow px-5 pt-3 pb-5 rounded">
        <h1>Atualizar Usuário {User.name}</h1>
        <form onSubmit={UpdateUser}>

          <div>
            <div className="mb-2">
              <label htmlFor="nome">Nome:</label>
              <input
                type="text"
                name="nome"
                className="form-control"
                placeholder="nome"
                value={User.name}
                onChange={(e) =>
                  setUser({ ...User, name: e.target.value })
                }
              />
            </div>
          </div>

          <div>
            <div className="mb-2">
              <label htmlFor="email">Email:</label>
              <input
                type="text"
                name="email"
                className="form-control"
                placeholder="email"
                value={User.email}
                onChange={(e) =>
                  setUser({ ...User, email: e.target.value })
                }
              />
            </div>
          </div>

          <div>
            <div className="mb-2">
              <label htmlFor="senha">Senha:</label>
              <input
                type="text"
                name="senha"
                className="form-control"
                placeholder="senha"
                value={User.password}
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
                placeholder="cpf"
                value={User.ssn}
                onChange={(e) =>
                  setUser({ ...User, ssn: e.target.value })
                }
              />
            </div>
          </div>

          <div>
            <div className="mb-2">
              <label htmlFor="dt">Data de Nascimento:</label>
              <input
                type="text"
                name="dt"
                className="form-control"
                placeholder="dt"
                value={User.birthday}
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
                value=""
                checked={User.isAdmin}
                className="form-check-input"
                onChange={(e) =>
                  setUser({ ...User, isAdmin: e.target.checked })
                }
              />
            </div>
          </div>

          <div>
            <div className="mb-2">
              <label htmlFor="ativo">Ativo:</label>
              <input
                type="checkbox"
                value=""
                checked={User.isActive}
                className="form-check-input"
                onChange={(e) =>
                  setUser({ ...User, isActive: e.target.checked })
                }
              />
            </div>
          </div>


          <button className="btn btn-success">Editar</button>
          <Link to="/users" className="btn btn-primary ms-3">
            Voltar
          </Link>

        </form>

      </div>
    </div>
  );
}
