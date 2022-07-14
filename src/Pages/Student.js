import React, { useEffect, useState } from "react";
import StudentDetails from "./StudentDetails";
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Student = () => {

  const [studentData, setStudentData] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/student")
      .then(res => res.json())
      .then(data => setStudentData(data));
  }, []);

  const { register, handleSubmit ,  reset} = useForm();

  const imgStorageKey = 'aedee75d1125d78418304ef04d68c66e';



  const onSubmit = data => {
    console.log(data);


    // image bb 
    const image = data?.image[0];
    const formData = new FormData();
    formData.append('image', image);
    const imgUrl = `https://api.imgbb.com/1/upload?key=${imgStorageKey}`;

    fetch(imgUrl, {
        method: 'POST',
        body: formData
    })
    .then(res=>res.json())
    .then(result =>{
        if(result.success){
            const img = result.data.url;
            const student = {
                name: data.name,
                img : img,
                email: data.email,
                gender: data.gender,
                address: data.address,
                phone: data.phone,
                birth: data.birth
            }
            //new 
            const url = `http://localhost:5000/student`
            fetch(url, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(student)
            })
                .then(res => res.json())
                .then(inserted => {
                    if(inserted){
                        toast.success('Student Added Successfully');
                        reset();
                    }
                    else{
                        toast.error('Failed to add Student');
                    }
                });
            
        }
       console.log('imgbb', result)
    });

        


};




  return (
    <div>
        <h1 className="text-center text-xl my-10">Student Management for TECHNOB<span className="text-orange-600">OO</span>T</h1>

        <div className="text-center">

        <label for="my-modal-6" class="btn btn-primary  btn-wide text-white modal-button">Add Student</label>

        <input type="checkbox" id="my-modal-6" class="modal-toggle" />
            <div class="modal">
                <div class="modal-box relative">
        <label for="my-modal-6" class="btn btn-sm btn-circle absolute right-2 top-2 bg-primary border-none text-white">✕</label>

        <form className='text-center mt-6' onSubmit={handleSubmit(onSubmit)} >
            <input type="text" placeholder='Enter Your Name' className='mb-3 input input-bordered input-sm w-full max-w-xs'  {...register("name", { required: true, })} required />

            <input type="email" placeholder='Enter Your Email' className='mb-3 input input-bordered input-sm w-full max-w-xs' {...register("email",)} required />

            <input placeholder='Enter Phone Number' className='mb-3 input input-bordered input-sm w-full max-w-xs' type="number" {...register("phone",)} required />

            <input placeholder='Enter Your Address' className='mb-3 input input-bordered input-sm w-full max-w-xs' type="text" {...register("address",)} required />
            
            <input placeholder='Type Your Gender' className='mb-3 input input-bordered input-sm w-full max-w-xs' type="text" {...register("gender",)} required />

            <input placeholder='Date of Birth' className='mb-3 input input-bordered input-sm w-full max-w-xs' type="date" {...register("birth",)} required />

            <input placeholder='Upload Image' className='mb-3 input input-bordered input-md w-full max-w-xs pt-1.5' type="file" {...register("image",)} required />

            <br />
            <input className='btn btn-success   text-white' type="submit" value="Submit" />

        </form>

            </div>
        </div>

</div>

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
