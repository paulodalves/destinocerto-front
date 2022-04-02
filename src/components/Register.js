import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import * as Yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { registerr } from "../slices/auth"
import { clearMessage } from "../slices/message"

import { useForm } from "react-hook-form"
import { Button, Card, Container, Input, Spacer } from "@nextui-org/react"
import { useNavigate } from "react-router-dom"

const Register = () => {
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (show) {
      setTimeout(() => {
        navigate("/login")
      }, 3000)
    }
  }, [show])

  let navigate = useNavigate()

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .test(
        "len",
        "O nome de usuário tem que ter entre 3 e 20 caracteres",
        (val) =>
          val && val.toString().length >= 3 && val.toString().length <= 20
      )
      .required("Campo obrigatório"),
    nome: Yup.string().required("Campo obrigatório"),
    sobrenome: Yup.string().required("Campo obrigatório"),
    telefone: Yup.string().required("Campo obrigatório"),
    cpf: Yup.string().required("Campo obrigatório"),
    email: Yup.string()
      .email("Digite um e-mail válido")
      .required("Campo obrigatório"),
    password: Yup.string()
      .test(
        "len",
        "A senha tem que ter entre 6 e 40 caracteres",
        (val) =>
          val && val.toString().length >= 6 && val.toString().length <= 40
      )
      .required("Campo obrigatório"),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      username: "",
      nome: "",
      sobrenome: "",
      telefone: "",
      cpf: "",
      email: "",
      password: "",
    },
  })

  const [successful, setSuccessful] = useState(false)

  const { message } = useSelector((state) => state.message)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(clearMessage())
  }, [dispatch])

  const handleRegister = (formValue) => {
    const { username, nome, sobrenome, telefone, cpf, email, password } =
      formValue
    setSuccessful(false)
    dispatch(
      registerr({ username, nome, sobrenome, telefone, cpf, email, password })
    )
      .unwrap()
      .then(() => {
        setSuccessful(true)
        setShow(true)
      })
      .catch(() => {
        setSuccessful(false)
      })
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
      }}
    >
      <Card bordered shadow={false} css={{ mw: "400px" }}>
        <form onSubmit={handleSubmit(handleRegister)}>
          {!successful && (
            <div>
              <div>
                <Input label="Username" {...register("username")} type="text" />
                <p>
                  <small>{errors.username?.message}</small>
                </p>
              </div>
              <div style={{ display: "flex", gap: "5%" }}>
                <div>
                  <Input label="Nome" {...register("nome")} type="text" />
                  <p>
                    <small>{errors.nome?.message}</small>
                  </p>
                </div>
                <div>
                  <Input
                    label="Sobrenome"
                    {...register("sobrenome")}
                    type="text"
                  />
                  <p>
                    <small>{errors.sobrenome?.message}</small>
                  </p>
                </div>
              </div>
              <div style={{ display: "flex", gap: "5%" }}>
                <div>
                  <Input
                    label="Telefone"
                    {...register("telefone")}
                    type="text"
                  />
                  <p>
                    <small>{errors.telefone?.message}</small>
                  </p>
                </div>
                <div>
                  <Input label="CPF" {...register("cpf")} type="text" />
                  <p>
                    <small>{errors.cpf?.message}</small>
                  </p>
                </div>
              </div>
              <Input label="E-mail" {...register("email")} type="email" />
              <p>
                <small>{errors.email?.message}</small>
              </p>

              <Input label="Senha" {...register("password")} type="password" />
              <p>
                <small>{errors.password?.message}</small>
              </p>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Button type="submit">Cadastrar</Button>
              </div>
            </div>
          )}
        </form>

        {message && (
          <div className="form-group">
            <div
              className={
                successful ? "alert alert-success" : "alert alert-danger"
              }
              role="alert"
            >
              {message}
            </div>
          </div>
        )}
      </Card>
    </div>
  )
}
export default Register
