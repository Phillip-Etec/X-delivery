import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import client from "src/client.axios";

export default function Create() {

  const [Payment, setPayment] = useState({
    name: "",
    issuer: "",
    number: "",
    expiry: "",
    cvv: "",
    modality: "",
    userId: 0,
  });

  const navigate = useNavigate();

  const AddPayment = (e) => {

    e.preventDefault();

    client
      .post("/payments", Payment)

      .then((res) => {
        console.log(res);
        navigate("/payments");
      })

      .catch((err) => console.log(err));
  };

  return (

    <div className="d-flex w-100 justify-content-center align-items-center bg-light">
      <div className="w-50 border bg white shadow px-5 pt-3 pb-5 rounded">

        <h1>Adicione um Cartão </h1>

        <form onSubmit={AddPayment}>

          <div className="mb-2">
            <label htmlFor="name">Nome:</label>
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="nome"
              onChange={(e) =>
                setPayment({ ...Payment, name: e.target.value }
                )}
            />
          </div>

          <div className="mb-2">
            <label htmlFor="issuer">Emissor:</label>
            <input
              type="text"
              name="issuer"
              className="form-control"
              placeholder="Maestro/Visa"
              onChange={(e) =>
                setPayment({ ...Payment, issuer: e.target.value }
                )}
            />
          </div>

          <div>
            <div className="mb-2">
              <label htmlFor="number">Número:</label>
              <input
                type="text"
                name="number"
                className="form-control"
                placeholder=""
                onChange={(e) =>
                  setPayment({ ...Payment, number: e.target.value })
                }
              />
            </div>
          </div>

          <div>
            <div className="mb-2">
              <label htmlFor="expiry">Data de Expiração:</label>
              <input
                type="text"
                name="expiry"
                className="form-control"
                placeholder="dd/mm/YYYY"
                onChange={(e) =>
                  setPayment({ ...Payment, expiry: e.target.value })
                }
              />
            </div>
          </div>

          <div>
            <div className="mb-2">
              <label htmlFor="cvv">CVV:</label>
              <input
                type="text"
                name="cvv"
                className="form-control"
                placeholder="000"
                onChange={(e) =>
                  setPayment({ ...Payment, cvv: e.target.value })
                }
              />
            </div>
          </div>

          <div>
            <div className="mb-2">
              <label htmlFor="modality">Modalidade:</label>
              <input
                type="text"
                name="modality"
                className="form-control"
                onChange={(e) =>
                  setPayment({ ...Payment, modality: e.target.value })
                }
              />
            </div>
          </div>

          <div>
            <div className="mb-2">
              <label htmlFor="userid">Id do Usuário:</label>
              <input
                type="text"
                name="userid"
                className="form-control"
                onChange={(e) =>
                  setPayment({ ...Payment, userId: e.target.value })
                }
              />
            </div>
          </div>

          <button className="btn btn-success">Adicionar</button>

          <Link to="/payments" className="btn btn-primary ms-3">
            Voltar
          </Link>

        </form>

      </div>
    </div>

  )

}
