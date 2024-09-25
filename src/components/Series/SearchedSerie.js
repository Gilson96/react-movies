import React from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'

const SearchedMovie = ({ onOpen, isOpen, onClose, children }) => {

    return (
        <div>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                size={'xl'}
                scrollBehavior='inside'
            >
                <ModalOverlay />
                <ModalContent height={'100%'} width={'100%'}>
                    <ModalCloseButton />
                    <ModalBody className='w-full h-full bg-background rounded'>
                        {children}
                    </ModalBody>
                </ModalContent>
            </Modal>
        </div>
    )
}

export default SearchedMovie