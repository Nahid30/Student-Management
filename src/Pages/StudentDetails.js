import React from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const StudentDetails = ({ student }) => {
  const { _id, name, img, email, address, phone, gender, birth } = student;


  const handleDelete = id => {
    const proceed = window.confirm('Are you sure You want to Delete?')
    if (proceed) {
        const url = `http://localhost:5000/student/${id}`
        fetch(url, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                toast.success('Student Deleted Successfully');
                console.log(data)
            })
    }
}



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
              <button onClick={() => handleDelete(_id)} class="btn btn-primary btn-sm btn-outline">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDetails;
