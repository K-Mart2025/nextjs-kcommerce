import { ArrowBigLeft } from "lucide-react";
const Navigation = () => {
  return (
    <div className="mr-4 min-w-min max-w-max">
      <div onClick={() => history.back()}>
        <ArrowBigLeft />
      </div>
    </div>
  );
};
export default Navigation;
