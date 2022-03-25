import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import DestinoDataService from "../services/destino.service";
import { Container } from "react-bootstrap";
import "../App.css";
import AuthService from "../services/auth.service";

const Detalhes = () => {

  let { id } = useParams();

  useEffect(() => {
    getDestino(id);
  }, [id]);

  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    retrieveComentarios();
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const initialDestinoState = {
    id: null,
    nome: "",
    telefone: "",
    email: "",
    cidade: "",
    estado: "",
    bairro: "",
    rua: "",
    numero: "",
    latitude: null,
    longitude: null,
    descricao: "",
  };

  const [currentDestino, setCurrentDestino] = useState(initialDestinoState);

  const getDestino = (id) => {
    DestinoDataService.getById(id)
      .then((response) => {
        setCurrentDestino(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // comentários

  const initialComentarioState = {
    id: null,
    conteudo: "",
    nameuser: "",
    destino_id: id,
  };

  const [comentario, setComentario] = useState(initialComentarioState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setComentario({ ...comentario, [name]: value });
  };

  // salva comentario
  const salvarComentario = () => {
    var data = {
      conteudo: comentario.conteudo,
      nameuser: currentUser.username,
      destino_id: comentario.id,
    };

    ComentarioDataService.create(id, data)
      .then((response) => {
        setComentario({
          id: response.data.id,
          conteudo: response.data.conteudo,
          username: response.data.nameuser,
          destino_id: response.id,
        });
        setSubmitted(true);
        console.log(response.data);
        console.log(response.id);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const novoComentario = () => {
    setComentario(initialComentarioState);
    setSubmitted(false);
  };

  const [comentarios, setComentarios] = useState([]);

  const retrieveComentarios = () => {
    ComentarioDataService.getAll(id)
      .then((response) => {
        setComentarios(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      <Container
        style={{ height: "100%" }}
        className="container-padd"
        fluid="sm"
      >
        <h1 className="h1-centraliza">Local de Visita</h1>
        <div className="local-info">
          <div className="local-info-fundo-cor">
            <div className="dados-local">
              <strong>Nome:</strong>
              <p> {currentDestino.nome}</p>
            </div>
            <div className="dados-local">
              <strong>Telefone:</strong>
              <p> {currentDestino.telefone}</p>
            </div>
            <div className="dados-local">
              <strong>E-mail:</strong>
              <p> {currentDestino.email}</p>
            </div>
            <div className="dados-local">
              <strong>Estado:</strong>
              <p> {currentDestino.estado}</p>
            </div>
            <div className="dados-local">
              <strong>Cidade:</strong>
              <p> {currentDestino.cidade}</p>
            </div>
            <div className="dados-local">
              <strong>Bairro:</strong>
              <p> {currentDestino.bairro}</p>
            </div>
            <div className="dados-local">
              <strong>Rua:</strong>
              <p> {currentDestino.rua}</p>
            </div>
            <div className="dados-local">
              <strong>Número:</strong>
              <p> {currentDestino.numero}</p>
            </div>
            <div className="dados-local">
              <strong>Descrição:</strong>
              <p> {currentDestino.descricao}</p>
            </div>
          </div>
        </div>
        {currentUser && (
          <div>
            {submitted ? (
              <div style={{ margiTop: "15px" }} className="local-info">
                <h4>Comentário realiazado com sucesso!</h4>
                <button className="btn btn-success" onClick={novoComentario}>
                  Novo comentário
                </button>
              </div>
            ) : (
              <div>
                <div className="submit-form">
                  <div className="centraliza-textarea">
                    <h3>Comente</h3>
                    <div>
                      <textarea
                        className="area-comentario"
                        type="text"
                        id="conteudo"
                        required
                        value={comentario.conteudo}
                        onChange={handleInputChange}
                        maxLength="199"
                        name="conteudo"
                      />
                    </div>
                    <button
                      onClick={salvarComentario}
                      className="btn btn-success"
                    >
                      Enviar
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
        <div style={{ paddingBottom: "50px" }}>
          <div className="comentarios-list">
            <h3 style={{ paddingTop: "25px" }}>Lista de Comentarios</h3>
            <div className="comentarios-espaco">
              {comentarios &&
                comentarios.map((comentario, index) => (
                  <div className="comentario" key={index}>
                    <strong>@{comentario.nameuser}</strong>
                    <p>{comentario.conteudo}</p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </Container>
      <Rodape />
    </div>
  );
};

export default Detalhes;
