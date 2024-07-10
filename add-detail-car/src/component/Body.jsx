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
            <button type='submit'>{editCar ? 'Update' : 'ยืนยัน'}</button>
            {editCar && <button type="button" onClick={resetForm}>Cancel</button>}
        </form>
        <div>
            <button onClick={fetchData}>{showData ? 'Hide all cars' : 'Show all cars'}</button>
            {showData &&
            carsList.map((val,key)=>{
                return (
                    <div>
                        <div>
                            <p>ทะเบียนรถ: {val.licensePlate}</p>
                            <p>ยี่ห้อ: {val.brand}</p>
                            <p>รุ่น: {val.model}</p>
                            <p>หมายเหตุ: {val.note}</p>
                            <button onClick={()=> handleEdit(val)}>Edit</button>
                            <button onClick={() => deleteCar(val.id)}>Delete</button>
                        </div>
                    </div>
                )
            })}
        </div>
    </div>    
  )
}

export default Body