import * as React from 'react';
import { useState } from 'react';
import moment from "moment";

import '../../assets/styles/popup.css'

import { Button, Dialog, DialogTitle, DialogContent, IconButton, Typography } from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import CommentBox from '../manager/components/CommentBox';
import TimerIcon from "@mui/icons-material/Timer";


export default function TaskDetailPopUp({ task, handleClickOpen, handleClose, open, index }) {
	// const [open, setOpen] = useState(false);

	// const handleClickOpen = () => {
	// 	setOpen(true);
	// };
	// const handleClose = () => {
	// 	setOpen(false);
	// };
	return (
		<div>
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
						<div
							className={`state-btn ${task.taskStatus === 'Todo' ? 'todo-btn' : task.taskStatus === 'In Progress' ? 'doing-btn' : task.taskStatus === 'Done' ? 'done-btn' :
								' in-review-btn'
								}`}
							disableElevation
							variant="contained"
						>
							{task.taskStatus}
						</div>
					</div>


					<DialogContent dividers>
						<Typography className='dialog-subtitle'>
							Overview
						</Typography >
						<Typography className='grey-Text'>
							{task.taskDescription}
						</Typography>
						<div className="deadline">
            <span className="alarm-icon">
              <TimerIcon fontSize="20" />
            </span>
            <p className="date-text">
              <span>Deadline:</span>{" "}
              {moment(task.endDate).format("MMM Do YYYY")}
            </p>
          </div>
					</DialogContent >
					<DialogContent >
						<CommentBox />
					</DialogContent>

				</div>
			</Dialog>
		</div>
	);
}


