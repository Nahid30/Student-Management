import React from "react";

const StudentDetails = ({ student }) => {
  const { name, img, email, address, phone, gender, birth } = student;



  return (
    <div>
      <div className="flex justify-center mx-4">
        <div class="card min-w-full bg-base-100 shadow-xl">
          <figure>
            <div class="avatar my-4">
              <div class="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src={img} alt="" />
              </div>
            </div>
          </figure>
          <div class="card-body">
            <h2 class="card-title">{name}</h2>
            <p>Address: {address}</p>
            <p>Email: {email}</p>
            <p>Phone: {phone}</p>
            <p>Gender: {gender}</p>
            <p>Date of Birth: {birth}</p>
            <div class="card-actions justify-end">
              <button class="btn btn-primary btn-sm btn-outline">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDetails;
