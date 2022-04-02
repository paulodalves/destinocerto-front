import React from "react"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"

import { Card } from '@nextui-org/react';


const Profile = () => {
  const { user: currentUser } = useSelector((state) => state.auth)
  console.log(currentUser)
  if (!currentUser) {
    return <Link to="/login" />
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
      <h3>Perfil</h3>
      <p>
        <strong>Nome de Usuário:</strong> {currentUser.username}
      </p>
      <p>
        <strong>Nome:</strong> {currentUser.nome}{" "}{currentUser.sobrenome}
      </p>
      <p>
        <strong>Telefone:</strong> {currentUser.telelefone}
      </p>
      <p>
        <strong>CPF:</strong> {currentUser.cpf}
      </p>
      <p>
        <strong>E-mail:</strong> {currentUser.email}
      </p>
    </Card>
    </div>
  )
}
export default Profile
