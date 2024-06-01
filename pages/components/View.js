import { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";

const ViewAndEditService = ({ id_client }) => {
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchServiceData = async () => {
      try {
        const response = await fetch(`/api/client/get-client?id=${id_client}`);
        if (response.ok) {
          const data = await response.json();
          setData(data); // Preenche o formulário com os dados da API
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
  }, [id_client]);

  return (
    <Form>
      <Form.Group controlId="name">
        <Form.Label>Nome</Form.Label>
        <Form.Control type="text" name="name" value={data.name} />
      </Form.Group>

      <Form.Group controlId="email">
        <Form.Label>Email</Form.Label>
        <Form.Control type="text" name="email" value={data.email} />
      </Form.Group>

      <Form.Group controlId="address">
        <Form.Label>Endereço</Form.Label>
        <Form.Control
          type="text"
          rows={3}
          name="address"
          value={data.address}
        />
      </Form.Group>

      <Form.Group controlId="telephone">
        <Form.Label>Telefone</Form.Label>
        <Form.Control type="text" name="telephone" value={data.telephone} />
      </Form.Group>
    </Form>
  );
};

export default ViewAndEditService;
