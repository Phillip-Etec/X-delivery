import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import client from "src/client.axios";

export default function Home() {

  const [dataTelephone, setDataTelephone] = useState([]);

  useEffect(() => {

    client
      .get("/telephones")
      //renovoi d'une reponse si la requette est reussie, la reponse contient data
      //
      .then((res) => setDataTelephone(res.data))
      //erreur si non
      //
      .catch((err) => console.log(err));

  }, []);

  const handleDelete = (id) => {

    const confirm = window.confirm("Would you like to delete");

    if (confirm) {

      client
        .delete("/telephones/" + id)

        .then((res) => {
          //au lieu d'utiliser navigate('/')
          window.location.reload();
        })

        .catch((err) => console.log(err));
    }

  };

  return (

    <div className="d-flex flex-column justify-content-center align-items-center bg-light">

      <h1>Lista de Telefones </h1>

      <div className="w-auto rounded bg-white border shadow p-4">
        <div className="d-flex justify-content-end">

          <Link to="/telephones/create" className="btn btn-success">
            +
          </Link>

        </div>

        <table className="table table-striped">

          <thead>
            <tr>
              <th>ID</th>
              <th>Número</th>
              <th>Id do Usuário</th>
            </tr>
          </thead>

          <tbody>
            {/* Afficher les données ici */}

            {dataTelephone.map((telephone) => (
              <tr key={telephone.id}>
                <td>{telephone.id}</td>
                <td>{telephone.number}</td>
                <td>{telephone.userId}</td>

                <td>
                  <Link
                    to={`/telephones/read/${telephone.id}`}
                    className="btn btn-sm btn-info me-2"
                  >
                    Ler
                  </Link>

                  <Link
                    to={`/telephones/update/${telephone.id}`}
                    className="btn btn-sm btn-primary me-2"
                  >
                    Editar
                  </Link>

                  <button
                    onClick={(e) => handleDelete(telephone.id)}
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
