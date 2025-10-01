import Modules from "../Modules/page";
import CourseStatus from "./Status";

export default function Home() {
  return (
    <div id="wd-home" className="d-flex">
      <div className="flex-fill" style={{ marginRight: '20px' }}>
        <Modules />
      </div>
      <div className="d-none d-lg-block" style={{ width: '300px', flexShrink: 0 }}>
        <CourseStatus />
      </div>
    </div>
  );
}