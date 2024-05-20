create table clients (
  id_client bigint primary key generated always as identity,
  name text,
  address varchar(150),
  telephone bigint,
  email varchar(100)
);

create table services_orders (
  id_order bigint primary key generated always as identity,
  id_client bigint references clients(id_client),
  order_date date,
  service_description text,
  estimated_cost decimal,
  relevant_notes text
);
