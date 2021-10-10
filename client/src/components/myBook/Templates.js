import React from 'react';
import {Row, Col} from 'react-bootstrap';



export const AllTextPage = ({page}) => {
    return (
        <Row className='h-100'>
            <Col className='spine cont left'>
                {page.left.title &&
                    <Row className='p-5'>
                        <h3>{page.left.title}</h3>
                    </Row>
                }
                <Row>{page.left.content}</Row>
            </Col>
            <Col className='spine cont'>
                {page.right.title &&
                    <Row className='p-5'>
                        <h3>{page.right.title}</h3>
                    </Row>
                }
                <Row className='px-3'>{page.right.content}</Row>
            </Col>
        </Row>
    )
}

export const MonthlyPage = ({page}) => {
  return (
    <Row className="h-100">
      <Col spine cont left>
        <Row>
          <Col>{page.month}</Col>
          <Col><Calendar month={page.month} /></Col>
        </Row>
        <Row>This will be all the currently data</Row>
      </Col>
    </Row>
  )
}

