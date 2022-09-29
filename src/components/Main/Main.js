import { Button, Grid } from '@mui/material'
import { Container } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getComments, getProducts } from '../../store/productReducer';
import Card from './Card/Card';
import ModalInfo from './ModalInfo/ModalInfo';

export default function Main() {

    const [currentIdProduct, setCurrentIdProduct] = useState(undefined);
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    };

    const dispatch = useDispatch();
    const product = useSelector(state => state.product.product)
    const status = useSelector(state => state.product.status)


    useEffect(() => {
        dispatch(getProducts('name', 'asc'));
        dispatch(getComments())
    }, [])


    // if (status === 'pending' || status === null) {
    //     return <div>loading</div>
    // }
    // else {
        return (
            <>
                <Container>
                    <Grid container spacing={2}>
                        {product.map(item => {
                            return <Card setCurrentIdProduct={setCurrentIdProduct} handleOpen={handleOpen} key={item.id} {...item} />
                        })}
                    </Grid>
                </Container>
                <ModalInfo setOpen={setOpen} id={currentIdProduct} product={product} open={open}/>
            </>
        )
    // }
}