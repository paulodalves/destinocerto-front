import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

import ViagemDataService from "../services/viagemservice"

import { Table } from "@nextui-org/react"

const MinhasViagens = () => {
  const { user: currentUser } = useSelector((state) => state.auth)

  const [viagens, setViagens] = useState([])

  const retrieveViagens = () => {
    ViagemDataService.getAllByUserId(currentUser.id)
      .then((response) => {
        setViagens(response.data)
        console.log(response.data)
      })
      .catch((e) => {
        console.log(e)
      })
  }

  useEffect(() => {
    retrieveViagens()
  }, [])

  return (
    <>
      <Table
        aria-label="Tabela com conteúdo dinámico"
        css={{
          height: "auto",
          minWidth: "100%",
        }}
      >
        <Table.Header columns={viagens}>
          <Table.Column>Nome</Table.Column>
          <Table.Column>Destino</Table.Column>
          <Table.Column>Data da Viagem</Table.Column>
        </Table.Header>
        <Table.Body>
          {viagens.map((viagem, index) => (
            <Table.Row key={index}>
              <Table.Cell>{viagem.nomecompleto}</Table.Cell>
              <Table.Cell>{viagem.nome}</Table.Cell>
              <Table.Cell>{viagem.dataviagem}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </>
  )
}

export default MinhasViagens
