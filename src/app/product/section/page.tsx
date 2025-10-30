import FilteredProducts from "@/app/views/FilteredProducts";
import { memo } from "react";

const Page = async () => {

  return (
    <FilteredProducts/>
  );
};

const QueryPage = memo(Page);

export default QueryPage
