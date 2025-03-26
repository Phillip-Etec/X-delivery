import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import client from 'src/client.axios';

export default function Home() {
  const [dataUser, setDataUser] = useState([]);

  useEffect(() => {

    client
      .get('/users')
      //renovoi d'une reponse si la requette est reussie, la reponse contient data
      .then((res) => setDataUser(res.data))

      //erreur si non
      .catch((err) => console.log(err));

  }, []);

  const handleDelete = (id) => {

    const confirm = window.confirm("Would you like to delete");

    if (confirm) {

      client
        .delete("/users/" + id)

        .then((res) => {
          //au lieu d'utiliser navigate('/')
          window.location.reload();
        })

        .catch((err) => console.log(err));

    }
  };

  return (

    <div className="d-flex flex-column justify-content-center align-items-center bg-light">
      <h1>Lista de Usuários</h1>

      <div className="w-auto rounded bg-white border shadow p-4">
        <div className="d-flex justify-content-end">

          <Link to="/users/create" className="btn btn-success">
            +
          </Link>

        </div>

        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Email</th>
              <th>Senha</th>
              <th>CPF</th>
              <th>Dt Nasc.</th>
              <th>Admin?</th>
              <th>Ativo?</th>
            </tr>
          </thead>
          <tbody>
            {/* Afficher les données ici */}
            {dataUser.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.password}</td>
                <td>{user.ssn}</td>
                <td>{user.birthday}</td>
                <td>{user.isAdmin ? "true" : "false"}</td>
                <td>{user.isActive ? "true" : "false"}</td>

                <td>
                  <Link
                    to={`/users/read/${user.id}`}
                    className="btn btn-sm btn-info me-2"
                  >
                    Ler
                  </Link>
                  <Link
                    to={`/users/update/${user.id}`}
                    className="btn btn-sm btn-primary me-2"
                  >
                    Editar
                  </Link>
                  <button
                    onClick={(e) => handleDelete(user.id)}
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
