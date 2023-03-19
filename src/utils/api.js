/**
 * Defines the base URL for the API.
 * The default values is overridden by the `API_BASE_URL` environment variable.
 */
import formatReservationDate from "./format-reservation-date";
import formatReservationTime from "./format-reservation-date";
import axios from "axios";

const API_BASE_URL =
	process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

/**
 * Defines the default headers for these functions to work with `json-server`
 */
const headers = new Headers();
headers.append("Content-Type", "application/json");

/**
 * Fetch `json` from the specified URL and handle error status codes and ignore `AbortError`s
 *
 * This function is NOT exported because it is not needed outside of this file.
 *
 * @param url
 *  the url for the requst.
 * @param options
 *  any options for fetch
 * @param onCancel
 *  value to return if fetch call is aborted. Default value is undefined.
 * @returns {Promise<Error|any>}
 *  a promise that resolves to the `json` data or an error.
 *  If the response is not in the 200 - 399 range the promise is rejected.
 */
async function fetchJson(url, options, onCancel) {
	try {
		const response = await fetch(url, options);

		if (response.status === 204) {
			return null;
		}

		const payload = await response.json();

		if (payload.error) {
			return Promise.reject({ message: payload.error });
		}
		return payload.data;
	} catch (error) {
		if (error.name !== "AbortError") {
			console.error(error.stack);
			throw error;
		}
		return Promise.resolve(onCancel);
	}
}

/**
 * Retrieves all existing reservation.
 * @returns {Promise<[reservation]>}
 *  a promise that resolves to a possibly empty array of reservation saved in the database.
 */

export async function listReservations(params, signal) {
	const url = new URL(`${API_BASE_URL}/reservations`);
	Object.entries(params).forEach(([key, value]) =>
		url.searchParams.append(key, value.toString())
	);
	return await fetchJson(url, { headers, signal }, [])
		.then(formatReservationDate)
		.then(formatReservationTime);
}

export async function createReservation(reservation) {
  return await axios.post(`${API_BASE_URL}/reservations`, reservation)
}

export async function listTables(signal) {
  const url = new URL(`${API_BASE_URL}/tables`)

  return await fetchJson(url, { headers, signal }, [])
}

export async function createTable(table) {
  return await axios.post(`${API_BASE_URL}/tables`, table)
}

export async function updateTable(table_id, reservation_id) {
  return await axios.put(
    `${API_BASE_URL}/tables/${table_id}/seat`,
    reservation_id
  )
}

export async function readReservation(id) {
  const { data } = await axios.get(`${API_BASE_URL}/reservations/${id}`)
  return data.data
}

export async function clearTable(id) {
  const { data } = await axios.delete(`${API_BASE_URL}/tables/${id}/seat`)
  return data.data
}

export async function updateStatus(id, status) {
  const { data } = await axios.put(
    `${API_BASE_URL}/reservations/${id}/status`,
    status
  )
  return data.data
}

export async function updateReservation(id, update) {
  const { data } = await axios.put(`${API_BASE_URL}/reservations/${id}`, update)
  return data.data
}