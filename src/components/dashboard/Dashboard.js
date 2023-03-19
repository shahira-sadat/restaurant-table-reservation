import React, { useEffect, useState } from "react";
import { listReservations, listTables } from "../../utils/api";
import ErrorAlert from "../errors/ErrorAlert";
import { useLocation } from "react-router-dom";
import { today, next, previous, formatDate } from "../../utils/date-time";
import Reservation from "../reservations/Reservation";
import Tables from "../tables/Tables";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard() {
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  const query = useQuery();
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [tables, setTables] = useState([]);
  const [tablesError, setTablesError] = useState(null);
  const [date, setDate] = useState(query.get("date") || today());

  useEffect(loadDashboard, [date]);

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    listTables(abortController.signal).then(setTables).catch(setTablesError);
    return () => abortController.abort();
  }

  return (
    <main className="text-center">
      <h1 className="m-3">{formatDate(date)}</h1>
      <button onClick={() => setDate(previous(date))} className="btn btn-sm btn-light">Previous Day</button>
      <button className="mx-3 btn btn-sm btn-light" onClick={() => setDate(today())}>
        Today
      </button>
      <button onClick={() => setDate(next(date))} className="btn btn-sm btn-light">Next Day</button>
      <br />
      <label htmlFor="reservation_date" className="form-label m-3">
        <input
          type="date"
          pattern="\d{4}-\d{2}-\d{2}"
          name="reservation_date"
          onChange={handleDateChange}
          value={date}
        />
      </label>
      <div className="d-md-flex mb-3 "></div>
      <ErrorAlert error={reservationsError} />
      <ErrorAlert error={tablesError} />
      <h3>Tables </h3>
      <div className="d-flex justify-content-center mb-1 flex-wrap">
        {tables.map((table) => (
          <Tables key={table.table_id} table={table} />
        ))}
      </div>
      {reservations.length ? (
        <h3>Reservations</h3>
      ) : (
        `No reservations for ${date}`
      )}
      <div className="d-flex justify-content-center flex-wrap">
        {reservations.map((reservation) => (
          <Reservation
            key={reservation.reservation_id}
            reservation={reservation}
          />
        ))}
      </div>
    </main>
  );
}

export default Dashboard;