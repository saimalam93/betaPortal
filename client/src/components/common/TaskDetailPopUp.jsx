import * as React from 'react';
import { useState } from 'react';
import '../../assets/styles/popup.css'

import { Button, Dialog, DialogTitle, DialogContent, IconButton, Typography } from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import CommentBox from '../manager/components/CommentBox';

export default function TaskDetailPopUp({ task, handleClickOpen, handleClose, open, index }) {
	// const [open, setOpen] = useState(false);

	// const handleClickOpen = () => {
	// 	setOpen(true);
	// };
	// const handleClose = () => {
	// 	setOpen(false);
	// };
	console.log(task)
	return (
		<div>
			<MoreHorizIcon onClick={handleClickOpen} />
			<Dialog
				onClose={handleClose}
				open={open}
				sx={{
					borderRadius: 16,
				}}
				className='opendDialog'
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
							{task.taskName}
						</DialogTitle>
						<Button
							className={`state-btn ${task.taskStatus === 'Todo' ? 'todo-btn' : task.taskStatus === 'In Progress' ? 'doing-btn' : task.taskStatus === 'Done' ? 'done-btn' :
								' in-review-btn'
								}`}
							disableElevation
							variant="contained"
						>
							{task.taskStatus}
						</Button>
					</div>


					<DialogContent dividers>
						<Typography >
							Overview
						</Typography>
						<Typography className='grey-Text'
							sx={{ paddingTop: '5px' }}>
							{task.taskDescription}
						</Typography>
					</DialogContent>

					<DialogContent >
						<CommentBox />
					</DialogContent>

				</div>
			</Dialog>
		</div>
	);
}


