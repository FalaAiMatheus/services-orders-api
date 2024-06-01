import { useEffect, useState } from "react";

function Table() {
  const [data, setData] = useState(null);
  const [dataClient, setDataClient] = useState(null);

  async function handleDeleteService(id) {
    const response = await fetch(
      `/api/services-orders/delete-service?id=${id}`
    );
    window.location.reload();
  }

  async function getServices() {
    const response = await fetch("/api/services-orders/get-service");
    const json = await response.json();
    setData(json);
  }

  async function getClientID() {
    const response = await fetch("/api/client/get-clients");
    const json = await response.json();
    setDataClient(json);
  }

  useEffect(() => {
    getServices();
    getClientID();
  }, []);

  return (
    <div class="w-full">
      <h1 class="text-2xl font-semibold mb-4">Tabela de Produtos</h1>
      <div class="table-responsive">
        <table class="table table-bordered">
          <thead class="bg-gray-200">
            <tr>
              <th>OS</th>
              <th>Nome</th>
              <th>Cliente</th>
              <th>Preço</th>
              <th>Data</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map(
                ({
                  id_order,
                  name,
                  id_client,
                  price,
                  order_date,
                  current_status,
                }) => (
                  <tr key={id_order}>
                    <td>{id_order}</td>
                    <td>{name}</td>
                    {dataClient &&
                      dataClient.map((client) => {
                        if (id_client === client.id_client) {
                          return <td key={client.id_client}>{client.name}</td>;
                        }
                      })}
                    <td>R$ {price}</td>
                    <td>{new Date(order_date).toLocaleDateString("pt-br")}</td>
                    <td>{current_status}</td>
                    <td>
                      <div className="d-flex gap-3">
                        <button class="btn btn-primary mr-2">Editar</button>
                        <button
                          type="button"
                          onClick={() => handleDeleteService(id_order)}
                          class="btn btn-danger"
                        >
                          Deletar
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;
