import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import EmployeeService from '../services/EmployeeService';

const EmployeeList = () => {
const navigate = useNavigate();

const [loading, setLoading] = useState([]);
const [employees, setEmployees] = useState([]);

useEffect(() => {
  const fetchData = async () =>{
    setLoading(true);
    try {
        const response = await EmployeeService.getEmployees();
        setEmployees(response.data);
    } catch (error) {
        console.log(error);
    }
    setLoading(false);
  };

fetchData();
  
}, []);

const deleteEmployee = (e,id) =>{
    e.preventDefault();
    EmployeeService.deleteEmployee(id).then((res) => {
        if(employees){
            setEmployees((prevElement)=>{
            return prevElement.filter((employee)=>employee.id!==id);
        });
        }
    });
    /*window.location.reload(false);*/



};


const editEmployee = (e,id) =>{
    e.preventDefault();
      navigate(`/editEmployee/${id}`);

    /*window.location.reload(false);*/



};

  return (
  <>
  <div className='container mx-auto my-8'>
<div className='h-12'> 
<button className='rouded bg-red-600 text-white px-6 py-2 font-semibold' onClick={()=> navigate ("/addEmployee")}>Add employee </button>
<div className='flex shadow border-b'>
   <table className='min-w-full'>
    <thead className='bg-gray-300'>
        <tr>
            <th className='text-left font-medium text-gray-500 uppercase tracking-wider py-3 px-6'>first name</th>
            <th className='text-left font-medium text-gray-500 uppercase tracking-wider py-3 px-6'>last name</th>
            <th className='text-left font-medium text-gray-500 uppercase tracking-wider py-3 px-6'>email id</th>
            <th className='text-left font-medium text-gray-500 uppercase tracking-wider py-3 px-6'>actions</th>

        </tr>
    </thead>
{!loading && (
    <tbody className='bg-white' >
       {employees.map((employee) =>(
        <tr key={employee.id}>
            <td>{employee.firstName}</td>
            <td>{employee.lastName}</td>
            <td>{employee.emailId}</td>
            <td><a className='px-4' onClick={(e,id) => editEmployee(e,employee.id)}>edit</a><a className='px-4 text-red-700' onClick={(e,id) => deleteEmployee(e,employee.id)}>delete</a></td>
        </tr>
))}
    </tbody>)}


    </table> 
</div>
</div>

</div>
  </>
  )
}

export default EmployeeList