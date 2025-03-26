import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import client from "src/client.axios";

export default function Read() {

  const [dataPayment, setDataPayment] = useState({
    id: 0,
    name: "",
    issuer: "",
    number: "",
    expiry: "",
    cvv: "",
    modality: "",
    userId: 0,
  });

  //un hook qui extrait id de l'URL actuelle
  //
  const { id } = useParams();

  useEffect(() => {

    client
      .get("/payments/" + id)

      .then((res) => setDataPayment(res.data))

      .catch((err) => console.log(err));

  }, []);

  return (

    <div className="d-flex w-100 justify-content-center align-items-center bg-light">
      <div className="w-50 border bg white shadow px-5 pt-3 pb-5 rounded">

        <h1>Detalhes do Cartão</h1>

        <div className="mb-2">
          <strong> Nome: {dataPayment.name}</strong>
        </div>

        <div className="mb-2">
          <strong> Emissor: {dataPayment.issuer}</strong>
        </div>

        <div className="mb-2">
          <strong> Número: {dataPayment.number}</strong>
        </div>

        <div className="mb-2">
          <strong> Data de Expiração: {dataPayment.expiry}</strong>
        </div>

        <div className="mb-2">
          <strong> CVV: {dataPayment.cvv}</strong>
        </div>

        <div className="mb-2">
          <strong> Modalidade: {dataPayment.modality}</strong>
        </div>

        <div className="mb-2">
          <strong> Id do Usuário: {dataPayment.userId}</strong>
        </div>

        <Link to={`/payments/update/${id}`} className="btn btn-success">
          Editar
        </Link>

        <Link to="/payments" className="btn btn-primary ms-3">
          Voltar
        </Link>

      </div>
    </div>

  );

}
