import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const CreateClientForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    email: "",
    telephone: "",
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
      const response = await fetch("/api/client/create-client", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        // Aqui você pode tratar a resposta conforme necessário.
        window.location.reload();
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

      <Form.Group controlId="address">
        <Form.Label>Endereço</Form.Label>
        <Form.Control
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="telephone">
        <Form.Label>Telefone</Form.Label>
        <Form.Control
          type="tel"
          name="telephone"
          value={formData.telephone}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="email">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </Form.Group>

      <Button className="mt-4" variant="primary" type="submit">
        Criar
      </Button>
    </Form>
  );
};

export default CreateClientForm;
