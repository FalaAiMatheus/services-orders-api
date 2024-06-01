import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";

const CreateServiceForm = () => {
  const [formData, setFormData] = useState({
    id_client: "",
    name: null,
    price: "",
    order_date: "",
    service_description: "",
    relevant_notes: "",
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
        window.location.reload();
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
      <Form.Group controlId="id_client">
        <Form.Label>Nome do Cliente</Form.Label>
        <Form.Select
          onChange={(e) =>
            setFormData({ ...formData, id_client: e.target.value })
          }
        >
          {data &&
            data.map(({ id_client, name }) => (
              <option key={id_client} value={id_client}>
                {name}
              </option>
            ))}
        </Form.Select>
      </Form.Group>
      <Form.Group controlId="name">
        <Form.Label>Nome da OS</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group controlId="price">
        <Form.Label>Preço</Form.Label>
        <Form.Control
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group controlId="order_date">
        <Form.Label>Data da ordem</Form.Label>
        <Form.Control
          type="date"
          name="order_date"
          value={formData.order_date}
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
      <Form.Group controlId="relevant_notes">
        <Form.Label>Observações</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          name="relevant_notes"
          value={formData.relevant_notes}
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
