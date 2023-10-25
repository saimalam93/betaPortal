import { React, useState, useEffect } from 'react';
import { Button, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Card, Avatar, CardHeader } from '@material-ui/core';
// import viewAllProjects from "../../../graphql/viewAllProjects";
import PROJECT_SAMPLE_DATA from "../../../data/PROJECT_SAMPLE_DATA";
import getAllTasks from '../../../graphql/getAllTasks';

const avatars = [1, 2, 3, 4];

export default function TaskForReviewList() {

    const url = "http://localhost:4000/graphql";
    const [task, setTask] = useState([]);

    useEffect(() => {
        loadData();
        setTask(PROJECT_SAMPLE_DATA);
    }, []);

    const loadData = (filters) => {
        getAllTasks(url).then((result) => {
            console.log(result);
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
                                task.taskStatus === "In-review" ? (
                                    <TableRow hover={true} style={{ fontSize: '4rem' }} key={task.taskNum}>
                                        <TableCell component="th" scope="row">
                                            <CardHeader
                                                avatar={<Avatar src={`/assets/images/avatar${count}.png`} key={count} />}
                                                title={task.taskManager ? `${task.taskManager.fname} ${task.taskManager.lname}` : `${task.taskClient}`}
                                            />
                                        </TableCell>
                                        <TableCell>{task.taskName}</TableCell>
                                        <TableCell style={{ textAlign: 'end'}}>
                                            <Button
                                                className="state-btn in-review-btn"
                                                disableElevation
                                                variant="contained"
                                            >
                                                Show detail
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    null)
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            ) : (
                <div>No tasks available for review</div>
            )}
        </Card>

    );
}