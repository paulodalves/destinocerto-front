import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

import ViagemDataService from "../services/viagemservice"

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
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Destino</th>
            <th>Data da Viagem</th>
          </tr>
        </thead>
        <tbody>
          {viagens.map((viagem, index) => (
          <tr key={index}>
            <td>{viagem.nomecompleto}</td>
            <td>{viagem.nome}</td>
            <td>{viagem.dataviagem}</td>
          </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default MinhasViagens
