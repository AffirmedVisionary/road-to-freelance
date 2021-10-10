import React from 'react';
import {Row, Col} from 'react-bootstrap';

const FrontPage = () => {
    return (
        <Row className='h-100'>
            <Col className='spine front-left' />
            <Col className='spine container'>
                <Row>
                    <h1 className='auto'>BOOK TITLE</h1>
                </Row>
                <Row className='py-3'>
                    <h5 className='auto'>Author</h5>
                </Row>
            </Col>
        </Row>
    )
}

export default FrontPage
