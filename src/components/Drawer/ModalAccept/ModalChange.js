import { Box, Button, Modal, TextField } from '@mui/material';
import { Stack } from '@mui/system';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {changeBooksAC } from '../../../store/productReducer';


const styleMUI = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'white',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

export default function ModalChange({ changeModal,setChangeModal, currentItem }) {

    const [name,setName] = useState('');
    const [width,setWidth] = useState(0);
    const [height,setHeight] = useState(0);
    const [weight,setWeight] = useState(0);


    const currentUserChange = useSelector(state => state.product.selectedGoods)
    const [imageUrl, setImageUrl] = useState('');
    const [count, setCount] = useState(0);
    const [comments, setComments] = useState([])

    useEffect(()=>{
    currentUserChange.map(el => {
        if(el.id === currentItem){
            setImageUrl(el.imageUrl)
            setCount(el.count);
            setComments(el.c)
        }
    })
}, [changeModal])

    const dispatch = useDispatch();


    const handleClose = () => {
        setChangeModal(false);
    };

    const confirm = () => {
        dispatch(changeBooksAC(currentItem,imageUrl,name,count,width,height,weight))
        setChangeModal(false);
    }


    if (!changeModal) {
        return <></>
    } else {
        return (
            <>
                <Modal
                    open={changeModal}
                    aria-labelledby="parent-modal-title"
                    aria-describedby="parent-modal-description"
                    sx={{ overflowY: 'auto' }}
                >
                    <Box sx={{ ...styleMUI, width: 400 }}>
                        <h2 id="parent-modal-title">Change product details
                        </h2>
                        <Stack
                            component="form"
                            sx={{
                                width: '25ch',
                            }}
                            spacing={2}
                            noValidate
                            autoComplete="off"
                        >
                            <TextField
                                hiddenLabel
                                id="filled-hidden-label-small"
                                defaultValue="Name"
                                variant="filled"
                                size="small"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            Size:
                            <br/>
                            Width
                            <TextField
                                hiddenLabel
                                id="filled-hidden-label-small"
                                defaultValue="width"
                                variant="filled"
                                size="small"
                                type='number'
                                value={width}
                                onChange={(e) => setWidth(e.target.value)}
                            />
                            Height
                            <TextField
                                hiddenLabel
                                id="filled-hidden-label-small"
                                defaultValue="height"
                                variant="filled"
                                size="small"
                                type='number'
                                value={height}
                                onChange={(e) => setHeight(e.target.value)}
                            />
                            Weight
                            <TextField
                                hiddenLabel
                                id="filled-hidden-label-small"
                                defaultValue="weight"
                                variant="filled"
                                size="small"
                                type='number'
                                value={weight}
                                onChange={(e) => setWeight(e.target.value)}
                            />
                        </Stack>

                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Button variant='text' onClick={confirm}>Confirm</Button>
                            <Button variant='text' onClick={handleClose}>Cancel</Button>
                        </Box>

                    </Box>
                </Modal>
            </>
        );
    }
}