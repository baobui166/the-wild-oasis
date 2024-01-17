import { useEffect } from "react";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import { getCabins } from "../services/apiCabins";
import CabinTable from "../features/cabins/CabinTable";
import AddCabin from "../features/cabins/AddCabin";
import CaibinTableOperation from "../ui/CaibinTableOperation";

function Cabins() {
  useEffect(function () {
    getCabins();
  }, []);

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <CaibinTableOperation />
      </Row>

      <CabinTable />
      <Row>
        <AddCabin />
      </Row>
    </>
  );
}

export default Cabins;
