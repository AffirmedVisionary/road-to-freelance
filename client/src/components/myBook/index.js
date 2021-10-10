import FlipPage from 'react-flip-page'
import React, { useRef, useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import TableOfContents from './TableOfContents'
import { pages } from './pages'
import PageComponent from './Page'
import BackPage from './BackPage'
import FrontPage from './FrontPage'

const MyBook = () => {
  const [currentPageState, setCurrentPageState] = useState()

  const flipPage = useRef()

  const handleNextClick = () => {
    flipPage.current.incrementPage()
    setCurrentPageState(flipPage.current)
  }

  const handlePrevClick = () => {
    flipPage.current.decrementPage()
    setCurrentPageState(flipPage.current)
  }

  return (
    <Container>
      <Row className='h-100'>
        <Col lg={8} sm={9} xs={10} className='h-90'>
          <FlipPage
            ref={flipPage}
            className='book3'
            uncutPages
            responsive
            flipOnTouch
            disableSwipe
            orientation='horizontal'
            pageBackground='#D06255'
            animationDuration='400'
          >
            <FrontPage />
            <TableOfContents currentPageState={currentPageState} />
            {pages.map((page) => (
              <PageComponent page={page} key={page.id} />
            ))}
            <BackPage />
          </FlipPage>

          <Row>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%'
              }}
            >
              <Button variant='outline-secondary' onClick={handlePrevClick}>Back</Button>
              <Button variant='outline-secondary' onClick={handleNextClick}>Next</Button>
            </div>
          </Row>
        </Col>
      </Row>
    </Container>
  )
}

export default MyBook
