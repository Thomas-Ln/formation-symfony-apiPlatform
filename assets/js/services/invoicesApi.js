import axios from "axios";
import {INVOICES_API} from "../config";

function find(id) {
  return axios
    .get( + "/" + id)
    .then(response => response.data);
}

function findAll() {
  return axios
    .get(INVOICES_API)
    .then(response => response.data['hydra:member']);
}

function addInvoice(invoice) {
  return axios.post(INVOICES_API,
    {...invoice, customer: `/api/customers/${invoice.customer}`});
}

function updateInvoice(id, invoice) {
  return axios.put(INVOICES_API + "/" + id,
    {...invoice, customer: `/api/customers/${invoice.customer}`}
  );
}

function deleteInvoice(id) {
  return axios
    .delete(INVOICES_API + "/" + id);
}

export default {
  find,
  findAll,
  add: addInvoice,
  update: updateInvoice,
  delete: deleteInvoice
}
