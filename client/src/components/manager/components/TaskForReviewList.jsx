import React from 'react'
import { useState, useEffect } from 'react';
import { Button, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Card, Avatar, CardHeader } from '@material-ui/core';
//import PROJECT_SAMPLE_DATA from "../../../data/PROJECT_SAMPLE_DATA";
import getAllTasks from '../../../graphql/getAllTasks';
import TaskDetailPopUp from '../../../components/common/TaskDetailPopUp'

const avatars = [1, 2, 3, 4];

export default function TaskForReviewList() {

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const url = "http://localhost:4000/graphql";
    const [task, setTask] = useState([]);
    const [index, setIndex] = useState();
    const [selectedTask, setSelectedTask] = useState(null);


    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        await getAllTasks(url).then((result) => {
            setTask(result.data.getTasks);
        });
    }; // end of loadData

    return (
        <Card>
            <Typography variant="subtitle1" component="body1">
                Tasks waiting for review
            </Typography>


            {task.length > 0 ? (
                <TableContainer>
                    <Table>
                        <TableBody>
                            {task.map((task, count) =>
                                <TableRow hover={true} style={{ fontSize: '4rem' }} key={task.taskNum}
                                    onClick={() => {
                                        setIndex(count);
                                        handleClickOpen();
                                        setSelectedTask(task); // set the clicked task
                                        console.log(count);
                                        // return (
                                        //     <TaskDetailPopUp
                                        //     task={task}
                                        //         handleClose={handleClose}
                                        //         handleClickOpen={handleClickOpen}
                                        //         open={open}
                                        //         index={index}
                                        //     />
                                        // )
                                    }}
                                >
                                    <TableCell component="th" scope="row">
                                        <CardHeader
                                            avatar={<Avatar src={`/assets/images/avatar${count}.png`} key={count} />}
                                            title={`${task.taskEmployee.fname} ${task.taskEmployee.lname}`}
                                        />
                                    </TableCell>
                                    <TableCell>{task.taskName}</TableCell>
                                    <TableCell style={{ textAlign: 'end' }}>
                                        <div
                                            className={`state-btn ${task.taskStatus === 'Todo' ? 'todo-btn' : task.taskStatus === 'In Progress' ? 'doing-btn' : task.taskStatus === 'Done' ? 'done-btn' :
                                                ' in-review-btn'
                                                }`}
                                            disableElevation
                                            variant="contained"
                                        >
                                            {task.taskStatus}

                                        </div>
                                    </TableCell>
                                </TableRow>

                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            ) : (
                <div>No tasks available for review</div>
            )}
            {open && (
      <TaskDetailPopUp
      task={selectedTask}
      handleClose={handleClose}
        handleClickOpen={handleClickOpen}
        open={open}
        index={index}
      />
    )}
        </Card>

    );
}