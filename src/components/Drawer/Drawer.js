import { Drawer, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, alpha } from '@mui/material'
import React, { useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import BasketItem from './BasketItem/BasketItem'
import ModalAccept from './ModalAccept/ModalAccept'
import ModalChange from './ModalAccept/ModalChange'
import SelectComponent from './Select/Select'

export default function DrawerComponent({ cartOpen, closeCart }) {

    let order = useSelector(state => state.product.selectedGoods)
    const [showModal, setShowModal] = useState(false);
    const [changeModal, setChangeModal] = useState(false)
    const [cofirmed, setConfirmed] = useState(false);
    const [currentId, setCurrentId] = useState(0);
    const [currentItem, setCurrentItem] = useState(0)
    const [sortGoods, setSortGoods] = useState('alphabet')

    const alphabet = () => {
        let alphabet = []
        let res = [];
        order.forEach(el => alphabet.push(el.name))
        alphabet.sort().forEach(name => {
            for (const goods of order) {
                if (name === goods.name) {
                    res.push(goods)
                }
            }
        })
        return res
    }

    const count = () => {
        let count = []
        let res = [];
        order.forEach(el => count.push(el.count))
        count.sort((a, b) => a - b).forEach(count => {
            for (const goods of order) {
                if (count === goods.count) {
                    res.push(goods)
                }
            }
        })
        return res
    }
    
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
                    sortGoods === 'alphabet' ? alphabet().map(item => {
                        return <BasketItem setCurrentItem={setCurrentItem} setChangeModal={setChangeModal} currentId={currentId} setCurrentId={setCurrentId} cofirmed={cofirmed} setConfirmed={setConfirmed} setShowModal={setShowModal} key={item.id}  {...item} />
                    }) : count().map(item => {
                        return <BasketItem setCurrentItem={setCurrentItem} setChangeModal={setChangeModal} currentId={currentId} setCurrentId={setCurrentId} cofirmed={cofirmed} setConfirmed={setConfirmed} setShowModal={setShowModal} key={item.id}  {...item} />
                    })
                )}
                <SelectComponent setSortGoods={setSortGoods} />
            </Drawer >
            <ModalAccept setCurrentId={setCurrentId} setConfirmed={setConfirmed} setShowModal={setShowModal} showModal={showModal} />
            {/* <ModalChange setChangeModal={setChangeModal} changeModal={changeModal} currentItem={currentItem}/> */}
        </>
    )
}
