import { Drawer, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material'
import React, { useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import BasketItem from './BasketItem/BasketItem'
import ModalAccept from './ModalAccept/ModalAccept'
import ModalChange from './ModalAccept/ModalChange'

export default function DrawerComponent({cartOpen, closeCart }) {

    const order = useSelector(state => state.product.selectedGoods)
    const [showModal, setShowModal] = useState(false);
    const [changeModal, setChangeModal]= useState(false)
    const [cofirmed, setConfirmed] = useState(false);
    const [currentId, setCurrentId] = useState(0);
    const [currentItem, setCurrentItem] = useState(0)

    

        return (
            <>
            <Drawer
                open={cartOpen}
                anchor='right'
                onClose={closeCart}
            >
                <Typography>Basket</Typography>
                <Divider />

                {!order.length ? (
                    <ListItem>Basket empty</ListItem>
                ) : (
                    order.map( item => {
                        return <BasketItem setCurrentItem={setCurrentItem} setChangeModal={setChangeModal} currentId={currentId} setCurrentId={setCurrentId} cofirmed={cofirmed} setConfirmed={setConfirmed} setShowModal={setShowModal} key={item.id}  {...item} />
                    })
                )}
            </Drawer >
            <ModalAccept setCurrentId={setCurrentId} setConfirmed={setConfirmed} setShowModal={setShowModal} showModal={showModal}/>
            {/* <ModalChange setChangeModal={setChangeModal} changeModal={changeModal} currentItem={currentItem}/> */}
            </>
        )
    }
