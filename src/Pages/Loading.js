import React, { useEffect, useState } from 'react';
import { ClipLoader } from 'react-spinners';
import {  CSSProperties } from "react";

const Loading = () => {
    const [loading, setLoading] = useState(false);
    useEffect( () =>{
        setLoading(true)
        setTimeout ( () =>{
            setLoading(false)
        }, 5000 )
    } ,[]) 

    

    return (
        <div>
        
    
            <ClipLoader color={'#E6425E'} loading={loading} size={150} />
    
         
    
        </div>
    );
};

export default Loading;