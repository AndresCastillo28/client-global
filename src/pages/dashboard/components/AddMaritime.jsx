import React, { useEffect, useState } from "react";
import projectApi from "../../../api/projectApi";
import Swal from "sweetalert2";

export const AddMaritime = ({ updateData1 }) => {
  // Estado para cada campo del formulario
  const [productQuantity, setProductQuantity] = useState(0);
  const [deadLine, setDeadLine] = useState("");
  const [shippingPrice, setShippingPrice] = useState(0);
  const [typeProductId, setTypeProductId] = useState(0);
  const [customerId, setCustomerId] = useState(0);
  const [portId, setPortId] = useState(0);
  const [fleetNumber, setFleetNumber] = useState("");

  const [typeProducts, setTypeProducts] = useState([]);
  const [ports, setPorts] = useState([]);

  useEffect(() => {
    const fetchTypeProducts = async () => {
      try {
        const response = await projectApi.get("/types-products");
        const response2 = await projectApi.get("/ports");
        setTypeProducts(response.data.data);
        setPorts(response2.data.data);
      } catch (error) {
        console.error("Error al cargar tipos de productos:", error);
      }
    };

    fetchTypeProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trackData = {
      productQuantity: parseInt(productQuantity, 10),
      deadLine,
      shippingPrice: parseFloat(shippingPrice),
      typeProduct: { id: parseInt(typeProductId, 10) },
      customer: { id: parseInt(customerId, 10) },
      port: { id: parseInt(portId, 10) },
      fleetNumber,
    };

    try {
      const response = await projectApi.post("/maritime-deliveries", trackData);
      Swal.fire("Exitoso", "Creado exitosamente", "success");
      updateData1(prevData => [...prevData, response.data.data]);
    } catch (error) {
      Swal.fire("Exitoso", "Creado exitosamente", "error");

      console.error("Error al crear track:", error);
    }
  };

  return (
    <>
      <div
        class="modal fade"
        id="addMaritimeModal"
        tabindex="-1"
        aria-labelledby="addMaritimeModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="addMaritimeModalLabel">
                Modal title
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              ...
              <div className="container mt-3">
                <h2>Añadir Maritime</h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="productQuantity" className="form-label">
                      Cantidad de Producto
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="productQuantity"
                      value={productQuantity}
                      onChange={(e) => setProductQuantity(e.target.value)}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="deadLine" className="form-label">
                      Fecha Límite
                    </label>
                    <input
                      type="datetime-local"
                      className="form-control"
                      id="deadLine"
                      value={deadLine}
                      onChange={(e) => setDeadLine(e.target.value)}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="shippingPrice" className="form-label">
                      Precio de Envío
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="shippingPrice"
                      value={shippingPrice}
                      onChange={(e) => setShippingPrice(e.target.value)}
                    />
                  </div>

                  {/* Los siguientes campos pueden ser reemplazados por selectores si tienes listas de opciones */}
                  <div className="mb-3">
                    <label htmlFor="typeProduct" className="form-label">
                      Tipo de Producto
                    </label>
                    <select
                      className="form-control"
                      id="typeProduct"
                      value={typeProductId}
                      onChange={(e) => setTypeProductId(e.target.value)}
                    >
                      <option value="">Seleccione un tipo de producto</option>
                      {typeProducts.map((typeProduct) => (
                        <option key={typeProduct.id} value={typeProduct.id}>
                          {typeProduct.name} - {typeProduct.typeTransport.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="customer" className="form-label">
                      ID del Cliente
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="customer"
                      value={customerId}
                      onChange={(e) => setCustomerId(e.target.value)}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="store" className="form-label">
                      Tienda
                    </label>
                    <select
                      className="form-control"
                      id="store"
                      value={portId}
                      onChange={(e) => setPortId(e.target.value)}
                    >
                      <option value="">Seleccione una tienda</option>
                      {ports.map((store) => (
                        <option key={store.id} value={store.id}>
                          {store.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="fleetNumber" className="form-label">
                      Placa del Vehículo
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="fleetNumber"
                      value={fleetNumber}
                      onChange={(e) => setFleetNumber(e.target.value)}
                    />
                  </div>

                  <button type="submit" className="btn btn-primary">
                    Añadir Track
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
