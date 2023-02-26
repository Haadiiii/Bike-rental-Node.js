import styles from "./ReservationCard.module.css";
import { useGetReservationsQuery, useGetBikesQuery, useDeleteReservationMutation } from "../api/apiSlice";
import Spiner from "../../reusables/spiner/Spinner";
import Modal from "../../reusables/notifications/modal/Modal";
import { useState } from "react";

function ReservationCard() {
  const [modal, setModal] = useState({ isError: false, message: '', type: '' });

  const {
    data: reservations,
    isLoading,
    isSuccess,
    isFetching,
  } = useGetReservationsQuery();

  const { data: bikes } = useGetBikesQuery();

  const [deleteReservation] = useDeleteReservationMutation();

  const handleCancelReservation = (reservationId) => {
    if(isSuccess){
      deleteReservation(reservationId)
       setModal({
        isError: true,
        message: "Reservation deleted successfully",
        type: "success",
      });
    } else {
      setModal({
        isError: true,
        message: "Something went wrong",
        type: "error",
      });
    }
  };

  return (
    <>
      {isLoading && <Spiner />}
      {isFetching && <Spiner />}
      {isSuccess && (
        <section className={styles.wrapper + " flex flex-column center"}>
          <div className={styles.cardContainer + " grid gap"}>
            {reservations.map((reservation) => {
              const bike = bikes?.find( (bike) => bike._id === reservation.bike && {}) 
              return (
                <div
                  className={styles.card + " flex flex-column gap"}
                  key={reservation._id}
                >
                   {/* img */}
                    <img
                      src={bike?.images[Object.keys(bike.images)[0]]}
                      alt={bike?.name}
                    />
                  <div className={styles.cardDetails + " flex flex-column"}>
                    <h3 className="flex">
                      Bike Name:
                      <span>
                        {bike?.name}
                        {bike?.brand}
                      </span>
                    </h3>
                    <span>
                      Reservation date:
                      <span>{reservation.reservation_date}</span>
                    </span>
                    <span>
                      Due date:
                      <span>{reservation.due_date}</span>
                    </span>
                    <span>
                      City of reservation:
                      <span>{reservation.city}</span>
                    </span>
                  </div>
                  <span></span>
                  {/* cancel reservation */}

                  <button
                    onClick={() => handleCancelReservation(reservation._id)}
                  >
                    Cancel Reservation
                  </button>
                </div>
              );
            })}
          </div>
          {modal.isError && (
        <Modal
          message={modal.message}
          type={modal.type}
          onClose={() => setModal({ isError: false, message: '', type: '' })}
        />
      )}
        </section>
      )}
    </>
  );
}

export default ReservationCard;
