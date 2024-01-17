import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useGetBooking } from "../bookings/useGetBooking";
import { Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Checkbox from "../../ui/Checkbox";
import { formatCurrency } from "../../utils/helpers";
import { useChecking } from "../bookings/useCheckin";
import { useSetting } from "../settings/useSetting";
import { useDeleteBooking } from "../bookings/useDeleteBooking";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useNavigate } from "react-router-dom";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);

  const { booking, isLoading } = useGetBooking();
  const { checkin, isCheckingIn } = useChecking();
  const { settings, isLoading: isLoadingSetting } = useSetting();
  const { deleteBooking, isDeletingBooking } = useDeleteBooking();

  const navigate = useNavigate();

  const moveBack = useMoveBack();

  console.log(booking);
  const { id: bookingID, totalPrice } = booking;

  useEffect(
    function () {
      setConfirmPaid(booking?.isPaid ?? false);
    },
    [booking]
  );

  if (isLoading || isLoadingSetting) return <Spinner />;

  const breakFastPrice =
    settings.breakfastPrice * booking.numNights * booking.numGuests;

  console.log(bookingID);

  function handleCheckin() {
    if (!confirmPaid) return;

    if (addBreakfast) {
      console.log(bookingID);
      checkin({
        bookingID,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: breakFastPrice,
          totalPrice: totalPrice + breakFastPrice,
        },
      });
    } else {
      checkin({ bookingID, breakfast: {} });
    }
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{booking.id}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!booking.hasBreafast && (
        <Box>
          <Checkbox
            checked={addBreakfast}
            id="breakfast"
            onChange={() => {
              setAddBreakfast((add) => !add);
              setConfirmPaid(false);
            }}
          >
            Want to add breakfast with {formatCurrency(breakFastPrice)}?
          </Checkbox>
        </Box>
      )}

      <Box>
        <Checkbox
          checked={confirmPaid}
          id="confirm"
          onChange={() => setConfirmPaid((confirmPath) => !confirmPath)}
          disabled={confirmPaid || isCheckingIn}
        >
          I confirm that {booking.guest.fullName} has paid the total amount of{" "}
          {!addBreakfast
            ? formatCurrency(booking.totalPrice)
            : `${formatCurrency(
                booking.totalPrice + breakFastPrice
              )} (${formatCurrency(booking.totalPrice)} + ${formatCurrency(
                breakFastPrice
              )})`}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmPaid || isCheckingIn}>
          Check in booking #{booking.id}
        </Button>

        <Modal>
          <Modal.Open opensModal="delete">
            <Button variation="danger">Delete</Button>
          </Modal.Open>

          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName="booking"
              onConfirm={() =>
                deleteBooking(bookingID, { onSettled: () => navigate(-1) })
              }
              disabled={isDeletingBooking}
            />
          </Modal.Window>
        </Modal>

        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
