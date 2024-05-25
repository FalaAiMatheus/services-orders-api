import { useEffect, useState } from "react";

function Create() {
  const [client, setClient] = useState(null);
  const [date, setDate] = useState("");
  const [idClient, setidClient] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [service_description, setService_description] = useState("");
  const [relevant_notes, setRelevant_notes] = useState("");

  const sendRequest = async () => {
    const response = await fetch("/api/services-orders/create-service", {
      method: "POST",
      body: JSON.stringify({
        id_client: idClient,
        order_date: date,
        service_description,
        estimated_cost: price,
        name,
        relevant_notes,
      }),
    });
  };

  const sendRequestGetClients = async () => {
    const response = await fetch("/api/client/get-clients");
    const data = await response.json();
    setClient(data);
  };

  useEffect(() => {
    sendRequestGetClients();
  }, []);

  return (
    <form onSubmit={sendRequest}>
      <div className="flex flex-col gap-1">
        <select name="client">
          {client &&
            client.map((data) => (
              <option
                onChange={({ target }) => setidClient(target.value)}
                key={data.id_client}
                value={data.name}
              >
                {data.name}
              </option>
            ))}
        </select>
      </div>
      <div className="flex flex-col gap-1">
        <label for="date">Data</label>
        <input
          onChange={({ target }) => setDate(target.value)}
          value={date}
          name="date"
          type="date"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label for="service_description">Data</label>
        <textarea
          name="service_description"
          id="service_description"
          onChange={({ target }) => setService_description(target.value)}
          value={service_description}
        />
      </div>
      <div className="flex flex-col gap-1">
        <label for="estimated_cost">Preço</label>
        <input
          onChange={({ target }) => setPrice(target.value)}
          value={price}
          type="number"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label for="nome">Nome</label>
        <input
          onChange={({ target }) => setName(target.value)}
          value={name}
          type="text"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label for="relevant_notes">Data</label>
        <textarea
          name="relevant_notes"
          id="relevant_notes"
          onChange={({ target }) => setRelevant_notes(target.value)}
          value={relevant_notes}
        />
      </div>
      <button type="button" onClick={sendRequest}>
        Oi
      </button>
    </form>
  );
}

export default Create;
