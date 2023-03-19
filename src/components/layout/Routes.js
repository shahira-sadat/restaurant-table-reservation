import React from "react";
import { Route, Routes as Switch } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import NotFound from "../errors/NotFound";
import { today } from "../../utils/date-time";
import ReservationForm from "../reservations/ReservationForm";
import TablesForm from "../tables/TableForm";
import Seating from "../dashboard/Seating";
import FindByNumber from "../dashboard/FindByNumber";

/**
 * Defines all the routes for the application.
 *
 * You will need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function Routes() {
  return (
    <Switch>
      <Route exact={true} path="/" element={<Dashboard />} />
      <Route exact={true} path="/dashboard" element={<Dashboard />} />
      <Route exact={true} path="/reservations" element={<Dashboard />} />
      <Route exact={true} path="/newreservation" element={<ReservationForm />} />
      <Route exact={true} path="/newtables" element={<TablesForm />} />
      <Route exact={true} path="/search" element={<FindByNumber />} />
      <Route exact={true} path="/reservations/new" element={<ReservationForm type="Create a new" />} /> 
      <Route path="/dashboard" element={<Dashboard  date={today()} />} />
      <Route path="/tables/new" element={<TablesForm />} />
      <Route path="/reservations/:reservation_id/seat" element={<Seating />} />
      <Route path="/reservations/:reservation_id/edit" element={<ReservationForm type="Edit"/>} />
      <Route path="/search" element={<FindByNumber />} />
      <Route element={<NotFound />} />
    </Switch>
  );
}


export default Routes;