import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import client from 'src/client.axios';

export default function Read() {

  const [dataTelephone, setDataTelephone] = useState({
    id: 0,
    number: '',
    userId: 0,
  });

  const { id } = useParams();

  useEffect(() => {

    client
      .get("/telephones/" + id)

      .then((res) => setDataTelephone(res.data))

      .catch((err) => console.log(err));

  }, []);

  return (

    <div className="d-flex w-100 justify-content-center align-items-center bg-light">
      <div className="w-50 border bg white shadow px-5 pt-3 pb-5 rounded">

        <h1>Detalhes do Telefone</h1>

        <div className="mb-2">
          <strong> Id: {dataTelephone.id}</strong>
        </div>

        <div className="mb-2">
          <strong> Número: {dataTelephone.number}</strong>
        </div>

        <div className="mb-2">
          <strong> Id do usuário: {dataTelephone.userId}</strong>
        </div>

        <Link to={`/telephones/update/${id}`} className="btn btn-success">
          Editar
        </Link>

        <Link to="/telephones" className="btn btn-primary ms-3">
          Voltar
        </Link>

      </div>
    </div>

  );
}
