import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import client from "src/client.axios";

export default function Home() {

  const [dataAddress, setDataAddress] = useState([]);

  useEffect(() => {
    client

      .get("/addresses")
      //renovoi d'une reponse si la requette est reussie, la reponse contient data

      .then((res) => setDataAddress(res.data))
      //erreur si non

      .catch((err) => console.log(err));

  }, []);

  const handleDelete = (id) => {

    const confirm = window.confirm("Tem certeza que deseja deletar?");

    if (confirm) {

      client
        .delete("http://localhost:3001/addresses/" + id)

        .then((res) => {
          //au lieu d'utiliser navigate('/')
          window.location.reload();
        })

        .catch((err) => console.log(err));
    }

  };

  return (

    <div className="d-flex flex-column justify-content-center align-items-center bg-light">

      <h1>Lista de Endereços</h1>

      <div className="w-auto rounded bg-white border shadow p-4">
        <div className="d-flex justify-content-end">

          <Link to="/addresses/create" className="btn btn-success">
            +
          </Link>

        </div>

        <table className="table table-striped">

          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Tipo</th>
              <th>Apelido</th>
              <th>CEP</th>
              <th>Complemento</th>
              <th>Logradouro</th>
              <th>Estado</th>
              <th>Bairro</th>
              <th>Região</th>
              <th>Id usuário</th>
            </tr>
          </thead>

          <tbody>
            {/* Afficher les données ici */}
            {dataAddress.map((address) => (
              <tr key={address.id}>
                <td>{address.id}</td>
                <td>{address.name}</td>
                <td>{address.type}</td>
                <td>{address.alias}</td>
                <td>{address.zip}</td>
                <td>{address.addon}</td>
                <td>{address.street}</td>
                <td>{address.state}</td>
                <td>{address.county}</td>
                <td>{address.county}</td>
                <td>{address.region}</td>
                <td>{address.userId}</td>

                <td>

                  <Link
                    to={`/addresses/read/${address.id}`}
                    className="btn btn-sm btn-info me-2"
                  >
                    Ler
                  </Link>

                  <Link
                    to={`/addresses/update/${address.id}`}
                    className="btn btn-sm btn-primary me-2"
                  >
                    Editar
                  </Link>

                  <button
                    onClick={(e) => handleDelete(address.id)}
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
