// import * as React from 'react';
// import Box from '@mui/material/Box';
// import Modal from '@mui/material/Modal';
// import Button from '@mui/material/Button';

// const style = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: 400,
//   bgcolor: 'background.paper',
//   border: '2px solid #000',
//   boxShadow: 24,
//   pt: 2,
//   px: 4,
//   pb: 3,
// };




// return (
  
//       <Modal >
//       <Box
//         sx={style}
//       >
//         <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
//           <LockOutlinedIcon />
//         </Avatar>
//         <Box
//           component="form"
//           onSubmit={handleLoginSubmit}
//           noValidate
//           sx={{ mt: 1 }}
//         >
//           {errors.map((error) => {
//             return (
//               <Alert
//                 key={error}
//                 severity="error"
//                 style={{ marginBottom: "20px" }}
//               >
//                 {error.message}
//               </Alert>
//             );
//           })}
          
//           <TextField
//             margin="normal"
//             required
//             fullWidth
//             label="New Password"
//             name="newPassword"
//             type="newPassword"
//             id="newPassword"
//             autoComplete="current-password"
//           />
//           <Button
//             type="submit"
//             fullWidth
//             variant="contained"
//             sx={{ mt: 3, mb: 2 }}
//           >
            
//           </Button>
//           <Grid container>
//             <Grid item xs>
//               <Link href="#" variant="body2">
//                 Forgot password?
//               </Link>
//             </Grid>
//           </Grid>
//         </Box>
//       </Box>
//     </Modal>
   
// );
// };

// export default ChangePassword;