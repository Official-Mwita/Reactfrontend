import React from "react";
import { useState, useEffect } from "react";
import Orders from "./Orders";
import { Container, Spinner } from "react-bootstrap";
import SingleOrder from "./SingleOrder";

//values to switch through active component
const singleOrderComponent = "Single Order Component";
const allOrdersComponent = "All Orders Component";

function Dashboard({ auth }) {
  const [jobs, setJobs] = useState([]);
  const [activeComponent, setActiveComponent] = useState(allOrdersComponent);

  const [singleOrder, setSingleOrder] = useState(null);

  //Toggle between loading and component
  const [showComponent, setShowComponent] = useState(false);
  const [spinnerVisibility, setSpinnerVisibility] = useState("loadVisible");

  useEffect(() => {
    const obtainOrders = async () => {
      const ordersFromServer = await getOrders();
      console.log(ordersFromServer);
      setJobs(ordersFromServer);
    };

    obtainOrders();
  }, []);

  const getOrders = async () => {
    try {
      const res = await fetch(auth.url + "/api/orders", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + auth.token,
        },
      });
      const data = await res.json();
      setSpinnerVisibility("loadInvisible");
      setShowComponent(true);
      return data;
    } catch (error) {}
  };

  const toSingleComponent = (order) => {
    setSingleOrder(order);
    //alert(singleOrder.trackId);
    setActiveComponent(singleOrderComponent);
  };

  return (
    <div>
      <div className="m-4">
        <div className={spinnerVisibility} style={{ textAlign: "center" }}>
          <Spinner animation="grow" variant="success" />
        </div>
        {activeComponent === allOrdersComponent && showComponent && (
          <Orders orders={jobs} changeComponent={toSingleComponent} />
        )}

        {activeComponent === singleOrderComponent && (
          <SingleOrder
            order={singleOrder}
            changeComponent={setActiveComponent}
          />
        )}
      </div>
    </div>
  );
}

export default Dashboard;

// returned objects (array)
// {
//   "created_at": "2021-07-29T16:48:36.000000Z",
//   "updated_at": "2021-07-29T16:48:36.000000Z",
//   "price": "30.50",
//   "academic_level": "College",
//   "subject_name": null,
//   "service": "Writing",
//   "type_of_paper": "essay",
//   "description": "this is awossome",
//   "reference_style": "Apa",
//   "pages": 4,
//   "hours": 45,
//   "spacing": "double",
//   "trackId": 15258,
//   "cancelled": 0,
//   "progress_status": "Queued"
// },
//
// sample tests
// const updateTasks = () => {
//   var order = [
//     {
//       academicLevel: "College",
//       topic: "",
//       subject: "",
//       writingService: "Writing",
//       writingStyle: "APA",
//       orderDescription: "",
//       noOfPages: 3,
//       hours: 72,
//       cost: 0.0,
//       currency: "USD",
//       spacing: "Double",
//       trackId: "12",
//       progressClass: "table-warning",
//       progressValue: "In progress",
//     },
//     {
//       academicLevel: "College",
//       topic: "",
//       subject: "",
//       writingService: "Writing",
//       writingStyle: "APA",
//       orderDescription: "",
//       noOfPages: 3,
//       hours: 72,
//       cost: 8.0,
//       currency: "USD",
//       spacing: "Double",
//       trackId: "3",
//       progressClass: "table-warning",
//       progressValue: "In progress",
//     },
//     {
//       academicLevel: "College",
//       topic: "",
//       subject: "",
//       writingService: "Writing",
//       writingStyle: "APA",
//       orderDescription: "",
//       noOfPages: 3,
//       hours: 72,
//       cost: 7.0,
//       currency: "USD",
//       spacing: "Double",
//       trackId: "4",
//       progressClass: "table-warning",
//       progressValue: "In progress",
//     },
//   ];
//   setJobs(order);
// };
// console.log(jobs);

// const moreTask = () => {
//   var task1 = {
//     academicLevel: "College",
//     topic: "",
//     subject: "",
//     writingService: "Writing",
//     writingStyle: "APA",
//     orderDescription: "",
//     noOfPages: 3,
//     hours: 72,
//     cost: 7.0,
//     currency: "USD",
//     spacing: "Double",
//     trackId: "4",
//     progressClass: "table-warning",
//     progressValue: "In progress",
//   };

//   setJobs([...jobs, task1]);
// };

// <button onClick={updateTasks}>check this</button>
// <button onClick={moreTask}>check th2</button>
