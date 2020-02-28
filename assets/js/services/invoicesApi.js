import axios from "axios";

function find(id) {
  return axios
    .get("http://localhost:8000/api/invoices/" + id)
    .then(response => response.data);
}

function findAll() {
  return axios
    .get("http://localhost:8000/api/invoices")
    .then(response => response.data['hydra:member']);
}

function addInvoice(invoice) {
  return axios.post("http://localhost:8000/api/invoices",
    {...invoice, customer: `/api/customers/${invoice.customer}`});
}

function updateInvoice(id, invoice) {
  return axios.put("http://localhost:8000/api/invoices/" + id,
    {...invoice, customer: `/api/customers/${invoice.customer}`}
  );
}

function deleteInvoice(id) {
  return axios
    .delete("http://localhost:8000/api/invoices/" + id);
}

export default {
  find,
  findAll,
  add: addInvoice,
  update: updateInvoice,
  delete: deleteInvoice
}
