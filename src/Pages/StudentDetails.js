import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from 'react-hook-form';



const StudentDetails = ({ student, getData , setLoading}) => {
  const { _id, name, img, email, address, phone, gender, birth } = student;

  const imgStorageKey = 'aedee75d1125d78418304ef04d68c66e';

    const [isOpen, setIsOpen] = useState(false);

  const { register, handleSubmit ,  reset} = useForm();


  const handleDelete = id => {
    const proceed = window.confirm('Are you sure You want to Delete?')
    if (proceed) {
        setLoading(true);
        const url = `https://student-management-technoboot.herokuapp.com/student/${id}`
        fetch(url, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                toast.success('Student Deleted Successfully');
                getData();
                console.log(data)
                setLoading(false);
            })
    }
}


    const onSubmit = data => {
        console.log(data);
        setLoading(true);
    
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
                
                // PUT 
                const url = `https://student-management-technoboot.herokuapp.com/student/${_id}`
            fetch(url, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(student)
            })
                .then(res => res.json())
                .then(inserted => {
                    if(inserted){
                        toast.success('Student Updated Successfully');
                        getData();
                        setIsOpen(false);
                        setLoading(false);
                    }
                    else{
                        toast.error('Failed to Update Student');
                        setLoading(false);
                    }
                });
    
                
            }
        //    console.log('imgbb', result)
        });
    
            
    
    
    };




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
            <p>Date of Birth: {new Date(birth).toLocaleString()}</p>
            <div class="card-actions justify-end">
              


    <div className="text-center">

        <label onClick={ ()=> setIsOpen(true) } for={`updateModal${_id}`} class="btn btn-primary btn-sm btn-outline   text-white modal-button">Update</label>

        {
            isOpen && <div>
            <input type="checkbox" id={`updateModal${_id}`} class="modal-toggle" />
            <div class="modal">
                <div class="modal-box relative">
                    <label for={`updateModal${_id}`} class="btn btn-sm btn-circle absolute right-2 top-2 bg-primary border-none text-white">✕</label>
    
            <form className='text-center mt-6'  onSubmit={handleSubmit(onSubmit)} >
                <input type="text" placeholder='Enter Your Name' className='mb-3 input input-bordered input-sm w-full max-w-xs' defaultValue={name}  {...register("name",  { required: true, })} required />
    
                <input type="email" placeholder='Enter Your Email' className='mb-3 input input-bordered input-sm w-full max-w-xs' defaultValue={email} {...register("email",)} required />
    
                <input placeholder='Enter Phone Number' className='mb-3 input input-bordered input-sm w-full max-w-xs' type="number" defaultValue={phone} {...register("phone",)} required />
    
                <input placeholder='Enter Your Address' className='mb-3 input input-bordered input-sm w-full max-w-xs' type="text" defaultValue={address} {...register("address",)} required />
                
                <input placeholder='Type Your Gender' className='mb-3 input input-bordered input-sm w-full max-w-xs' type="text" defaultValue={gender} {...register("gender",)} required />
    
                <input placeholder='Date of Birth' className='mb-3 input input-bordered input-sm w-full max-w-xs' type="date"  {...register("birth",)} required />
    
                <input placeholder='Upload Image' className='mb-3 input input-bordered input-md w-full max-w-xs pt-1.5' type="file" {...register("image",)} required /><br />
    
                <input className='btn btn-success   text-white' type="submit" value="Update" />
            </form>
    
            </div>
        </div>
            </div>
        }

</div>

            <button onClick={() => handleDelete(_id)} class="btn btn-primary btn-sm btn-outline">Delete</button>

              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDetails;
