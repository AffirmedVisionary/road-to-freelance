import React from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'

const Home = () => {
  return (
    <Container fluid id='desk'>
      <Row>
        <Col lg={11} id='bookSlot'>
          <Row>
            <Col lg={12} id='book' className='book'>
              {/* page 1 cover page */}
              <div id='p1' className='paper flipped'>
                <div className='front'>
                  <div id='f1' className='front-content'>
                    <h1>Front 1</h1>
                  </div>
                </div>
                <div className='back'>
                  <div id='b1' className='back-content'>
                    <h1>Back 1</h1>
                  </div>
                </div>
              </div>
              {/* page 2 */}
              <div id='p2' className='paper'>
                <div className='front'>
                  <div id='f2' className='front-content'>
                    <h1>Front 2</h1>
                  </div>
                </div>
                <div className='back'>
                  <div id='b2' className='back-content'>
                    <h1>Back 2</h1>
                  </div>
                </div>
              </div>
              {/* page 3 */}
              <div id='p3' className='paper'>
                <div className='front'>
                  <div id='f3' className='front-content'>
                    <h1>Front 3</h1>
                  </div>
                </div>
                <div className='back'>
                  <div id='b3' className='back-content'>
                    <h1>Back 3</h1>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          <Row className='pnrow'>
            <Col>
              <Button className='pnbtn' id='prev-btn'>
                Back
              </Button>
              <Button className='pnbtn' id='next-btn'>
                Next
              </Button>
            </Col>
          </Row>
        </Col>
        <Col lg={1} id='months'>
          <Button variant='outline-secondary' className='month'>
            Jan
          </Button>
          <Button variant='outline-secondary' className='month'>
            Feb
          </Button>
          <Button variant='outline-secondary' className='month'>
            Mar
          </Button>
          <Button variant='outline-secondary' className='month'>
            Apr
          </Button>
          <Button variant='outline-secondary' className='month'>
            May
          </Button>
          <Button variant='outline-secondary' className='month'>
            Jun
          </Button>
          <Button variant='outline-secondary' className='month'>
            Jul
          </Button>
          <Button variant='outline-secondary' className='month'>
            Aug
          </Button>
          <Button variant='outline-secondary' className='month'>
            Sep
          </Button>
          <Button variant='outline-secondary' className='month'>
            Oct
          </Button>
          <Button variant='outline-secondary' className='month'>
            Nov
          </Button>
          <Button variant='outline-secondary' className='month'>
            Dec
          </Button>
        </Col>
      </Row>
    </Container>
  )
}

export default Home
