import { Box, Button, Divider, Modal, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { postMessage, selectGoods } from '../../../store/productReducer';
import Comment from './Comment/Comment';
import style from './ModalInfo.module.css'

const styleMUI = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};


export default function ModalInfo({ open, setOpen, id, product }) {
    const [text, setText] = useState('');
    const [productSelector, setProductSelector] = useState(useSelector(state => state.product))

    const messgaeLength = useSelector(state => state.product.product.lengthOfMessage)
    const dispatch = useDispatch();

    const addComment = (event) => {
        setText(event.target.value)
    }


    const handleClose = () => {
        setOpen(false);
    };

    const confirmed = (product) => {
        product.forEach(el => {
            if(el.id === id) dispatch(selectGoods(el))
        })
        setOpen(false);
    }

    const sendComment = (event) => {
        if (event.key === 'Enter') {
            let currentMessage = product[id - 1].comments;
            console.log(product[id - 1].comments);
            let date = new Date;
            let currentHours = date.toLocaleTimeString();
            let currentDate = date.toLocaleDateString()
            dispatch(postMessage((messgaeLength + 1), product[id - 1].id, text, `${currentHours} ${currentDate}`))
            setText('')
        }
    }


    if (id === undefined) {
        return <></>
    } else {
        return (
            <>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="parent-modal-title"
                    aria-describedby="parent-modal-description"
                    sx={{ overflowY: 'auto' }}
                >
                    <Box sx={{ ...styleMUI, width: 400 }}>
                        <div className={style.imageBody}>
                            <img src={product[id - 1].imageUrl} alt="" />
                        </div>
                        <h2 id="parent-modal-title">{product[id - 1].name}</h2>
                        <p id="parent-modal-description">
                            <span>quantity of goods: {product[id - 1].count}</span> <br />
                            <span>size of book: width: {product[id - 1].size.width} , height: {product[id - 1].size.height}</span> <br />
                            <span>Weight of book: {product[id - 1].weight}</span>
                        </p>
                        <Divider />
                        <div>
                            <Typography variant='h5'>Comments</Typography>
                            <div className={style.comment}>
                                {product[id - 1].comments.map(item => {
                                    return <Comment key={product.id} {...item} />
                                })}
                                {/* {product[id-1].comments.map(item => <Comment key={product.id} {...item}/>)} */}
                            </div>
                        </div>
                        <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                            <Button variant='text' onClick={() => confirmed(product)}>Confirm</Button>
                            <Button variant='text' onClick={handleClose}>Cancel</Button>
                        </Box>
                        <Divider sx={{ mb: '20px' }} />
                        <Box>
                            <TextField onKeyUp={sendComment} onChange={addComment} value={text} fullWidth label="Add comment" id="fullWidth" />
                        </Box>
                        
                    </Box>
                </Modal>
            </>
        );
    }
}