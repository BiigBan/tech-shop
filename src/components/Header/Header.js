import { AppBar, Badge, Box, IconButton, Link, Toolbar, Typography } from '@mui/material'
import MenuBookIcon from '@mui/icons-material/MenuBook';
import React from 'react'
import { Container } from '@mui/system';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { useSelector } from 'react-redux';

export default function Header({setOpenedDrawer}) {

    const countGoods = useSelector(state=> state.product.selectedGoods)

    return (
        <Box sx={{ flexGrow: 1, mb: '40px' }}>
            <AppBar position="static">
                <Container>
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            <Link href="/" underline="hover" color='white'>
                                Book shop
                            </Link>
                        </Typography>
                        <IconButton onClick={() => setOpenedDrawer(current => !current)}>
                            <Badge badgeContent={countGoods.length} color="secondary">
                                <ShoppingBasketIcon sx={{ fill: 'white' }} />
                            </Badge>
                        </IconButton>
                    </Toolbar>
                </Container>
            </AppBar>
        </Box >
    )
}
