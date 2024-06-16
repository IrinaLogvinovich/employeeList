import { Box, Modal } from "@mui/material";
import { FC, PropsWithChildren } from "react";
import { style } from "./style";

interface PopupProps extends PropsWithChildren {
    status: boolean
    onClose: () => void
}
 
const Popup: FC<PopupProps> = ({children, status, onClose}) => {

    return (
        <div>
            <Modal
                open={status}
                onClose={onClose}
            >
                <Box sx={style}>
                    {children}
                </Box>
            </Modal>
        </div>
    )
}
 
export default Popup;