// import moment from "moment";
// import React, { useEffect, useState } from "react";
// import viewSingleProject from "../graphql/viewSingleProject";
// import { useParams } from "react-router-dom";
// import deleteProject from "../graphql/deleteProject";
// import { useNavigate } from "react-router-dom";
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
// import { Container } from "@mui/system";
// import { Button } from "@mui/material";
// import DeleteIcon from '@mui/icons-material/Delete';
// import Stack from '@mui/material/Stack';
// import NotInterested from '@mui/icons-material/NotInterested';

// const Delete_Project = (props) => {
//     const url = "http://localhost:4000/graphql";
//     const navigate = useNavigate();
//     const [project, setProject] = useState([]);
//     const { _id } = useParams();

//     useEffect(() => {
//         loadData();
//     }, []);

//     const loadData = () => {
//         viewSingleProject(url, { _id }).then((result) => {
//             setProject(result.data.viewSingleProject);
//         });
//     }; // end of loadData

//     const handleChange = (event) => {
//         setProject({ ...project, [event.target.name]: event.target.value });
//     };

//     const submit = (e) => {
//         deleteProject(url, { _id }).then((result) => {

//             setProject(result.data.deleteProject);
//             navigate("/listproject");
//         });
//     };

//     return (
//       <div>
//         <h1 align="center">Delete Project</h1>

//         <Container>
//           <TableContainer component={Paper}>
//             <Table sx={{ minWidth: 650 }} aria-label="simple table">
//               <TableHead>
//                 <TableRow
//                   style={{ backgroundColor: "#1D7874", color: "white" }}
//                 >
//                   <TableCell style={{ color: "#ffffff" }}>
//                     Project Number
//                   </TableCell>
//                   <TableCell style={{ color: "#ffffff" }}>
//                     Project Name
//                   </TableCell>
//                   <TableCell style={{ color: "#ffffff" }}>
//                     Project Type
//                   </TableCell>
//                   <TableCell style={{ color: "#ffffff" }} align="right">
//                     Project Description
//                   </TableCell>
//                   <TableCell style={{ color: "#ffffff" }} align="right">
//                     Project Cost
//                   </TableCell>
//                   <TableCell style={{ color: "#ffffff" }} align="right">
//                     Project Client
//                   </TableCell>
//                   <TableCell style={{ color: "#ffffff" }} align="right">
//                     Project Status
//                   </TableCell>
//                   <TableCell style={{ color: "#ffffff" }} align="right">
//                     Project Manager
//                   </TableCell>
//                   <TableCell style={{ color: "#ffffff" }} align="right">
//                     Project Start Date
//                   </TableCell>

//                   <TableCell style={{ color: "#ffffff" }} align="right">
//                     Project End Date
//                   </TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 <TableRow
//                   key={project._id}
//                   sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
//                 >
                  
//                 <TableCell component="th" scope="row">
//                   {project.projectNumber}
//                 </TableCell>
//                 <TableCell component="th" scope="row">
//                   {project.projectName}
//                 </TableCell>
//                 <TableCell component="th" scope="row">
//                   {project.projectType}
//                 </TableCell>
//                 <TableCell align="right">{project.projectDescription}</TableCell>
//                 <TableCell align="right">{project.projectCost}</TableCell>
//                 <TableCell align="right">{project.projectClient}</TableCell>
//                 <TableCell align="right">{project.projectStatus}</TableCell>
//                 <TableCell align="right">{project.projectManager}</TableCell>
//                 <TableCell align="right">
//                     {moment(project.StartDate).format("DD/MM/YYYY")}
//                 </TableCell>
//                 <TableCell align="right">
//                     {moment(project.EndDate).format("DD/MM/YYYY")}
//                 </TableCell>
//                 </TableRow>
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </Container>
//         <div>
//           <Stack m={2} justifyContent="center" direction="row" spacing={2}>
//             <Button
//               style={{
//                 // borderRadius: 35,
//                 backgroundColor: "#8D021F",
//                 // padding: "18px 36px",
//                 // fontSize: "18px"
//               }}
//               variant="contained"
//               startIcon={<DeleteIcon />}
//               onClick={submit}
//             >
//               Confirm
//             </Button>
//             <Button
//               style={{
//                 // borderRadius: 35,
//                 backgroundColor: "#1D7874",
//                 // padding: "18px 36px",
//                 // fontSize: "18px"
//               }}
//               variant="contained"
//               startIcon={<NotInterested />}
//               onClick={() => {
//                 navigate("/listproject");
//               }}
//             >
//               Cancel
//             </Button>
//           </Stack>
//           {/* </form> */}
//         </div>
//       </div>
//     );
// };




// export default Delete_Project;