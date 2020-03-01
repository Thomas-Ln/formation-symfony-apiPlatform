import axios             from "axios";
import Cache             from "./cache";
import { CUSTOMERS_API } from "../config";

function find(id) {
  return axios
    .get("http://localhost:8000/api/customers/" + id)
    .then(response => response.data);
}

async function findAll() {
  const cachedCustomers = await Cache.get("customers");
  if (cachedCustomers) return cachedCustomers;

  return axios
    .get(CUSTOMERS_API)
    .then(response => {
      const customers = response.data['hydra:member'];
      Cache.set("customers", customers);
      return customers;
    });
}

function addCustomer(customer) {
  return axios.post(CUSTOMERS_API, customer)
  .then(response => {
      Cache.invalidate("customers");
      return response;
    });
}

function updateCustomer(id, customer) {
  return axios
    .put(CUSTOMERS_API + "/" + id, customer)
    .then(response => {
      Cache.invalidate("customers");
      return response;
    });
}

function deleteCustomer(id) {
  return axios
    .delete(CUSTOMERS_API + "/" + id)
    .then(response => {
      Cache.invalidate("customers");
      return response;
    });
}

export default {
  find,
  findAll,
  add: addCustomer,
  update: updateCustomer,
  delete: deleteCustomer
}
