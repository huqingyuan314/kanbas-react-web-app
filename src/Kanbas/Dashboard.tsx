import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (8)</h2> <hr />
      <div id="wd-dashboard-courses">

        <div className="wd-dashboard-course">
          <Link className="wd-dashboard-course-link"
                to="/Kanbas/Courses/1234/Home">
            <img src="/images/reactjs.jpg" width={200} />
            <div>
              <h5>
                 CS1234 React JS
                 </h5>
              <p className="wd-dashboard-course-title">
                Full Stack software developer
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          <Link className="wd-dashboard-course-link"
                to="/Kanbas/Courses/1234/Home">
            <img src="/images/CS5004.png" width={200} />
            <div>
              <h5>
                 CS5004 Object Oriented Design
                 </h5>
              <p className="wd-dashboard-course-title">
                 CS5004.15372.202410
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          <Link className="wd-dashboard-course-link"
                to="/Kanbas/Courses/1234/Home">
            <img src="/images/CS5008.png" width={200} />
            <div>
              <h5>
                 CS5008 Data Structures, Algorithms, and Their Applications Within Computer Systems
                 </h5>
              <p className="wd-dashboard-course-title">
                 CS5008.19772.202410
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          <Link className="wd-dashboard-course-link"
                to="/Kanbas/Courses/1234/Home">
            <img src="/images/CS5100.png" width={200} />
            <div>
              <h5>
                 CS5100 Foundations of Artificial Intelligence
                 </h5>
              <p className="wd-dashboard-course-title">
                 CS5100.35156.202430
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          <Link className="wd-dashboard-course-link"
                to="/Kanbas/Courses/1234/Home">
            <img src="/images/CS5200.png" width={200} />
            <div>
              <h5>
                 CS5200 Database Management Systems
                 </h5>
              <p className="wd-dashboard-course-title">
                 CS5200.MERGED.202430
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          <Link className="wd-dashboard-course-link"
                to="/Kanbas/Courses/1234/Home">
            <img src="/images/CS5610.png" width={200} />
            <div>
              <h5>
                 CS5610 Web Development
                 </h5>
              <p className="wd-dashboard-course-title">
                 CS5610.20593.202510
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          <Link className="wd-dashboard-course-link"
                to="/Kanbas/Courses/1234/Home">
            <img src="/images/CS5800.png" width={200} />
            <div>
              <h5>
                 CS5800 Algorithms
                 </h5>
              <p className="wd-dashboard-course-title">
                 CS5800.15731.202510
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          <Link className="wd-dashboard-course-link"
                to="/Kanbas/Courses/1234/Home">
            <img src="/images/alignmath.png" width={200} />
            <div>
              <h5>
                 Align Math Foundations
                 </h5>
              <p className="wd-dashboard-course-title">
                 Align.Math.Foundations
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>

        {/* <div className="wd-dashboard-course"> ... </div> */}
        
      </div>
    </div>
  );
}

