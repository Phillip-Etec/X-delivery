import React, { useState } from "react";
import ReactDOM from 'react-dom';
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';

import client from "src/client.axios";

const MyTextInput = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input>. We can use field meta to show an error
  // message if the field is invalid and it has been touched (i.e. visited)
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className="form-control" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="text-danger">{meta.error}</div>
      ) : null}
    </>
  );
};

const MyCheckbox = ({ children, ...props }) => {
  // React treats radios and checkbox inputs differently from other input types: select and textarea.
  // Formik does this too! When you specify `type` to useField(), it will
  // return the correct bag of props for you -- a `checked` prop will be included
  // in `field` alongside `name`, `value`, `onChange`, and `onBlur`
  const [field, meta] = useField({ ...props, type: 'checkbox' });
  return (
    <div>
      <label className="checkbox-input">
        <input type="checkbox" className="form-check-input" {...field} {...props} />
        {children}
      </label>
      {meta.touched && meta.error ? (
        <div className="text-danger">{meta.error}</div>
      ) : null}
    </div>
  );
};

const MySelect = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div>
      <label htmlFor={props.id || props.name}>{label}</label>
      <select {...field} {...props} className="form-select" />
      {meta.touched && meta.error ? (
        <div className="text-danger">{meta.error}</div>
      ) : null}
    </div>
  );
};


export default function Create() {

  const [User, setUser] = useState({
    name: "",
    email: "",
    password: "",
    ssn: "",
    birthday: "",
    isAdmin: null,
    isActive: null,
  });

  const navigate = useNavigate();

  const AddUser = (e) => {

    e.preventDefault();

    client
      .post('/users', User)

      .then((res) => {
        console.log(res);
        navigate('/users');
      })

      .catch((err) => console.log(err));
  };
  // And now we can use these
  return (
    <>

      <div className="d-flex w-100 justify-content-center align-items-center bg-light">
        <div className="w-50 border bg white shadow px-5 pt-3 pb-5 rounded">

          <h1>Adicione um Usuário</h1>

          <Formik

            initialValues={{
              name: "",
              email: "",
              password: "",
              passwordConfirmation: '',
              ssn: "",
              birthday: new Date(1899, 12, 31),
              gender: '',
              isAdmin: false,
              isActive: false,
            }}

            validationSchema={Yup.object({

              name: Yup.string()
                .max(26, 'Não pode exceder 26 caracteres')
                .required('Obrigatório'),

              email: Yup.string()
                .email('Endereço de e-mail inválido')
                .required('Obrigatório'),

              password: Yup.string()
                .min(8, 'A senha deve conter no mínimo 8 caracteres')
                .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/, 'Deve conter números, caracteres maiúsculos, mínusculos, e especiais')
                .required('Obrigatório'),

              passwordConfirmation: Yup.string()
                .required('Confirmação de senha necessária')
                .oneOf([Yup.ref('password')], 'As senhas devem ser iguais'),

              ssn: Yup.string()
                .matches(/^\d+$/, 'Sem pontos ou hífens')
                .min(11, 'Um CPF é constituído de 11 caracteres')
                .max(11, 'Um CPF é constituído de 11 caracteres')
                .required('Obrigatório'),

              birthday: Yup.date().nullable()
                .min(new Date(1900, 0, 1), 'A data de Nascimento deve ser mais velha do que 01/01/1900')
                .max(new Date(), 'A data de nascimento deve ser anterior à hoje')
                .required('Obrigatório'),

              gender: Yup.string()
                .oneOf(['Masculino', 'Feminino', 'Não binário', 'Prefiro não Informar'])
                .required('Obrigatório'),

              isAdmin: Yup.boolean()
                .required('Obrigatório'),
              isActive: Yup.boolean()
                .required('Obrigatório'),

            })}

            onSubmit={(values, { setSubmitting }) => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }}

          >

            <Form>

              <MyTextInput
                label="Nome"
                name="name"
                type="text"
                placeholder="fulano"
              />

              <MyTextInput
                label="Endereço de e-mail"
                name="email"
                type="email"
                placeholder="jane@formik.com"
              />

              <MyTextInput
                label="Senha"
                name="password"
                type="text"
                placeholder=""
              />

              <MyTextInput
                label="Confirmação de Senha"
                name="passwordConfirmation"
                type="text"
                placeholder=""
              />

              <MyTextInput
                label="CPF"
                name="ssn"
                type="text"
                placeholder=""
              />

              <MyTextInput
                label="Data de Nascimento"
                name="birthday"
                type="text"
                placeholder="YYYY/mm/dd"
              />

              <MySelect label="Gênero" name="gender">
                <option value="Masculino">Masculino</option>
                <option value="Feminino">Feminino</option>
                <option value="Não binário">Não binário</option>
                <option value="Prefiro não Informar">Prefiro não Informar</option>
              </MySelect>

              <MyCheckbox name="isAdmin">
                Administrador?
              </MyCheckbox>

              <MyCheckbox name="isActive">
                Ativo?
              </MyCheckbox>

              <button type="submit" className="btn btn-success">Adicionar</button>

              <Link to="/users" className="btn btn-primary ms-3">
                Voltar
              </Link>

            </Form>
          </Formik>

        </div>
      </div>

    </>

  );
}
