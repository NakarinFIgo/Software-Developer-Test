import React from 'react'
import { useForm } from "react-hook-form";

function Body() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <div>
            <label>ทะเบียนรถ</label>
            <input 
                type="text"
                {...register("licensePlate",{required: true})} 
            />
            {errors.licensePlate && <span>จำเป็นต้องกรอกทะเบียนรถ</span>}
        </div>
        <div>
            <label>ยี่ห้อรถ</label>
            <input 
                type="text"
                {...register("brand",{required: true})} 
            />
            {errors.brand && <span>จำเป็นต้องกรอกยี่ห้อของรถ</span>}
        </div>
        <div>
            <label>รุ่นรถ</label>
            <input 
                type="text"
                {...register("model",{required: true})} 
            />
            {errors.model && <span>จำเป็นต้องกรอกรุ่นของรถ</span>}
        </div>
        <div>
            <label>หมายเหตุุ</label>
            <input 
                type="text"
                {...register("note")} 
            />
        </div>
    </form>
  )
}

export default Body