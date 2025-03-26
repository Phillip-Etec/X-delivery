import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import client from "src/client.axios";

export default function Update() {

  const [Telephone, setTelephone] = useState({
    id: 0,
    number: '',
    userId: 0,
  });

  const { id } = useParams();

  useEffect(() => {
    client
      .get("/telephones/" + id)

      .then((res) => {
        setTelephone(res.data);
      })

      .catch((err) => console.log(err));
  }, []);

  const navigate = useNavigate();

  const UpdateTelephone = (e) => {

    e.preventDefault();

    client
      .put("/telephones/" + id, Telephone)

      .then((res) => {
        navigate("/telephones");
      })

      .catch((err) => console.log(err));

  };

  return (

    <div className="d-flex w-100 justify-content-center align-items-center bg-light">
      <div className="w-50 border bg white shadow px-5 pt-3 pb-5 rounded">

        <h1>Atualizar Telefone {Telephone.name}</h1>

        <form onSubmit={UpdateTelephone}>

          <div>
            <div className="mb-2">
              <label htmlFor="number">Número:</label>
              <input
                type="text"
                name="number"
                className="form-control"
                placeholder=""
                value={Telephone.number}
                onChange={(e) =>
                  setTelephone({ ...Telephone, name: e.target.value })
                }
              />
            </div>
          </div>

          <div>
            <div className="mb-2">
              <label htmlFor="userid">Id do Usuário:</label>
              <input
                type="number"
                name="userid"
                className="form-control"
                placeholder=""
                value={Telephone.userId}
                onChange={(e) =>
                  setTelephone({ ...Telephone, email: e.target.value })
                }
              />
            </div>
          </div>

          <button className="btn btn-success">Editar</button>

          <Link to="/telephones" className="btn btn-primary ms-3">
            Voltar
          </Link>

        </form>

      </div>
    </div>
  );
}
