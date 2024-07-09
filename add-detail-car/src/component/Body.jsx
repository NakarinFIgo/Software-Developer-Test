import React, { useState } from 'react'
import { useForm } from "react-hook-form";

function Body() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [formData,setFormData]= useState({
        licensePlate:'',
        brand:'',
        model:'',
        note:''
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const onSubmit = data => {
        const newData = {
            licensePlate:formData.licensePlate,
            brand:formData.brand,
            model:formData.model,
            note:formData.note
        }
        console.log(newData); 
    }        
  return (
    <div>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <input
                    name='licensePlate'
                    placeholder='ทะเบียนรถ' 
                    type="text"
                    {...register("licensePlate",{required: true})}
                    value={formData.licensePlate}
                    onChange={handleChange}  
                />
                <div>
                    {errors.licensePlate && <span>จำเป็นต้องกรอกทะเบียนรถ</span>}
                </div>
            </div>
            <div>
                <input
                    name='brand'
                    placeholder='ยี่ห้อรถ' 
                    type="text"
                    {...register("brand",{required: true})}
                    value={formData.brand}
                    onChange={handleChange}  
                />
                <div>
                    {errors.brand && <span>จำเป็นต้องกรอกยี่ห้อของรถ</span>}
                </div>
            </div>
            <div>
                <input
                    name='model'
                    placeholder='รุ่นของรถ' 
                    type="text"
                    {...register("model",{required: true})}
                    value={formData.model}
                    onChange={handleChange}  
                />
                <div>
                    {errors.model && <span>จำเป็นต้องกรอกรุ่นของรถ</span>}
                </div>
            </div>
            <div>
                <input
                    name='note'
                    placeholder='หมายเหตุ' 
                    type="text"
                    {...register("note")}
                    value={formData.note}
                    onChange={handleChange} 
                />
            </div>
            <button type='submit'>ยืนยัน</button>
        </form>
    </div>    
  )
}

export default Body