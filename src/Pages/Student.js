import React, { useEffect, useState } from "react";
import StudentDetails from "./StudentDetails";

const Student = () => {
  const [studentData, setStudentData] = useState([]);
  useEffect(() => {
    fetch("data.json")
      .then(res => res.json())
      .then(data => setStudentData(data));
  }, []);

  return (
    <div>

      <div className="grid lg:grid-cols-3 sm:grid-cols-1 gap-10 my-10  ">
      {
        studentData.map(student => <StudentDetails
            key={student._id}
            student={student}
        ></StudentDetails>)
      }
      </div>

    </div>
  );
};

export default Student;
