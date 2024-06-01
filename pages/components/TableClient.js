import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import ViewAndEditService from "./View";

function TableClient() {
  const [data, setData] = useState(null);
  const [handleViewForm, setHandleViewForm] = useState(false);

  async function getClients() {
    const response = await fetch("/api/client/get-clients");
    const json = await response.json();
    setData(json);
  }

  useEffect(() => {
    getClients();
  }, []);

  return (
    <div class="w-full">
      <h1 class="text-2xl font-semibold mb-4">Tabela de Clientes</h1>
      <div class="table-responsive">
        <table class="table table-bordered">
          <thead class="bg-gray-200">
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Endereço</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((client) => (
                <tr key={client.id_client}>
                  <td>{client.name}</td>
                  <td>{client.address}</td>
                  <td>{client.email}</td>
                  <td>
                    <div className="d-flex gap-3">
                      <button
                        onClick={() => setHandleViewForm(true)}
                        class="btn btn-primary mr-2"
                      >
                        Visualizar
                      </button>
                      <button
                        onClick={() => handleViewForm(client.id_client)}
                        class="btn btn-secondary mr-2"
                      >
                        Editar
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteService(client.id_client)}
                        class="btn btn-danger"
                      >
                        Deletar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            {handleViewForm && (
              <ViewAndEditService
                orderId={data.map(({ id_client }) => id_client)}
              />
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TableClient;
