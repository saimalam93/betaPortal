import TableContainer from "@mui/material/TableContainer";
import { Container } from "@mui/system";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import IconButton from "@mui/material/IconButton";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CancelIcon from '@mui/icons-material/Cancel';



function Request_Table(){
    const data = [
    {
        id :1,
        e_id:12,
        fname: "Denna",
        lname: "Rose",
        description: "abcd"
    },
    {
        id :2,
        e_id:17,
        fname: "Helly",
        lname: "Patel",
        description: "abcd"
    },
    {
        id :3,
        e_id:18,
        fname: "Akshaye",
        lname: "Koothupalakkal Sasidharan",
        description: "abcd"
    }

];

    return(
        <Container maxWidth={false}>
        <h1 align="center">REQUEST FOR APPROVAL</h1>
  
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow style={{ backgroundColor: "#1D7874", color: "white" }}>
              <TableCell style={{ color: "#ffffff" }}>Request ID</TableCell>
                <TableCell style={{ color: "#ffffff" }}>Employee ID</TableCell>
                <TableCell style={{ color: "#ffffff" }}>First Name</TableCell>
                <TableCell style={{ color: "#ffffff" }}>Last Name</TableCell>
                <TableCell style={{ color: "#ffffff" }}>Description</TableCell>
                
                <TableCell style={{ color: "#ffffff" }} align="right">
                  Actions
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            {data.map(emp => {
                return(
                <TableBody>
                    <TableCell>{emp.id}</TableCell>
                    <TableCell>{emp.e_id}</TableCell>
                    <TableCell>{emp.fname}</TableCell>
                    <TableCell>{emp.lname}</TableCell>
                    <TableCell>{emp.description}</TableCell>
                    <TableCell><IconButton aria-label="Approve" size="large">
                      <ThumbUpIcon
                        style={{ fill: "#49be25" }}
                        fontSize="large"
                      />
                    </IconButton>
                   </TableCell>
                   <TableCell><IconButton aria-label="Approve" size="large">
                      <CancelIcon
                        style={{ fill: "#be4d25" }}
                        fontSize="large"
                      />
                    </IconButton>
                   </TableCell>
                </TableBody>)
            })}        
        </Table>
      </TableContainer>
    </Container>
  );    
};

export default Request_Table;