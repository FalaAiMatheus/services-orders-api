import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";

const CreateServiceForm = () => {
  const [formData, setFormData] = useState({
    name: 0,
    estimated_cost: "",
    service_description: "",
  });
  const [data, setData] = useState(null);

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

  async function getClients() {
    const responseClient = await fetch("/api/client/get-clients", {
      method: "GET",
    });
    const datas = await responseClient.json();
    setData(datas);
  }
  useEffect(() => {
    getClients();
  }, []);
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="name">
        <Form.Label>Nome</Form.Label>
        <Form.Select aria-label="Default select example">
          {data &&
            data.map(({ id_client, name }) => (
              <option key={id_client} value={id_client}>
                {name}
              </option>
            ))}
        </Form.Select>
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

      <Button variant="primary" type="submit">
        Criar
      </Button>
    </Form>
  );
};

export default CreateServiceForm;
