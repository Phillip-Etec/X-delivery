import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import client from "src/client.axios";

export default function Create() {

  const [Telephone, setTelephone] = useState({
    number: "",
    userId: 0,
  });

  const navigate = useNavigate();

  const AddTelephone = (e) => {
    e.preventDefault();

    client
      .post("/telephones", Telephone)

      .then((res) => {
        console.log(res);
        navigate("/telephones");
      })

      .catch((err) => console.log(err));

  };

  return (

    <div className="d-flex w-100 justify-content-center align-items-center bg-light">
      <div className="w-50 border bg white shadow px-5 pt-3 pb-5 rounded">

        <h1>Adicione um Telefone </h1>
        <form onSubmit={AddTelephone}>

          <div className="mb-2">
            <label htmlFor="number">Número:</label>
            <input
              type="text"
              name="number"
              className="form-control"
              placeholder="nome"
              onChange={(e) =>
                setTelephone({ ...Telephone, number: e.target.value }
                )}
            />
          </div>

          <div className="mb-2">
            <label htmlFor="userid">Id do usuário:</label>
            <input
              type="text"
              name="userId"
              className="form-control"
              placeholder=""
              onChange={(e) =>
                setTelephone({ ...Telephone, userId: e.target.value }
                )}
            />
          </div>

          <button className="btn btn-success">Adicionar</button>

          <Link to="/telephones" className="btn btn-primary ms-3">
            Voltar
          </Link>

        </form>

      </div>
    </div>

  );
}
