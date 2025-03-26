import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import client from "src/client.axios";

export default function Read() {

  const [dataUser, setDataUser] = useState({
    name: "",
    email: "",
    password: "",
    ssn: "",
    birthday: "",
    isAdmin: null,
    isActive: null,
  });
  //un hook qui extrait id de l'URL actuelle
  const { id } = useParams();

  useEffect(() => {
    client
      .get("/users/" + id)
      .then((res) => setDataUser(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (

    <div className="d-flex w-100 justify-content-center align-items-center bg-light">
      <div className="w-50 border bg white shadow px-5 pt-3 pb-5 rounded">

        <h1>Detalhes do Usuário</h1>

        <table className="table table-borderless">

          <tbody>
            <tr >
              <th className="col-sm-3">Nome:</th>
              <td className="col-sm-9">{dataUser.name}</td>
            </tr>
          </tbody>

        </table>
        <div className="mb-2">
          <strong> Nome: {dataUser.name}</strong>
        </div>
        <div className="mb-2">
          <strong> e-mail: {dataUser.email}</strong>
        </div>
        <div className="mb-2">
          <strong> Senha: {dataUser.password}</strong>
        </div>
        <div className="mb-2">
          <strong> CPF: {dataUser.ssn}</strong>
        </div>
        <div className="mb-2">
          <strong> Data de Nascimento: {dataUser.birthday}</strong>
        </div>
        <div className="mb-2">
          <strong> Admin: {dataUser.isAdmin ? "true" : "false"}</strong>
        </div>
        <div className="mb-2">
          <strong> Ativo: {dataUser.isActive ? "true" : "false"}</strong>
        </div>
        <Link to={`/users/update/${id}`} className="btn btn-success">
          Editar
        </Link>
        <Link to="/users" className="btn btn-primary ms-3">
          Voltar
        </Link>
      </div>
    </div>

  );
}
