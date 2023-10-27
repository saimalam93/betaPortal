import * as React from "react";

import CloseIcon from "@mui/icons-material/Close";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";

import "../../assets/styles/popup.css";

const CustomizedDialogs = ({ open, setOpen, title, description }) => {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog onClose={handleClose} open={open} className="dialog_modal">
        <div className="close_button">
          <CloseIcon onClick={handleClose} />
        </div>

        <div className="dialog-wrap ">
          <div className="dialog-title-wrap">
            <DialogTitle
              sx={{ m: 0, p: 2 }}
              id="customized-dialog-title"
              className="titleName"
            >
              <DoubleArrowIcon className="arrow" />
              {title}
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

          <DialogContent className="content_modal">
            <Typography className="overview">Overview</Typography>
            <Typography
              className="grey-Text desc-text"
              sx={{ paddingTop: "5px" }}
            >
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
};
export default CustomizedDialogs;
