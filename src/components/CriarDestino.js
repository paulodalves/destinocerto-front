import React, { useState } from "react"
import { useForm } from "react-hook-form"
import DestinoDataService from "../services/destino.service"
import * as Yup from "yup"

import { yupResolver } from "@hookform/resolvers/yup"
import { Card, Input, Button } from "@nextui-org/react"

const CriarDestino = () => {

  const validationSchema = Yup.object({
    nome: Yup.string().required("Campo obrigatório"),
    valor: Yup.string().required("Campo obrigatório"),
    descricao: Yup.string().required("Campo obrigatório"),
  })

  const {
    register,
    handleSubmit, setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      nome: "",
      valor: "",
      descricao: "",
    },
  })

  const [submitted, setSubmitted] = useState(false)

  const saveDestino = (formValue) => {
    console.log(formValue)
    DestinoDataService.create(formValue)
      .then(() => {
        setSubmitted(true)
      })
      .catch((e) => {
        console.log(e)
      })
  }

  const newDestino = () => {
    setValue("nome","")
    setValue("valor","")
    setValue("descricao","")
    setSubmitted(false)
  }

  return (
    <div>
      <Card shadow={false} bordered>
        {submitted ? (
          <div>
            <h4>Destino Cadastrado com suecesso!</h4>
            <Button onClick={newDestino}>Add</Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit(saveDestino)}>
            <Input label="Nome" type="text" {...register("nome")} />
            <p>
              <small>{errors.nome?.message}</small>
            </p>
            <Input label="Valor" type="text" {...register("valor")} />
            <p>
              <small>{errors.valor?.message}</small>
            </p>
            <Input label="Descrição" type="text" {...register("descricao")} />
            <p>
              <small>{errors.descricao?.message}</small>
            </p>
            <Button type="submit" size="sm">Submit</Button>
          </form>
        )}
      </Card>
    </div>
  )
}

export default CriarDestino
