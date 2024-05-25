import { useEffect, useState } from "react";
import ServiceDetails from "./View";

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
    <div className="w-full">
      <h1 className="text-2xl font-semibold mb-4">Tabela de Produtos</h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Nome</th>
              <th className="px-4 py-2">Preço</th>
              <th className="px-4 py-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((service) => (
                <tr key={service.id}>
                  <td className="border px-4 py-2">{service.id_order}</td>
                  <td className="border px-4 py-2">{service.name}</td>
                  <td className="border px-4 py-2">
                    R$ {service.estimated_cost}
                  </td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => handleViewForm(service.id_order)}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                    >
                      Visualizar
                    </button>
                    <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mr-2">
                      Editar
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteService(service.id_order)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Deletar
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {selectedServiceId && <ServiceDetails id={selectedServiceId} />}
    </div>
  );
}

export default Table;
