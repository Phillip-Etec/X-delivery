import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import client from "src/client.axios";

export default function Read() {

  const [dataAddress, setDataAddress] = useState({
    "id": 0,
    "name": "",
    "type": "",
    "alias": "",
    "zip": "",
    "addon": "",
    "street": "",
    "state": "",
    "county": "",
    "region": "",
    "userId": 0
  });

  const { id } = useParams();

  useEffect(() => {

    client
      .get("/addresses/" + id)

      .then((res) => setDataAddress(res.data))

      .catch((err) => console.log(err));

  }, []);

  return (

    <div className="d-flex w-100 justify-content-center align-items-center bg-light">
      <div className="w-50 border bg white shadow px-5 pt-3 pb-5 rounded">

        <h1>Detalhes do Usuário</h1>

        <div className="mb-2">
          <strong> Nome: {dataAddress.name}</strong>
        </div>

        <div className="mb-2">
          <strong> Tipo: {dataAddress.type}</strong>
        </div>

        <div className="mb-2">
          <strong> Apelido: {dataAddress.alias}</strong>
        </div>

        <div className="mb-2">
          <strong> CEP: {dataAddress.zip}</strong>
        </div>

        <div className="mb-2">
          <strong> Complemento: {dataAddress.addon}</strong>
        </div>

        <div className="mb-2">
          <strong> Logradouro: {dataAddress.street}</strong>
        </div>

        <div className="mb-2">
          <strong> Estado: {dataAddress.state}</strong>
        </div>

        <div className="mb-2">
          <strong> Bairro: {dataAddress.county}</strong>
        </div>

        <div className="mb-2">
          <strong> Região: {dataAddress.region}</strong>
        </div>

        <div className="mb-2">
          <strong> Id do Usuário: {dataAddress.userId}</strong>
        </div>

        <Link to={`/addresses/update/${id}`} className="btn btn-success">
          Editar
        </Link>

        <Link to="/addresses" className="btn btn-primary ms-3">
          Voltar
        </Link>

      </div>
    </div>

  );

}
