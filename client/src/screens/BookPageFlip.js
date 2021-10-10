import React, {useRef, useState } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import FlipPage from "react-flip-page";
import FrontPage from '../components/myBook/FrontPage';
import PageComp from '../components/myBook/PageComp';
import {pages} from '../components/myBook/pages';
import BackPage from '../components/myBook/BackPage';
import TableOfContents from '../components/myBook/TableOfContents';

const MyBook = () => {
  const [currentPageState, setCurrentPageState] = useState(null)

  const flipPage = useRef();

  const handleNextClick = () => {
    flipPage.current.incrementPage()
    setCurrentPageState(flipPage.current)
  }

  const handlePrevClick = () => {
    flipPage.current.decrementPage()
    setCurrentPageState(flipPage.current)
  }

  return (
    <Container fluid>
      <Row className='h-100'>
      <Col/>
      <Col lg={8} sm={9} xs={10} className='h-90' >
      <FlipPage
        ref={flipPage}
        className="book3"
        showHint
        uncutPages
        responsive
        orientation="horizontal"
        pageBackground="#D06255"
        animationDuration="400"
      >
        <FrontPage />
        <TableOfContents currentPageState={currentPageState}/>
        {pages.map((page)=> <PageComp page={page} key={page.id}/>)}
        <BackPage/>
      </FlipPage>
      <div className='text-center'>
        <button
          className='m-2 btn btn-sm btn-primary'
          onClick={handlePrevClick}
        >
          Previous Page
        </button>
        <button
          className='m-2 btn btn-sm btn-primary'
          onClick={handleNextClick}
        >
          Next Page
        </button>
      </div>
      </Col>
      <Col/>
      </Row>
    </Container>
  );
}

export default MyBook
