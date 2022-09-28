import { Button, Modal } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react'

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
export default function ModalAccept({ showModal, setShowModal, setConfirmed, setCurrentId }) {



    const handleClose = () => {
        setShowModal(false);
        setCurrentId(0)
    };

    const confirm = () => {
        setConfirmed(true)
        setShowModal(false);
    }

    if (!showModal) {
        return <></>
    } else {
        return (
            <>
                <Modal
                    open={showModal}
                    aria-labelledby="parent-modal-title"
                    aria-describedby="parent-modal-description"
                    sx={{ overflowY: 'auto' }}
                >
                    <Box sx={{ ...styleMUI, width: 400 }}>
                        <h2 id="parent-modal-title">Remove from cart?
                        </h2>

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
