import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import axios from 'axios'

const BASE_URL = "http://localhost:8000"

function Body() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [carsList,setCarsList] = useState([])
    const [showData,setShowData] = useState(true)
    const [formData,setFormData] = useState({
        licensePlate:'',
        brand:'',
        model:'',
        note:''
    });

    const [editCar,setEditCar] = useState(null)

    const fetchData = async () => {
        setShowData(!showData)
        console.log(showData);
        try {
            const response = await axios.get(`${BASE_URL}/cars`)
            setCarsList(response.data);
        } catch (error) {
            console.error('Error fetching cars:',error);
        }
    }

    const updateCarDetail = async(id) => {
        try {
            const response = await axios.put(`${BASE_URL}/cars/${id}`,formData)
            fetchData()
            setEditCar(null)
            alert('Update success!!')
        } catch (error) {
            console.error('Error update car',error);
        }
    }
    
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleEdit = (car) => {
        setFormData(car)
        setEditCar(car)
        setValue('licensePlate', car.licensePlate);
        setValue('brand', car.brand);
        setValue('model', car.model);
        setValue('note', car.note);
    }

    const deleteCar = async (id) => {
        try {
            await axios.delete(`${BASE_URL}/cars/${id}`)
            fetchData()
            alert('Delete success!!')
        } catch (error) {
            console.error('Error delete car',error);
        }
    }

    const onSubmit = async data => {
        if (editCar) {
            await updateCarDetail(editCar.id)
        }
        try {
            const response = await axios.post(`${BASE_URL}/cars`,{
                licensePlate:formData.licensePlate,
                brand:formData.brand,
                model:formData.model,
                note:formData.note
            })
            console.log(response.data);
            alert('Add success!!')
            fetchData() 
            
        } catch (error) {
            console.error('Error adding car',error);
        }
        resetForm()
    }        

    const resetForm = () => {
        setFormData({
            licensePlate:'',
            brand:'',
            model:'',
            note:''
        })
        setEditCar(null)
    }
    
  return (
    <div className='flex gap-20'>
        <div className='mb-2 ml-20 mt-20' >
            <div className='flex justify-center mb-4 text-2xl'>
                <div>ADD NEW CAR</div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='mb-2'>
                    <input
                        className="border-2 rounded-md p-2 w-[200px]"
                        name='licensePlate'
                        placeholder='ทะเบียนรถ' 
                        type="text"
                        {...register("licensePlate",{required: true})}
                        value={formData.licensePlate}
                        onChange={handleChange}  
                    />
                    <div>
                        {errors.licensePlate && <span className="text-red-500 text-sm">จำเป็นต้องกรอกทะเบียนรถ</span>}
                    </div>
                </div>
                <div className='mb-2'>
                    <input
                        className="border-2 rounded-md p-2 w-[200px]"
                        name='brand'
                        placeholder='ยี่ห้อรถ' 
                        type="text"
                        {...register("brand",{required: true})}
                        value={formData.brand}
                        onChange={handleChange}  
                    />
                    <div>
                        {errors.brand && <span className="text-red-500 text-sm">จำเป็นต้องกรอกยี่ห้อของรถ</span>}
                    </div>
                </div>
                <div className='mb-2'>
                    <input
                        className="border-2 rounded-md p-2 w-[200px]"
                        name='model'
                        placeholder='รุ่นของรถ' 
                        type="text"
                        {...register("model",{required: true})}
                        value={formData.model}
                        onChange={handleChange}  
                    />
                    <div>
                        {errors.model && <span className="text-red-500 text-sm">จำเป็นต้องกรอกรุ่นของรถ</span>}
                    </div>
                </div>
                <div className='mb-2'>
                    <input
                        className="border-2 rounded-md p-2 w-[200px]"
                        name='note'
                        placeholder='หมายเหตุ' 
                        type="text"
                        {...register("note")}
                        value={formData.note}
                        onChange={handleChange} 
                    />
                </div>
                <div className='flex justify-around'>
                    <div className='mt-4'>
                        <button type='submit' className="bg-black shadow-md text-white rounded-md px-4 py-2">{editCar ? 'Update' : 'ยืนยัน'}</button>
                    </div>
                    {editCar && <button type="button" className="bg-black shadow-md text-white rounded-md px-4 py-2 mt-4" onClick={resetForm}>Cancel</button>}
                </div>
            </form>
        </div>    
        <div className='mt-20'>
            <button onClick={fetchData} className="bg-black shadow-md text-white rounded-md px-4 py-2 mb-4" >{showData ? 'Hide all cars' : 'Show all cars'}</button>
            <div className='grid grid-cols-4 gap-4'>
                {showData &&
                carsList.map((val,key)=>{
                    return (
                        <div>
                            <div className="border-2 rounded-md p-4">
                                <p>ทะเบียนรถ: {val.licensePlate}</p>
                                <p>ยี่ห้อ: {val.brand}</p>
                                <p>รุ่น: {val.model}</p>
                                <p>หมายเหตุ: {val.note}</p>
                                <button onClick={()=> handleEdit(val)} className="bg-green-500 text-white rounded-md px-3 py-1 mr-2">Edit</button>
                                <button onClick={() => deleteCar(val.id)} className="bg-red-500 text-white rounded-md px-3 py-1">Delete</button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    </div>    
  )
}

export default Body