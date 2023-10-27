import * as React from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import CommentBox from '../manager/components/CommentBox';

import "../../assets/styles/popup.css"

const CustomizedDialogs = ({open,setOpen,title,description}) => {
	
	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div>
			<Dialog
				onClose={handleClose}
				open={open}
				
				className='dialog_modal'
			>
				<div className='close_button'>
				<CloseIcon onClick={handleClose} />
				</div>
				

				<div className='dialog-wrap '>
				<div className='dialog-title-wrap'>
					<DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title" className='titleName'>
					<DoubleArrowIcon className='arrow'/>{title}
					</DialogTitle>
					{/* <Button
						className={`card-state-btn`
						}
						disableElevation
						variant="contained"
						endIcon={<KeyboardArrowDownOutlinedIcon />}
					>
						projectStatus
					</Button> */}
				</div>


				<DialogContent className='content_modal'>
					<Typography className='overview'>Overview
						
					</Typography>
					<Typography className='grey-Text desc-text'
					sx={{paddingTop:'5px'}}>
						{description}
					</Typography>
				</DialogContent>

				{/* <DialogContent >
				<CommentBox />
				</DialogContent> */}

				</div>
			</Dialog>
		</div>
	);
}
export default CustomizedDialogs;

