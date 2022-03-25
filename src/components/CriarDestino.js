import React, { useState } from "react";
import DestinoDataService from "../services/destino.service";

const CriarDestino = () => {

  const initialDestinoState = {
    id: null,
    nome: "",
    valor: "",
    descricao:"",
  };

  const [destino, setDestino] = useState(initialDestinoState);

  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setDestino({ ...destino, [name]: value });
  };

  const saveDestino = () => {
    var data = {
      nome: destino.nome,
      valor: destino.valor,
      descricao: destino.descricao,
    };

    DestinoDataService.create(data)
      .then(response => {
        setDestino({
          id: response.data.id,
          nome: response.data.nome,
          valor: response.data.valor,
          published: response.data.published
        });

        setSubmitted(true);
        console.log(response.data);
      })

      .catch(e => {
        console.log(e);
      });
  };

  const newDestino = () => {
    setDestino(initialDestinoState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newDestino}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="nome">Nome</label>
            <input
              type="text"
              className="form-control"
              id="nome"
              required
              value={destino.nome}
              onChange={handleInputChange}
              name="nome"
            />
          </div>
          <div className="form-group">
            <label htmlFor="valor">Valor</label>
            <input
              type="text"
              className="form-control"
              id="valor"
              required
              value={destino.valor}
              onChange={handleInputChange}
              name="valor"
            />
          </div>
          <div className="form-group">
            <label htmlFor="descricao">Descrição</label>
            <input
              type="text"
              className="form-control"
              id="descricao"
              required
              value={destino.descricao}
              onChange={handleInputChange}
              name="descricao"
            />
          </div>
          <button onClick={saveDestino} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default CriarDestino;