import React from "react";
import TaskForReviewList from './components/TaskForReviewList';
import AddtaskForm from './components/AddtaskForm';

const ManagerDashboard = () => {
  return <>
  <div style={{display: 'flex',  gap: '3rem'}}>
    <div style={{width:'50%'}}>  <TaskForReviewList /> </div>
    <div style={{width:'50%'}}>  <AddtaskForm /> </div>
  </div>
  </>
};

export default ManagerDashboard;
