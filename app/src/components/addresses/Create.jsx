import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import client from "src/client.axios";

export default function Create() {

  const [Address, setAddress] = useState({
    name: "",
    type: "",
    alias: "",
    zip: "",
    addon: "",
    street: "",
    state: "",
    county: "",
    region: "",
    userId: 0
  });

  const navigate = useNavigate();

  const AddAddress = (e) => {
    e.preventDefault();

    client
      .post("/addresses", Address)

      .then((res) => {
        console.log(res);
        navigate("/addresses");
      })

      .catch((err) => console.log(err));
  };
  return (

    <div className="d-flex w-100 justify-content-center align-items-center bg-light">
      <div className="w-50 border bg white shadow px-5 pt-3 pb-5 rounded">

        <h1>Adicione um Endereço </h1>

        <form onSubmit={AddAddress}>

          <div className="mb-2">
            <label htmlFor="name">Nome:</label>
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="nome"
              onChange={(e) =>
                setAddress({ ...Address, name: e.target.value }
                )}
            />
          </div>

          <div className="mb-2">
            <label htmlFor="type">Tipo:</label>
            <input
              type="text"
              name="type"
              className="form-control"
              placeholder="Entrega/Cobrança"
              onChange={(e) =>
                setAddress({ ...Address, type: e.target.value }
                )}
            />
          </div>

          <div>
            <div className="mb-2">
              <label htmlFor="alias">Apelido:</label>
              <input
                type="text"
                name="alias"
                className="form-control"
                placeholder="alias"
                onChange={(e) =>
                  setAddress({ ...Address, alias: e.target.value })
                }
              />
            </div>
          </div>

          <div>
            <div className="mb-2">
              <label htmlFor="zip">CEP:</label>
              <input
                type="text"
                name="zip"
                className="form-control"
                placeholder="12345890"
                onChange={(e) =>
                  setAddress({ ...Address, zip: e.target.value })
                }
              />
            </div>
          </div>

          <div>
            <div className="mb-2">
              <label htmlFor="addon">Complemento:</label>
              <input
                type="text"
                name="addon"
                className="form-control"
                placeholder="12345890"
                onChange={(e) =>
                  setAddress({ ...Address, addon: e.target.value })
                }
              />
            </div>
          </div>

          <div>
            <div className="mb-2">
              <label htmlFor="street">Logradouro:</label>
              <input
                type="text"
                name="street"
                className="form-control"
                placeholder="Rua"
                onChange={(e) =>
                  setAddress({ ...Address, street: e.target.value })
                }
              />
            </div>
          </div>

          <div>
            <div className="mb-2">
              <label htmlFor="state">Estado:</label>
              <input
                type="text"
                name="state"
                className="form-control"
                placeholder=""
                onChange={(e) =>
                  setAddress({ ...Address, state: e.target.value })
                }
              />
            </div>
          </div>

          <div>
            <div className="mb-2">
              <label htmlFor="county">Bairro:</label>
              <input
                type="text"
                name="county"
                className="form-control"
                placeholder="12345890"
                onChange={(e) =>
                  setAddress({ ...Address, county: e.target.value })
                }
              />
            </div>
          </div>

          <div>
            <div className="mb-2">
              <label htmlFor="region">Região:</label>
              <input
                type="text"
                name="region"
                className="form-control"
                placeholder="Sul"
                onChange={(e) =>
                  setAddress({ ...Address, region: e.target.value })
                }
              />
            </div>
          </div>

          <div>
            <div className="mb-2">
              <label htmlFor="userId">Id do Usuário:</label>
              <input
                type="text"
                name="userId"
                className="form-control"
                placeholder="1"
                onChange={(e) =>
                  setAddress({ ...Address, userId: e.target.value })
                }
              />
            </div>
          </div>

          <button className="btn btn-success">Adicionar</button>

          <Link to="/addresses" className="btn btn-primary ms-3">
            Voltar
          </Link>

        </form>

      </div>
    </div>

  );

}
