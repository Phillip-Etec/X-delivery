import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import client from "axios";

export default function Update() {

  const [Payment, setPayment] = useState({
    name: "",
    issuer: "",
    number: "",
    expiry: "",
    cvv: "",
    modality: "",
    userId: 0,
  });

  const { id } = useParams();

  useEffect(() => {

    client
      .get("/payments/" + id)

      .then((res) => {
        setPayment(res.data);
      })

      .catch((err) => console.log(err));

  }, []);

  const navigate = useNavigate();

  const UpdatePayment = (e) => {

    e.preventDefault();

    client
      .put("/payments/" + id, Payment)

      .then((res) => {
        navigate("/payments");
      })

      .catch((err) => console.log(err));
  };

  return (

    <div className="d-flex w-100 justify-content-center align-items-center bg-light">
      <div className="w-50 border bg white shadow px-5 pt-3 pb-5 rounded">

        <h1>Atualizar Cartão {Payment.number}</h1>
        <form onSubmit={UpdatePayment}>

          <div>
            <div className="mb-2">
              <label htmlFor="Number">Nome:</label>
              <input
                type="text"
                name="nome"
                className="form-control"
                placeholder="nome"
                value={Payment.name}
                onChange={(e) =>
                  setPayment({ ...Payment, name: e.target.value })
                }
              />
            </div>
          </div>

          <div>
            <div className="mb-2">
              <label htmlFor="number">Número:</label>
              <input
                type="text"
                name="number"
                className="form-control"
                placeholder=""
                value={Payment.number}
                onChange={(e) =>
                  setPayment({ ...Payment, number: e.target.value })
                }
              />
            </div>
          </div>

          <div>
            <div className="mb-2">
              <label htmlFor="issuer">Emissor:</label>
              <input
                type="text"
                name="issuer"
                className="form-control"
                placeholder="issuer"
                value={Payment.issuer}
                onChange={(e) =>
                  setPayment({ ...Payment, issuer: e.target.value })
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
                placeholder="expiry"
                value={Payment.expiry}
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
                placeholder="cvv"
                value={Payment.cvv}
                onChange={(e) =>
                  setPayment({ ...Payment, cvv: e.target.value })
                }
              />
            </div>
          </div>

          <div>
            <div className="mb-2">
              <label htmlFor="admin">Modalidade:</label>
              <input
                type="text"
                value={Payment.modality}
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
                value={Payment.userId}
                className="form-control"
                onChange={(e) =>
                  setPayment({ ...Payment, userId: e.target.value })
                }
              />
            </div>
          </div>

          <button className="btn btn-success">Editar</button>

          <Link to="/payments" className="btn btn-primary ms-3">
            Voltar
          </Link>

        </form>

      </div>
    </div>

  );

}
