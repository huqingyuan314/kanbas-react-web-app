import Modules from "../Modules";
import CourseStatus from "./Status";
import { useSelector, useDispatch } from "react-redux";

export default function Home() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);

      // Check if the user has FACULTY role
      const isFaculty = currentUser?.role === "FACULTY";

  return (
<div>

    <div className="d-flex" id="wd-home">
  <div className="flex-fill">
          <Modules />
    </div>

  <div className="d-none d-md-block">
    
    <CourseStatus />

  </div>

</div>
</div>

  );
}
