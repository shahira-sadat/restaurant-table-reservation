import React from "react";
import { useHistory } from "react-router-dom";
import { createTable } from "../utils/api";

export default function NewTableForm({
  tablesForm,
  setTablesForm,
  errorMessage,
  setErrorMessage,
}) {
  const history = useHistory();

  function handleSubmit(event) {
    event.preventDefault();
    createTable(tablesForm).then(() => history.push("/dashboard"));
    console.log(tablesForm);
  }

  function handleChange({ target: { name, value } }) {
    setTablesForm((previousTablesForm) => ({
      ...previousTablesForm,
      [name]: value,
    }));
  }

  return (
    <form className="new-table-form" onSubmit={handleSubmit}>
      <h1>New Table Form</h1>
      <label>
        Table Name
        <input
          name="table_name"
          type="text"
          placeholder="Enter Table Name"
          required
          minLength="2"
          value={tablesForm.table_name}
          onChange={handleChange}
        />
      </label>
      <label>
        Table Capacity
        <input
          name="capacity"
          type="number"
          placeholder="Table Capacity"
          required
          value={tablesForm.capacity}
          onChange={handleChange}
        />
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        <button className="btn btn-danger" onClick={history.goBack}>
          Cancel
        </button>
      </label>
    </form>
  );
}