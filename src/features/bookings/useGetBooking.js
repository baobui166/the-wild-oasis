import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../services/apiBookings";
import { useParams } from "react-router-dom";

export function useGetBooking() {
  const { bookingId } = useParams();

  const {
    isLoading,
    data: booking,
    error,
  } = useQuery({
    queryFn: () => getBooking(bookingId),
    queryKey: ["bookings", bookingId],
    retry: false,
  });

  console.log(booking);

  return { isLoading, booking, error };
}
