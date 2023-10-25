import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import CommentBox from './CommentBox';

import '../../../assets/styles/popup.css'

export default function CustomizedDialogs() {
	const [open, setOpen] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div>
			<Button variant="outlined" onClick={handleClickOpen}>
				Open dialog
			</Button>
			<Dialog
				onClose={handleClose}
				open={open}
				sx={{ borderRadius: 16
				 }}
			>
				<IconButton
					aria-label="close"
					onClick={handleClose}
					className='dialog-close'
				>
					<CloseIcon />
				</IconButton>

				<div className='dialog-wrap'>
				<div className='dialog-title-wrap'>
					<DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
						Project title
					</DialogTitle>
					<Button
						className={`card-state-btn`
						}
						disableElevation
						variant="contained"
						endIcon={<KeyboardArrowDownOutlinedIcon />}
					>
						projectStatus
					</Button>
				</div>


				<DialogContent dividers>
					<Typography >
						Overview
					</Typography>
					<Typography className='grey-Text'
					sx={{paddingTop:'5px'}}>
						Project detail:Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
					</Typography>
				</DialogContent>

				<CommentBox />
				</div>
			</Dialog>
		</div>
	);
}


