import React, {useState} from 'react';
import {Badge, IconButton, Menu, Typography} from "@mui/material";
import MailIcon from '@mui/icons-material/Mail';
import moment from "moment";
import styles from './NotificationBell.module.scss'

interface IMessage {
    id: string,
    sendDate: Date,
    text: string
}

const mockMessages: IMessage[] = [{
    text: 'check your email',
    id: '1',
    sendDate: moment().subtract(2, 'hours').toDate()
}, {
    text: 'We are pleased to welcome you to our platform. You can watch the video guide',
    id: '2',
    sendDate: moment().subtract(2, 'days').toDate()
}]


export const NotificationBell = () => {

    const [anchorElNotification, setAnchorElNotification] = useState<null | HTMLElement>(null);

    const handleOpenNotificationMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNotification(event.currentTarget);
    };

    const handleCloseNotificationMenu = () => {
        setAnchorElNotification(null);
    }
    return (
        <div>
            <IconButton onClick={handleOpenNotificationMenu}>
                <Badge badgeContent={mockMessages.length} color="secondary">
                    <MailIcon/>
                </Badge>
            </IconButton>
            <Menu
                sx={{mt: '45px'}}
                id="menu-appbar"
                anchorEl={anchorElNotification}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}

                open={Boolean(anchorElNotification)}
                onClose={handleCloseNotificationMenu}
            >
                <div className={styles.menuContainer}>
                    {mockMessages.map((message) => {
                        return (<button className={styles.menuItemContainer} key={message.id}
                                        onClick={handleCloseNotificationMenu}>
                                <Typography className={styles.menuItemMessage}
                                            textAlign="center">{message.text}</Typography>
                                <Typography className={styles.menuItemMessage}
                                            textAlign="center">{moment(message.sendDate).fromNow()}</Typography>
                            </button>
                        )

                    })}
                </div>
            </Menu>
        </div>

    );
};
