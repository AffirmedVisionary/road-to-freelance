import React from 'react';
import {Row, Col} from 'react-bootstrap';

const TableOfContents = ({currentPageState}) => {

    const goToPage = (pg) => {
        currentPageState.gotoPage(pg)
    }
    return (
        <Row className='h-100'>
            <Col className='spine left' />
            <Col className='spine'>
                <h4 className='text-center py-5'>TABLE OF CONTENTS</h4>
                <div className='px-5'>
                    <p className='toc' onClick={() => goToPage(2)}>Chapter 1 --------------- 2</p>
                    <p className='toc' onClick={() => goToPage(3)}>Chapter 2 --------------- 3</p>
                    <p className='toc' onClick={() => goToPage(4)}>Chapter 3 --------------- 4</p>
                </div>
            </Col>
        </Row>
    )
}

export default TableOfContents
