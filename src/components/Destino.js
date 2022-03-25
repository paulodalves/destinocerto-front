import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DestinoDataService from "../services/destino.service";


const Destino = () => {

    let { id } = useParams();

  const initialDestinoState = {
    id: null,
    nome: "",
    valor: "",
    descricao: "",
  };

  const [currentDestino, setCurrentDestino] = useState(initialDestinoState);
  const [message, setMessage] = useState("");

  const getDestino = id => {
    DestinoDataService.getById(id)
      .then(response => {
        setCurrentDestino(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };
  
  useEffect(() => {
    getDestino(id);
  }, [id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentDestino({ ...currentDestino, [name]: value });
  };

  const updateDestino = () => {
    DestinoDataService.update(currentDestino.id, currentDestino)
      .then(response => {
        console.log(response.data);
        setMessage("The destino was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteDestino = () => {
    DestinoDataService.remove(currentDestino.id)
      .then(response => {
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentDestino ? (
        <div className="edit-form">
          <h4>Destino</h4>
          <form>
            <div className="form-group">
              <label htmlFor="nome">Nome</label>
              <input
                type="text"
                className="form-control"
                id="nome"
                name="nome"
                value={currentDestino.nome}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="valor">Valor</label>
              <input
                type="text"
                className="form-control"
                id="valor"
                name="valor"
                value={currentDestino.valor}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="descricao">Descrição</label>
              <input
                type="text"
                className="form-control"
                id="descricao"
                name="descricao"
                value={currentDestino.descricao}
                onChange={handleInputChange}
              />
            </div>
          </form>
          <button className="badge badge-danger mr-2" onClick={deleteDestino} to={"/listardestinos"}>
            Excluir
          </button>
          <button
            type="submit"
            className="badge badge-success"
            onClick={updateDestino}
          >
            Atualizar
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Tutorial...</p>
        </div>
      )}
    </div>
  );
};
export default Destino;