import styles from "./ReservationCard.module.css";
import { useGetReservationsQuery, useGetBikesQuery } from "../api/apiSlice";
import Spiner from "../../reusables/spiner/Spinner";

function ReservationCard() {
  const {
    data: reservations,
    isLoading,
    isSuccess,
    isFetching,
  } = useGetReservationsQuery();

  const { data: bikes } = useGetBikesQuery();

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
                </div>
              );
            })}
          </div>
        </section>
      )}
    </>
  );
}

export default ReservationCard;
