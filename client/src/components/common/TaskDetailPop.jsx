import * as React from 'react';
import { useState } from 'react';
import '../../assets/styles/popup.css'

import { Button, Dialog, DialogTitle, DialogContent, IconButton, Typography } from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import DeleteIcon from '@mui/icons-material/Delete';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import CommentBox from '../manager/components/CommentBox';

export default function TaskDetailPop({task, key}) {
	const [open, setOpen] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};



		const deletebtn = () => {
			console.log('Deleting item with ID:', key);
		};

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
						{/* {task[key].taskName} */}
						</DialogTitle>
						<Button
							className={`card-state-btn`
							}
							disableElevation
							variant="contained"
						>

							Task status
						</Button>
					</div>


					<DialogContent dividers>
						<Typography >
							Overview
						</Typography>
						<Typography className='grey-Text'
							sx={{ paddingTop: '5px' }}>
							task.description
						</Typography>
					</DialogContent>

					<DialogContent >
						<CommentBox />
					</DialogContent>

				</div>
				<Button variant="outlined" endIcon={<DeleteIcon />} onClick={() => deletebtn(key)}>
					Delete task
				</Button>

			</Dialog>
		</div>
	);
}


