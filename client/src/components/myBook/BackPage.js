import React from 'react';
import {Row, Col} from 'react-bootstrap';

const BackPage = () => {
    return (
        <Row className='h-100'>
            <Col className='spine container'>
                <Row>
                    <h1 className='auto'>THE END!</h1>
                </Row>
                <Row className='py-3'>
                    <h4 className='auto'>Thank You :)</h4>
                </Row>
            </Col>
            <Col className='spine back-right' />
        </Row>
    )
}

export default BackPage
