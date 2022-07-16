import React, {useEffect, useState} from "react";
import { useNavigate, useParams } from "react-router-dom";
import EmployeeService from "../services/EmployeeService";

const UpdateEmployee = () => {
    const { id } = useParams();



const handleChange = (e) => {
    const value = e.target.value;
    setEmployee({...employee, [e.target.name]:value});
}





  const [employee, setEmployee] = useState({
    id: id,
    firstName: "",
    lastName: "",
    emailId: "" ,
});

useEffect(() => {
  const fetchData = async () =>{

    try {
        const response = await EmployeeService.getEmployeesById(id);
        setEmployee(response.data);
    } catch (error) {
        console.log(error);
    }

  };

fetchData();
  
}, []);




    const navigate = useNavigate();

  



const updateEmployee = (e) =>{
    e.preventDefault();
    EmployeeService.saveEmployee(employee)
    .then((response)=>{
        console.log(response);
        navigate("/");
    })
    .catch((error) => {
    console.log(error);
});
};







  return (
    <div className="flex max-w-2xl mx-auto shadow  border-b">
      <div className="px-8 py-8">
        <div className="font-thin text-2xl">
          <h1> UPDATE EMPLOYEE</h1>
        </div>
        <div className="items-center justify-center h-14 w-full my-4">
          <label className="block">First name</label>
          <input type="text" className="border mt-2"
          name="firstName"
          value={employee.firstName}
          onChange={(e)=> handleChange(e)}></input>
        </div>

        <div className="items-center justify-center h-14 w-full my-4">
          <label className="block">last name</label>
          <input type="text" className="border mt-2" 
          name="lastName"
          value={employee.lastName}
          onChange={(e)=> handleChange(e)}
          ></input>
        </div>

        <div className="items-center justify-center h-14 w-full my-4">
          <label className="block">email</label>
          <input type="email" className="border mt-2" name="emailId"
          value={employee.emailId}
          onChange={(e)=> handleChange(e)}
          ></input>
        </div>

        <div className="items-center justify-center h-14 w-full my-4 space-x-4 pt-4">
          <button  onClick={updateEmployee} className="rounded text-white font-semibold bg-green-400 py-2 px-6 hover:bg-green-700">
            Save
          </button>

          <button className="rounded text-white font-semibold bg-red-400 py-2 px-6 hover:bg-red-700" onClick={()=> navigate ("/")}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateEmployee;
