import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import client from "src/client.axios";

export default function Home() {

  const [dataPayment, setDataPayment] = useState([]);

  useEffect(() => {

    client
      .get("/payments")
      //renovoi d'une reponse si la requette est reussie, la reponse contient data

      .then((res) => setDataPayment(res.data))

      //erreur si non
      .catch((err) => console.log(err));

  }, []);

  const handleDelete = (id) => {

    const confirm = window.confirm("Would you like to delete");

    if (confirm) {

      client
        .delete("/payments/" + id)
        .then((res) => {
          //au lieu d'utiliser navigate('/')
          window.location.reload();
        })
        .catch((err) => console.log(err));

    }

  };

  return (

    <div className="d-flex flex-column justify-content-center align-items-center bg-light">

      <h1>Lista de Cartões</h1>

      <div className="w-auto rounded bg-white border shadow p-4">
        <div className="d-flex justify-content-end">

          <Link to="/payments/create" className="btn btn-success">
            +
          </Link>
        </div>

        <table className="table table-striped">

          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Emissor</th>
              <th>Número</th>
              <th>Data de Expiração</th>
              <th>CVV</th>
              <th>Modalidade</th>
              <th>Id Usuário</th>
            </tr>
          </thead>

          <tbody>
            {/* Afficher les données ici */}
            {dataPayment.map((payment) => (
              <tr key={payment.id}>
                <td>{payment.id}</td>
                <td>{payment.name}</td>
                <td>{payment.issuer}</td>
                <td>{payment.number}</td>
                <td>{payment.expiry}</td>
                <td>{payment.cvv}</td>
                <td>{payment.modality}</td>
                <td>{payment.userId}</td>

                <td>
                  <Link
                    to={`/payments/read/${payment.id}`}
                    className="btn btn-sm btn-info me-2"
                  >
                    Ler
                  </Link>

                  <Link
                    to={`/payments/update/${payment.id}`}
                    className="btn btn-sm btn-primary me-2"
                  >
                    Editar
                  </Link>

                  <button
                    onClick={(e) => handleDelete(payment.id)}
                    className="btn btn-sm btn-danger "
                  >
                    Deletar
                  </button>

                </td>
              </tr>

            ))}

          </tbody>

        </table>

      </div>
    </div>

  );

}
