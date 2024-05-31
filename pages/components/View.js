import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";

const ViewAndEditService = ({ orderId }) => {

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
