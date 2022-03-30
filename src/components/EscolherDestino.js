import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ViagemDataService from "../services/viagemservice";
import DestinoDataService from "../services/destino.service";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";

const EscolherDestino = () => {
  
  let { id } = useParams();

  useEffect(() => {
    getDestino(id);
  }, [id]);



  const { user: currentUser } = useSelector((state) => state.auth);

  //console.log(currentUser.id)

  //const [submitted, setSubmitted] = useState(false);

  const initialDestinoState = {
    id: null,
    nome: "",
    valor: "",
    descricao: "",
  };

  const [currentDestino, setCurrentDestino] = useState(initialDestinoState);


  const initialViagemState = {
    id: null,
    dataviagem: "",
    user_id: "",
    destino_id: "",
  };

  const [viagem, setViagem] = useState(initialViagemState);

  const getDestino = (id) => {
    DestinoDataService.getById(id)
      .then((response) => {
        setCurrentDestino(response.data);
        console.log(response.data);
        console.log(currentDestino.id)
        console.log(currentUser.id)
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setViagem({ ...viagem, [name]: value });
  };

  // salva comentario
  const salvarViagem = () => {
    var data = {
      dataviagem: viagem.dataviagem,
      user_id: currentUser.id,
      destino_id: currentDestino.id,
    };

    let userId = currentUser.id;

    ViagemDataService.create(userId, id, data)
      .then((response) => {
        setViagem({
          id: response.data.id,
          dataviagem: response.data.dataviagem,
          user_id: response.userId,
          destino_id: response.id,
        });
        //setSubmitted(true);
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
        <h1 className="h1-centraliza">Destino de viagem</h1>
        <div className="local-info">
          <div className="local-info-fundo-cor">
            <div className="dados-local">
              <strong>Nome:</strong>
              <p> {currentDestino.nome}</p>
            </div>
            <div className="dados-local">
              <strong>Valor:</strong>
              <p> {currentDestino.valor}</p>
            </div>
            <div className="dados-local">
              <strong>Descrição:</strong>
              <p> {currentDestino.descricao}</p>
            </div>
          </div>
        </div>
        {currentUser && (
          <div>
            <div>
              <div className="submit-form">
                <div className="centraliza-textarea">
                  <h3>Seleciona a data da viagem</h3>
                  <div>
                    <input
                      className="area-comentario"
                      type="date"
                      id="dataviagem"
                      required
                      value={viagem.dataviagem}
                      onChange={handleInputChange}
                      name="dataviagem"
                    />
                  </div>
                  <button onClick={salvarViagem} className="btn btn-success">
                    Enviar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};

export default EscolherDestino;
