import React, { useEffect, useState } from "react";
import StudentDetails from "./StudentDetails";

const Student = () => {
  const [studentData, setStudentData] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/student")
      .then(res => res.json())
      .then(data => setStudentData(data));
  }, []);

  return (
    <div>
        <h1 className="text-center text-xl my-10">Student Management for TECHNOB<span className="text-orange-600">OO</span>T</h1>

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
