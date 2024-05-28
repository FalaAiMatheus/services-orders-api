import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const CreateServiceForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    estimated_cost: "",
    service_description: "",
    status: "",
    final_cost: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/services-orders/create-service", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Ordem de serviço criada:", data);
        // Aqui você pode tratar a resposta conforme necessário.
      } else {
        console.error("Erro ao criar ordem de serviço:", response.statusText);
      }
    } catch (error) {
      console.error("Erro ao criar ordem de serviço:", error.message);
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

      <Button variant="primary" type="submit">
        Criar
      </Button>
    </Form>
  );
};

export default CreateServiceForm;
