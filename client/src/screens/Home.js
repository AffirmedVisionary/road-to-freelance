import React from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import MyBook from '../components/myBook'

const Home = () => {
  return (
    <Container fluid id='desk'>
      <Row>
        <Col lg={11} id='bookSlot'>
          <MyBook />
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
