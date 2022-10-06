const Employee = require("../models/employee.js");

async function viewAllEmployees(_, filters) {
  let employees = Employee.find();
  if (filters.role) {
    employees = employees.or({ title: filters.role });
  }
  if (filters.department) {
    employees = employees.or({ department: filters.department });
  }
  if (filters.employeeType) {
    employees = employees.or({ employeeType: filters.employeeType });
  }
  return await employees;
}

async function viewSingleEmployee(_, { id }) {
  return await Employee.findOne({ id });
}

async function addNewEmployee(_, { employee }) {
  const all = await Employee.find({ });

   loginId=createLoginId({emplpoyee});
   password=employee.fname.substring(0,1)+employee.lname.substring(0,1)+employee.mobile;

  if (employee.dateOfJoining == "" || employee.dateOfJoining == null) {
    employee.dateOfJoining = moment().format("YYYY-MM-DD");
  }

  return await Employee.addNewEmployee(employee);
}
async function createLoginId({employee}){
  if (employee.role == "Manager") {
    let role = employee.role
    count= await Employee.find({role:role});
     let loginNum=1000
    if(count.length==0){
      loginNum+=1;
   }else{
      loginNum+=count.length+1;
   }
   loginId=role.Substring(0,3)+loginNum;
  } else if (employee.role == "Employee") {
    let role = employee.role
    count=  await  Employee.find({role:role});
     let loginNum=2000
    if(count.length==0){
      loginNum+=1;
   }else{
      loginNum+=count.length+1;
   }
   loginId=role.Substring(0,3)+loginNum;
  } else if (employee.role == "Admin") {
    let role = employee.role
    count=  await  Employee.find({role:role});
     let loginNum=3000
    if(count.length==0){
      loginNum+=1;
   }else{
      loginNum+=count.length+1;
   }
   loginId=role.Substring(0,3)+loginNum;
  }else if (employee.role == "Director") {
    let role = employee.role
    count=  await  Employee.find({role:role});
     let loginNum=4000
    if(count.length==0){
      loginNum+=1;
   }else{
      loginNum+=count.length+1;
   }
   loginId=role.Substring(0,3)+loginNum;
  }
}
async function updateEmployee(_, { employee }) {
  const result = await Employee.findOneAndUpdate(
    { id: employee.id },
    { $set: employee }
  );
  if (result) {
    return true;
  }
  return false;
}

async function deleteEmployee(_, { id }) {
  const result = await Employee.findOneAndDelete({ id });
  if (result) {
    return true;
  }
  return false;
}

module.exports = {
  viewAllEmployees,
  viewSingleEmployee,
  addNewEmployee,
  updateEmployee,
  deleteEmployee,
};
