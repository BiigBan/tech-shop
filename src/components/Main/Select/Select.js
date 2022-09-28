import { Box, Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { getProducts } from '../../../store/productReducer';

export default function SelectComponent() {
    const [search, setSearch] = useState('');

    const dispatch = useDispatch()

    const handleChange = (event) => {
        setSearch(event.target.value)
    };

    const select = () => {
        dispatch(getProducts(search))
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
                    <MenuItem value={'name'}>Alphabet</MenuItem>
                    <MenuItem value={'count'}>Count</MenuItem>
                </Select>
                <Button onClick={select}>Select</Button>
            </FormControl>
        </Box>
    );
}
