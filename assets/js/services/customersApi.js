import axios from "axios";

function find(id) {
  return axios
    .get("http://localhost:8000/api/customers/" + id)
    .then(response => response.data);
}

function findAll() {
  return axios
    .get("http://localhost:8000/api/customers")
    .then(response => response.data['hydra:member']);
}

function addCustomer(customer) {
  return axios.post("http://localhost:8000/api/customers", customer);
}

function updateCustomer(id, customer) {
  return axios.put("http://localhost:8000/api/customers/" + id, customer);
}

function deleteCustomer(id) {
  return axios
    .delete("http://localhost:8000/api/customers/" + id);
}

export default {
  find,
  findAll,
  add: addCustomer,
  update: updateCustomer,
  delete: deleteCustomer
}
