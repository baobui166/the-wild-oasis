import Filter from "../ui/Filter";
import SortBy from "./SortBy";

function CaibinTableOperation() {
  return (
    <div>
      <Filter
        filterField="discount"
        options={[
          { value: "all", label: " All" },
          { value: "noDiscount", label: "No discount" },
          { value: "withDiscount", label: " With Discount" },
        ]}
      />

      <SortBy
        options={[
          { value: "name-asc", label: "Sort by name (A-Z)" },
          { value: "name-desc", label: "Sort by name (Z-A)" },
          { value: "regularPrice-asc", label: "Sort by price (low first)" },
          { value: "regularPrice-desc", label: "Sort by price (hight first)" },
          { value: "maxCapacity-asc", label: "Sort by capacity (low first)" },
          {
            value: "maxCapacity-desc",
            lable: "Sort by capacity (hight first)",
          },
        ]}
      ></SortBy>
    </div>
  );
}

export default CaibinTableOperation;
