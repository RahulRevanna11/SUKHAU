import React, { useEffect } from "react";
import DashboardLayout from "../DashboardLayout/DashboardLayout";
import img from "../../../images/doc/doctor 3.jpg";
import "./Appointments.css";
import {
  useGetDoctorAppointmentsQuery,
  useUpdateAppointmentMutation,
} from "../../../redux/api/appointmentApi";
import moment from "moment";
import { Button, message } from "antd";
import { FaEye, FaCheck, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import {
  FaClock,
  FaEnvelope,
  FaLocationArrow,
  FaPhoneAlt,
} from "react-icons/fa";
import { getBaseUrl } from "../../../helpers/config/envConfig";
import axios from "axios";



const Appointments = () => {
  const { data, isError, isLoading } = useGetDoctorAppointmentsQuery({});
  const [updateAppointment, { isError: updateIsError, isSuccess, error }] =
    useUpdateAppointmentMutation();

  const updatedApppointmentStatus = (data,id, type) => {
    // console.log("This is appointment data", data);
    const changeObj = {
      status: type,
    };
    if (data[id]) {
      // updateAppointment({ id: data.id, data: changeObj });
      try{
        axios.patch(`${getBaseUrl()}/appointment/${data[id]._id}`, { id: data[id]._id, data: changeObj });
        window.location.reload();
      }catch(err){
        console.log(err)
      }
      

    }
  };

  useEffect(() => {
    if (isSuccess) {
      message.success("Succcessfully Appointment Updated");
    }
    if (isError) {
      message.error(error?.data?.message);
    }
  }, [isSuccess, updateIsError, error]);

  let content = null;
  if (!isLoading && isError) content = <div>Something Went Wrong !</div>;
  if (!isLoading && !isError && data?.length === 0) content = <div>Empty</div>;
  if (!isLoading && !isError && data?.length > 0)
    content = (
      <>
        {data &&
          data?.map((item,index) => (
            <div
              className="w-100 mb-3 rounded p-3"
              style={{ background: "#f8f9fa" }}
            >
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center gap-3">
                  <Link to={`/`} className="patient-img">
                    <img src={img} alt="" />
                  </Link>
                  <div className="patients-info">
                    <h5>{item.patientId.firstName + " "+ item.patientId.lastName}</h5>
                    <div className="info">
                      <p>
                        <FaClock className="icon" />{" "}
                        {moment(item?.scheduleDate).format("MMM Do YY")}{" "}
                      </p>
                      <p>
                        <FaLocationArrow className="icon" /> {item.patientId.address}
                      </p>
                      <p>
                        <FaEnvelope className="icon" /> {item.email}
                      </p>
                      <p>
                        <FaPhoneAlt className="icon" /> {item.phone}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="d-flex gap-2">
                  <Button
                    type="primary"
                    shape="circle"
                    icon={<FaEye />}
                    size="medium"
                  />
                  {item?.status === "pending" && (
                    <>
                      <Button
                        type="primary"
                        icon={<FaCheck />}
                        size="medium"
                        onClick={() =>
                          updatedApppointmentStatus(data,index, "accept")

                        }
                      >
                        Accept
                      </Button>
                      <Button
                        type="primary"
                        icon={<FaTimes />}
                        danger
                        onClick={() =>
                          updatedApppointmentStatus(data,index, "cancel")
                        }
                      >
                        Cancel
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
      </>
    );
  return <DashboardLayout>{content}</DashboardLayout>;
};

export default Appointments;
