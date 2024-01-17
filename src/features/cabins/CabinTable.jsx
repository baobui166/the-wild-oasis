import CabinRow from "./CabinRow";
import Spinner from "../../ui/Spinner";
import { useGetCabin } from "./useGetCabin";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";

function CabinTable() {
  const { isLoading, cabins } = useGetCabin();
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;

  const filterValue = searchParams.get("discount") || "all";
  let filterCabins;

  // 1) Filter
  if (filterValue === "all") filterCabins = cabins;

  if (filterValue === "noDiscount")
    filterCabins = cabins.filter((cabin) => cabin.discount === 0);

  if (filterValue === "withDiscount")
    filterCabins = cabins.filter((cabin) => cabin.discount > 0);

  // 2)SortBy
  const sortBy = searchParams.get("sortBy") || "startDate-asc";
  const [field, direction] = sortBy.split("-");
  console.log(field, direction);
  const modifier = direction === "asc" ? 1 : -1;
  const sortedCabin = filterCabins.sort(
    (a, b) => (a[field] - b[field]) * modifier
  );

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>CABIN</div>
          <div>CAPACITY</div>
          <div>RPICE</div>
          <div>DISCOUNT</div>
          <div></div>
        </Table.Header>

        <Table.Body
          //data={filterCabins}
          data={sortedCabin}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
