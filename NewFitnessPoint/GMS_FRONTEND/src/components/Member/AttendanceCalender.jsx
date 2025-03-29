import { useState, useEffect } from "react"
import Calendar from "react-calendar"
import "react-calendar/dist/Calendar.css"
import "../../css/AttendanceCalendar.css" // Add custom styles

const AttendanceCalendar = () => {
  const [attendanceData, setAttendanceData] = useState([])
  const [joiningDate, setJoiningDate] = useState(null)
  const [subscriptionEndDate, setSubscriptionEndDate] = useState(null)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const memberId = sessionStorage.getItem("userId")

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/attendance/${memberId}/`)
        if (!response.ok) {
          throw new Error("Failed to fetch attendance data")
        }
        const data = await response.json()

        // Keep attendance data as is - with date strings in YYYY-MM-DD format
        setAttendanceData(data.attendance)

        // Force dates to be interpreted in local timezone without time component
        setJoiningDate(new Date(data.joining_date + "T00:00:00"))
        setSubscriptionEndDate(new Date(data.subscription_end_date + "T00:00:00"))
      } catch (error) {
        console.error("Error fetching attendance:", error)
      }
    }

    fetchAttendance()
  }, [memberId])

  // This is the key fix - format date consistently without timezone issues
  const formatDateToYYYYMMDD = (date) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const day = String(date.getDate()).padStart(2, "0")
    return `${year}-${month}-${day}`
  }

  const tileClassName = ({ date }) => {
    // Use our consistent date formatter instead of ISO string
    const dateStr = formatDateToYYYYMMDD(date)
    const record = attendanceData.find((att) => att.date === dateStr)

    if (record) {
      return record.attendance.toLowerCase() === "present" ? "present-day" : "absent-day"
    }

    return ""
  }

  return (
    <div className="calendar-container">
      <h3>Attendance Calendar</h3>
      {joiningDate && subscriptionEndDate ? (
        <Calendar
          onChange={setSelectedDate}
          value={selectedDate}
          minDate={joiningDate}
          maxDate={subscriptionEndDate}
          tileClassName={tileClassName}
        />
      ) : (
        <p>Loading calendar...</p>
      )}
    </div>
  )
}

export default AttendanceCalendar

