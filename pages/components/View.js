import React, { useState, useEffect } from "react";

export function ServiceDetails({ id }) {
  const [service, setService] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    estimated_cost: "",
    service_description: "",
    status: "",
    final_cost: "",
  });

  useEffect(() => {
    const fetchServiceDetails = async () => {
      try {
        const response = await fetch(
          `/api/services-orders/get-service?id=${id}`
        );
        const data = await response.json();
        setService(data);
        // Atualizar o estado do formData com os detalhes do serviço ao receber os dados
        setFormData({
          name: data.name,
          estimated_cost: data.estimated_cost,
          service_description: data.service_description,
          status: data.status,
          final_cost: data.final_cost,
        });
      } catch (error) {
        console.error("Erro ao buscar detalhes do serviço:", error);
      }
    };

    fetchServiceDetails();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `/api/services-orders/update-service?id=${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (response.ok) {
        console.log("Detalhes do serviço atualizados com sucesso!");
      } else {
        console.error(
          "Erro ao atualizar os detalhes do serviço:",
          response.statusText
        );
      }
    } catch (error) {
      console.error("Erro ao atualizar os detalhes do serviço:", error);
    }
  };

  // Verificar se service ou formData está vazio antes de renderizar
  if (!service || !formData) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <h2>Editar Detalhes do Serviço</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nome:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="estimated_cost">Preço:</label>
          <input
            type="text"
            id="estimated_cost"
            name="estimated_cost"
            value={formData.estimated_cost}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="service_description">Descrição:</label>
          <textarea
            id="service_description"
            name="service_description"
            value={formData.service_description}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="status">Status:</label>
          <input
            type="text"
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="final_cost">Custo Final:</label>
          <input
            type="text"
            id="final_cost"
            name="final_cost"
            value={formData.final_cost}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Salvar</button>
      </form>
    </div>
  );
}
