import { Close } from "@mui/icons-material";
import { IconButton, ListItem, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { removeGoods } from "../../../store/productReducer";
import SettingsIcon from '@mui/icons-material/Settings';

const BasketItem = ({ name, count, size, weight, id, setShowModal, cofirmed, setConfirmed, setCurrentId, currentId, setChangeModal, setCurrentItem }) => {

    const dispatch = useDispatch();


    const remove = () => {
        setConfirmed(false);
        setShowModal(true)
        setCurrentId(id)
    }

    const change =() => {
        setCurrentItem(id)
        setChangeModal(true);
    }

    useEffect(() => {
        if (cofirmed) {
            dispatch(removeGoods(currentId))
            setConfirmed(false)
        }
    }, [cofirmed])



    return (
        <ListItem>
            <Typography
                variant='h5'
            >
                {name}
                <span>quantity of goods: {count}</span> <br />
                <span>size of book: width: {size.width} , height: {size.height}</span> <br />
                <span>Weight of book: {weight}</span>
            </Typography>
            <Box>
                <IconButton
                    onClick={remove}
                >
                    <Close />
                </IconButton>
                <IconButton
                    onClick={change}
                >
                    <SettingsIcon />
                </IconButton>
            </Box>
        </ListItem>
    );
};

export default BasketItem;