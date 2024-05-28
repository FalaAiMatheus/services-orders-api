import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";

const ViewAndEditService = ({ orderId }) => {
  const [formData, setFormData] = useState({
    name: "",
    estimated_cost: "",
    service_description: "",
    status: "",
    final_cost: "",
  });

  useEffect(() => {
    const fetchServiceData = async () => {
      try {
        const response = await fetch(
          `/api/services-orders/get-service?id=${orderId}`
        );
        if (response.ok) {
          const data = await response.json();
          setFormData(data); // Preenche o formulário com os dados da API
        } else {
          console.error(
            "Erro ao buscar dados da ordem de serviço:",
            response.statusText
          );
        }
      } catch (error) {
        console.error(
          "Erro ao buscar dados da ordem de serviço:",
          error.message
        );
      }
    };

    fetchServiceData();
  }, [orderId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEditForm = async () => {
    const response = await fetch(
      `/api/services-orders/update-service?id=${orderId}`,
      {
        body: JSON.stringify({
          name,
          estimated_cost,
          service_description,
          status,
          final_cost,
        }),
      }
    );
    console.log(response);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Aqui você deve fazer a chamada para a API de atualização
      // Exemplo fictício:
      console.log("Dados enviados para atualização:", formData);
    } catch (error) {
      console.error("Erro ao atualizar ordem de serviço:", error.message);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="name">
        <Form.Label>Nome</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="estimated_cost">
        <Form.Label>Custo Estimado</Form.Label>
        <Form.Control
          type="text"
          name="estimated_cost"
          value={formData.estimated_cost}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="service_description">
        <Form.Label>Descrição do Serviço</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          name="service_description"
          value={formData.service_description}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="status">
        <Form.Label>Status</Form.Label>
        <Form.Control
          type="text"
          name="status"
          value={formData.status}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="final_cost">
        <Form.Label>Custo Final</Form.Label>
        <Form.Control
          type="text"
          name="final_cost"
          value={formData.final_cost}
          onChange={handleChange}
        />
      </Form.Group>

      <Button onSubmit={handleEditForm} variant="primary" type="submit">
        Atualizar
      </Button>
    </Form>
  );
};

export default ViewAndEditService;
