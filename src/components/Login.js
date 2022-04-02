import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from "yup"
import { login } from "../slices/auth"
import { clearMessage } from "../slices/message"
import { Link } from "react-router-dom"
import { Button, Card, Loading, Spacer } from "@nextui-org/react"

import { useNavigate } from "react-router-dom"

import { Input } from "@nextui-org/react"

import { useForm } from "react-hook-form"

const Login = () => {
  let navigate = useNavigate()

  const validationSchema = Yup.object({
    username: Yup.string().required("Campo obrigatório"),
    password: Yup.string()
      .required("Campo obrigatório")
      .min(6, "Mínimo de 6 caracteres"),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  })

  const [loading, setLoading] = useState(false)
  const { isLoggedIn } = useSelector((state) => state.auth)
  const { message } = useSelector((state) => state.message)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(clearMessage())
  }, [dispatch])

  const handleLogin = (formValue) => {
    const { username, password } = formValue
    setLoading(true)
    dispatch(login({ username, password }))
      .unwrap()
      .then(() => {
        navigate("/home")
      })
      .catch(() => {
        setLoading(false)
      })
  }

  if (isLoggedIn) {
    return <Link to="/profile" />
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
      <Card css={{ mw: "220px" }} bordered shadow={false}>
        <form onSubmit={handleSubmit(handleLogin)}>
          <Input
            label="Usuário"
            {...register("username")}
            type="text"
          />
          <p>
            <small>{errors.username?.message}</small>
          </p>
          <Spacer y={1.0} />
          <Input label="Senha" {...register("password")} type="password" />
          <p>
            <small>{errors.password?.message}</small>
          </p>
          <div style={{display:"flex", justifyContent:"center"}}>
          <Button type="submit" disabled={loading} size="sm">
            {loading && <Loading color="success" size="xs" />}
            <span>Login</span>
          </Button>
          </div>
        </form>
        {message && (
          <div className="form-group">
            <div className="alert alert-danger" role="alert">
              {message}
            </div>
          </div>
        )}
      </Card>
    </div>
  )
}
export default Login
