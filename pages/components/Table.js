import { useEffect, useState } from "react";
import EditServiceForm from "./View";

function Table() {
  const [data, setData] = useState(null);
  const [selectedServiceId, setSelectedServiceId] = useState(null);

  async function handleDeleteService(id) {
    const response = await fetch(
      `/api/services-orders/delete-service?id=${id}`
    );
    console.log(response);
  }

  async function getServices() {
    const response = await fetch("/api/services-orders/get-service");
    const json = await response.json();
    setData(json);
  }

  useEffect(() => {
    getServices();
  }, []);

  const handleViewForm = (id) => {
    setSelectedServiceId(id);
  };

  return (
    <div class="w-full">
      <h1 class="text-2xl font-semibold mb-4">Tabela de Produtos</h1>
      <div class="table-responsive">
        <table class="table table-bordered">
          <thead class="bg-gray-200">
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Preço</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((service) => (
                <tr key={service.id}>
                  <td>{service.id_order}</td>
                  <td>{service.name}</td>
                  <td>R$ {service.estimated_cost}</td>
                  <td>
                    <button
                      onClick={() => handleViewForm(service.id_order)}
                      class="btn btn-primary mr-2"
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteService(service.id_order)}
                      class="btn btn-danger"
                    >
                      Deletar
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {selectedServiceId && <EditServiceForm orderId={selectedServiceId} />}
    </div>
  );
}

export default Table;
