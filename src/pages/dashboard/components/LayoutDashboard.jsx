import React, { useEffect, useState } from "react";
import projectApi from "../../../api/projectApi";
import Swal from "sweetalert2";
import { AddTrack } from "./AddTrack";
import { AddMaritime } from "./AddMaritime";

export const LayoutDashboard = () => {
  const [data1, setData1] = useState(null);
  const [data2, setData2] = useState(null);

  useEffect(() => {
    // Primera petición GET
    projectApi
      .get("/maritime-deliveries")
      .then((response) => {
        setData1(response.data.data);
      })
      .catch((error) => {
        console.error("Error en la primera petición GET:", error);
      });

    // Segunda petición GET
    projectApi
      .get("/truck-deliveries")
      .then((response) => {
        setData2(response.data.data);
      })
      .catch((error) => {
        console.error("Error en la segunda petición GET:", error);
      });
  }, []);

  // Función para crear cartas
  const renderCardsOne = (data) => {
    if (!data) {
      return <p>Cargando...</p>;
    }

    return data.map((item) => (
      <div key={item.id} class="row">
        <div class="col-6">
          <div class="card shadow my-1">
            <div class="card-body">
              <div class="d-flex justify-content-between">
                <h5 class="card-title">ID: {item.id}</h5>
                <div>
                  <button
                    class="btn btn-danger btn-sm"
                    onClick={() => handleDelete(item.id, "maritime")}
                  >
                    D
                  </button>
                  <button
                    class="btn btn-primary btn-sm ms-2"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                  >
                    E
                  </button>
                </div>
              </div>

              <p class="card-text m-0">Precio: {item.shippingPrice}</p>
              <p class="card-text m-0">Descuento: {item.discount}</p>
              <p class="card-text m-0">
                Client: {item.customer.person.name}{" "}
                {item.customer.person.lastName}
              </p>
              <p class="card-text m-0">
                Tipo Transporte: {item.typeProduct.typeTransport.name}
              </p>
              <p class="card-text m-0">{item.port.name}</p>
              <p class="card-text m-0">{item.fleetNumber}</p>
            </div>
          </div>
        </div>
      </div>
    ));
  };

  const renderCardsTwo = (data) => {
    if (!data) {
      return <p>Cargando...</p>;
    }

    return data.map((item) => (
      <div key={item.id} class="row">
        <div class="col-6">
          <div class="card shadow my-1">
            <div class="card-body">
              <div class="d-flex justify-content-between">
                <h5 class="card-title">ID: {item.id}</h5>
                <div>
                  <button
                    class="btn btn-danger btn-sm"
                    onClick={() => handleDelete(item.id, "truck")}
                  >
                    D
                  </button>
                  <button
                    class="btn btn-primary btn-sm ms-2"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                  >
                    E
                  </button>
                </div>
              </div>

              <p class="card-text m-0">Precio: {item.shippingPrice}</p>
              <p class="card-text m-0">Descuento: {item.discount}</p>
              <p class="card-text m-0">
                Client: {item.customer.person.name}{" "}
                {item.customer.person.lastName}
              </p>
              <p class="card-text m-0">
                Tipo Transporte: {item.typeProduct.typeTransport.name}
              </p>
              <p class="card-text m-0">{item.store.name}</p>
              {/* <p class="card-text m-0">{item.vehicle}</p> */}
            </div>
          </div>
        </div>
      </div>
    ));
  };

  const handleEdit = (item) => {
    // Agrega tu lógica para editar aquí
    console.log("Editar item:", item);
  };

  const handleDelete = async (itemId, listType) => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminarlo!",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        let endpoint = "";
        if (listType === "maritime") {
          endpoint = `/maritime-deliveries/${itemId}`;
        } else if (listType === "truck") {
          endpoint = `/truck-deliveries/${itemId}`;
        }

        // Hacer la petición DELETE aquí
        await projectApi.delete(endpoint);

        // Eliminación local
        if (listType === "maritime") {
          setData1((prevData) => prevData.filter((item) => item.id !== itemId));
        } else if (listType === "truck") {
          setData2((prevData) => prevData.filter((item) => item.id !== itemId));
        }

        // Mostrar mensaje de éxito
        Swal.fire("¡Eliminado!", "El registro ha sido eliminado.", "success");
      } catch (error) {
        // Manejar los errores aquí
        console.error("Error al eliminar:", error);
        Swal.fire(
          "Error",
          "Ocurrió un error al intentar eliminar el registro",
          "error"
        );
      }
    }
  };

  return (
    <div className="container my-3">
      <div className="row">
        <div className="col">
          <button className="btn btn-primary"  data-bs-toggle="modal"
            data-bs-target="#addMaritimeModal">Añadir</button>
          <h1>Data de la primera petición:</h1>

          <div className="cards-container">{renderCardsOne(data1)}</div>
        </div>
        <div className="col">
          <button
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#addTrackModal"
          >
            Añadir
          </button>

          <h1>Data de la segunda petición:</h1>
          <div className="cards-container">{renderCardsTwo(data2)}</div>
        </div>
      </div>
      <AddTrack updateData2={setData2} />
      <AddMaritime updateData1={setData1} />
    </div>
  );
};
