import React, { useState, useEffect } from "react";
import DestinoDataService from "../services/destino.service";
import { Link } from "react-router-dom";

const ListarDestinos = () => {

  const [destinos, setdestinos] = useState([]);
  const [currentDestino, setCurrentDestino] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);

  useEffect(() => {
    retrieveDestinos();
  }, []);

  const retrieveDestinos = () => {
    DestinoDataService.getAll()
      .then(response => {
        setdestinos(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const setActiveDestino = (destino, index) => {
    setCurrentDestino(destino);
    setCurrentIndex(index);
  };

  return (
    <div className="list row">
      <div className="col-md-6">
        <h4>Destinos</h4>
        <ul className="list-group">
          {destinos &&
            destinos.map((destino, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveDestino(destino, index)}
                key={index}
              >
                {destino.nome}
              </li>
            ))}
        </ul>
      </div>
      <div className="col-md-6">
        {currentDestino ? (
          <div>
            <h4>Destino</h4>
            <div>
              <label>
                <strong>Nome:</strong>
              </label>{" "}
              {currentDestino.nome}
            </div>
            <div>
              <label>
                <strong>Valor:</strong>
              </label>{" "}
              {currentDestino.valor}
            </div>
            <div>
              <label>
                <strong>Descrição:</strong>
              </label>{" "}
              {currentDestino.descricao}
            </div>
            <Link
              to={"/destino/" + currentDestino.id}
              className="badge badge-warning"
            >
              Editar
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Destino...</p>
          </div>
        )}
      </div>
    </div>
  );
};
export default ListarDestinos;