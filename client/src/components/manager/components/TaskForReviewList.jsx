import {React,useState, useEffect} from 'react';
import { Button, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Card, Avatar, CardHeader } from '@material-ui/core';
// import viewAllProjects from "../../../graphql/viewAllProjects";
import PROJECT_SAMPLE_DATA from "../../../data/PROJECT_SAMPLE_DATA";


const avatars = [1, 2, 3, 4];

export default function TaskForReviewList() {

    const url = "https://betaportal-saimalam.onrender.com/graphql";
    const [projects, setProjects] = useState([]);

    let filters = {projectStatus: "In-review"};

    useEffect(() => {
    //   loadData(filters);
        setProjects(PROJECT_SAMPLE_DATA);
    }, []);

    // const loadData = (filters) => {
    //   viewAllProjects(url, filters).then((result) => {
    //     setProjects(result.data.viewAllProjects);
    //   });
    // }; // end of loadData


    console.log(projects);

    return (
        <Card>
            <Typography variant="subtitle1" component="body1"> Tasks waiting for review</Typography>
            {projects.length > 0 ? (
                 <TableContainer>
                <Table >
                    <TableBody>
                        {projects.map((project, count) => (
                            <TableRow hover={true} style={{ fontSize: '4rem' }} key={project.projectNum}>
                                <TableCell component="th" scope="row">
                                    <CardHeader
                                        avatar={
                                            <Avatar
                                                src={`/assets/images/avatar${count}.png`} key={count}
                                            />
                                        }
                                        title={project.projectManager ? `${project.projectManager.fname} ${project.projectManager.lname}` : `${project.projectClient}`}                                    />
                                </TableCell>
                                <TableCell >{project.projectName}</TableCell>
                                <TableCell>
                                    <Button className=
                                    {`state-btn ${project.projectStatus === 'Todo' ? 'todo-btn' : (project.projectStatus === 'Doing' ? 'doing-btn' : 'done-btn')}`}
                                        disableElevation variant="contained"
                                    >{project.projectStatus}</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
                    ) : (
                        <div>No tasks available for review</div>
                        )}
        </Card>

    );
}