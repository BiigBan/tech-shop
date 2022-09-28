import { Button, Grid } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import style from './Card.module.css';

export default function Card({ comments, count, id, imageUrl, name, size, weight, handleOpen, setCurrentIdProduct }) {
    
    const addFunction = () => {
        handleOpen();
        setCurrentIdProduct(id)
    }
    console.log(id);
    return (
        <Grid item xs='2' sm='4' md='4'>
            <div className={style.card}>
                <div className={style.cardTop}>
                    <img src={imageUrl} alt="Book image" />
                </div>
                <div className={style.title}>
                    {name}
                </div>
                <div className={style.buttons}>
                    <Button variant='text' onClick={addFunction}>Add</Button>
                </div>
            </div>
        </Grid>
    )
}
