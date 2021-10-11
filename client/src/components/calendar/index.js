import { format, isSameDay, isSameMonth } from 'date-fns'
import { useState } from 'react'
import { takeMonth } from './calendarGenerator'

const WeekNames = () => {
  function cornerClassNames(i) {
    if (i === 0) return 'rounded-tl-lg'
    if (i === 6) return 'rounded-tr-lg'
  }
  return (
    <div className={'grid grid-cols-7'}>
      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((dayName, i) => (
        <div
          className={`bg-blue-200 h-16 w-16 flex items-center justify-center border border-blue-200 ${cornerClassNames(
            i
          )}`}
        >
          {dayName}
        </div>
      ))}
    </div>
  )
}

const CalendarComponent = () => {
  // selected date is todays date
  const todaysDate = new Date()

  const [selectedDate, setSelectedDate] = useState(todaysDate)
  // first () returns object and the second calls the finction inside
  const data = takeMonth(selectedDate)()

  // if a date on the calendar is not in the same month as todays date. !isSameMonth(day, new Date())
  function dayColor(day) {
    if (!isSameMonth(day, selectedDate)) return 'text-gray-400'
    if (isSameDay(day, selectedDate)) return "bg-pink-400"
  }

  function cornerClassNames(weekIndex, dayIndex) {
    if (weekIndex !== data.length - 1) return
    if (dayIndex === 0) return 'rounded-bl-lg'
    if (dayIndex === 6) return 'rounded-br-lg'
  }

  console.log(data)
  return (
    <>
      {/* <div>Hey its madness</div>
      <div>{JSON.stringify(data)}</div> */}
      <div className={'bg-white box-border m-8 flex w-max'}>
        <div className={'border rounded-md m-8 p-2'}>
        <h1 className={"flex w-full items-center justify-center font-bold text-4xl mb-2"}>{format(selectedDate, "MMMM")} {format(selectedDate, "yyyy")}</h1>
          <WeekNames />
          {data.map((week, wi) => (
            <div className={'grid grid-cols-7'}>
              {week.map((day, di) => (
                <div
                  onClick={() => setSelectedDate(day)}
                  className={`h-16 w-16 flex items-center justify-center border border-blue-200 ${dayColor(
                    day
                  )} ${cornerClassNames(wi, di)}`}
                >
                  {format(day, 'dd')}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default CalendarComponent
