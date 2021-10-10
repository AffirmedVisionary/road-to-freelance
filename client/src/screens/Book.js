import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'

const Book = () => {
  const papers = [
    {
      title: 'page1',
      frontContent: 'Front of Page 1',
      backContent: 'Back of page 1'
    },
    {
      title: 'page2',
      frontContent: 'Front of Page 2',
      backContent: 'Back of page 2'
    },
    {
      title: 'page3',
      frontContent: 'Front of Page 3',
      backContent: 'Back of page 3'
    }
  ]

  const page = papers.map((page, index) => index + 1)

  const [isFlipped, setIsFlipped] = useState()
  const [currentLocation, setCurrentLocation] = useState(1)
  console.log("currentLocation is " + currentLocation)
  const numOfPapers = 3
  const maxLocation = numOfPapers + 1

useEffect((pageNumber) => {
  function currentPage(pageNo) {
    setCurrentLocation(pageNumber)
  }
})

  const openBook = () => {

  }

  const closeBook = () => {}

  const goNextPage = () => {
    if (currentLocation < maxLocation) {
      switch (currentLocation) {
        case 1:
          openBook()
          setIsFlipped(currentLocation)
          break
        case 2:
          setIsFlipped(currentLocation)
          break
        case 3:
          setIsFlipped(currentLocation)
          closeBook()
          break

        default:
          throw new Error("unknown state")
      }
    }
  }

  const goPrevPage = () => {}

  return (
    <div id='book-body'>
      {/* <!-- Previous Button --> */}
      <Button id='prev-btn' onClick={goPrevPage}>
        Back
      </Button>

      {/* <!-- Book --> */}
      <div id='book' className='book'>
        {/* <!-- Papers Array --> */}
      {papers.map((page, index) => {
        console.log("current iteration is " + index)
        console.log("current element is " + page)
        const pageNumber = index + 1

        console.log("current page number is " + pageNumber)
        console.log("\n")

        return (
          <div
            key={index}
            id={`p${ pageNumber }`}
            className={isFlipped ? "flipped paper" : "paper"}
            name={pageNumber}
          >
            <div className='front'>
              <div id={`f${ pageNumber }`} className='front-content'>
                <h1>{page.frontContent}</h1>
              </div>
            </div>
            <div className='back'>
              <div id={`b${ pageNumber }`} className='back-content'>
                <h1>{page.backContent}</h1>
              </div>
            </div>
          </div>
        )
      })}
      </div>

      {/* <!-- Next Button --> */}
      <Button id='next-btn' onClick={goNextPage}>
        Next
      </Button>
    </div>
  )
}

export default Book
