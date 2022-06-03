import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { ClickAwayListener, Grow, IconButton, MenuItem, MenuList, Paper, Popper } from '@mui/material';
import React, { useContext } from 'react';
import { AuthContext } from '../../../store/AuthContext';

interface HeaderBarProps {
    sidebarExpanded: boolean
}



const HeaderBar = (props: HeaderBarProps) => {
    const { sidebarExpanded } = props
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef<HTMLButtonElement>(null);

    const { onLogout } = useContext(AuthContext)


    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event: Event | React.SyntheticEvent) => {
        if (
            anchorRef.current &&
            anchorRef.current.contains(event.target as HTMLElement)
        ) {
            return;
        }
        setOpen(false);
    };


    return (
        <div className={`flex justify-between items-center w-full h-16 m-0 ${sidebarExpanded ? 'ml-56' : 'ml-16'} transition-all duration-200`} >
            <div className="grow" ></div>
            <div>
                <IconButton
                    ref={anchorRef}
                    id="composition-button"
                    aria-controls={open ? 'composition-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-haspopup="true"
                    onClick={handleToggle} >
                    <AccountCircleIcon className="w-8 h-8" />
                </IconButton>
                <Popper
                    open={open}
                    anchorEl={anchorRef.current}
                    role={undefined}
                    placement="bottom-start"
                    transition
                    disablePortal
                >
                    {({ TransitionProps, placement }) => (
                        <Grow
                            {...TransitionProps}
                            style={{
                                transformOrigin:
                                    placement === 'bottom-start' ? 'left top' : 'left bottom',
                            }}
                        >
                            <Paper>
                                <ClickAwayListener onClickAway={handleClose}>
                                    <MenuList
                                        autoFocusItem={open}
                                        id="composition-menu"
                                        aria-labelledby="composition-button"
                                    >
                                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                                        <MenuItem onClick={handleClose}>My account</MenuItem>
                                        <MenuItem onClick={onLogout}>Logout</MenuItem>
                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>
            </div>
        </div>
    )
}

export default HeaderBar
