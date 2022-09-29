import { Box, Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { getProducts } from '../../../store/productReducer';

export default function SelectComponent({setSortGoods}) {
    const [search, setSearch] = useState('');


    const handleChange = (event) => {
        setSearch(event.target.value)
    };

    const select = () => {
        search === 'alphabet' ? setSortGoods('alphabet') : setSortGoods('count') 
    }


    return (
        <Box sx={{ minWidth: 120, mb: '40px' }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Search filter</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={search}
                    label="Search filter"
                    onChange={handleChange}
                >
                    <MenuItem value={'alphabet'}>Alphabet</MenuItem>
                    <MenuItem value={'count'}>Count</MenuItem>
                </Select>
                <Button onClick={select}>Select</Button>
            </FormControl>
        </Box>
    );
}
