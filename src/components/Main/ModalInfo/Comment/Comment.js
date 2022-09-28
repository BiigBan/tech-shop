import { IconButton, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect } from 'react'
import PersonIcon from '@mui/icons-material/Person';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from 'react-redux';
import { deleteMessage, getComments } from '../../../../store/productReducer';

export default function Comment({ date, description, id, productId }) {

    const dispatch = useDispatch();

    const deleteMessageFun = (id, productId) => {
        dispatch(deleteMessage(id, productId));
    }

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <PersonIcon />
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography p component='body1'>{description}</Typography>
                <Typography p component='span'>{date}</Typography>
            </Box>
            <IconButton onClick={() => deleteMessageFun(id, productId)}>
                <DeleteIcon />
            </IconButton>
        </Box>
    )
}
