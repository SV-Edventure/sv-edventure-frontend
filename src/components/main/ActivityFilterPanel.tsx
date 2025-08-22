import React, { useState } from 'react'
import {
  Search,
  ChevronDown,
  ChevronUp,
  Users,
  ChevronLeft,
  ChevronRight,
  Clock,
} from 'lucide-react'

// ===== Exported shared types =====
export type AgeRange = { min: number; max: number | null }
export type PanelFilters = {
  date?: string
  age: AgeRange | null
  time?: string
}

// ===== Internal types =====
type DateOptionId = 'all' | 'today' | 'tomorrow' | 'weekend'

interface DateOption {
  id: DateOptionId
  name: string
  subtext: string
}

interface AgeOption {
  id: string
  name: string
  min: number | null
  max: number | null
}

interface FilterPanelProps {
  onFilter: (filters: PanelFilters) => void
}

export const ActivityFilterPanel = ({ onFilter }: FilterPanelProps) => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)
  const [selectedDate, setSelectedDate] = useState<string>('')
  const [selectedCalendarDate, setSelectedCalendarDate] = useState<string>('')
  const [selectedAge, setSelectedAge] = useState<string>('')
  const [selectedTime, setSelectedTime] = useState<number>(12)

  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())
  const [selectedDay, setSelectedDay] = useState<number | null>(null)

  const dates: DateOption[] = [
    { id: 'all', name: '전체', subtext: '모든 날짜' },
    { id: 'today', name: '오늘', subtext: `${currentMonth + 1}월 ${new Date().getDate()}일` },
    { id: 'tomorrow', name: '내일', subtext: `${currentMonth + 1}월 ${new Date().getDate() + 1}일` },
    { id: 'weekend', name: '이번 주말', subtext: `${currentMonth + 1}월 ${getWeekendDates()}` },
  ]

  function getWeekendDates(): string {
    const today = new Date()
    const dayOfWeek = today.getDay()
    const daysUntilFriday = dayOfWeek <= 5 ? 5 - dayOfWeek : 5 + 7 - dayOfWeek
    const friday = new Date(today)
    friday.setDate(today.getDate() + daysUntilFriday)
    const daysUntilSunday = dayOfWeek <= 0 ? 0 - dayOfWeek : 7 - dayOfWeek
    const sunday = new Date(today)
    sunday.setDate(today.getDate() + daysUntilSunday)
    return `${friday.getDate()}일~${sunday.getDate()}일`
  }

  const ageGroups: AgeOption[] = [
    { id: 'age-0-3', name: '0-3세', min: 0, max: 3 },
    { id: 'age-4-6', name: '4-6세', min: 4, max: 6 },
    { id: 'age-7-9', name: '7-9세', min: 7, max: 9 },
    { id: 'age-10-12', name: '10-12세', min: 10, max: 12 },
    { id: 'age-all', name: 'All', min: null, max: null },
  ]

  const toggleCategory = (categoryId: string): void => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId)
  }

  const handleSearch = (): void => {
    const selectedGroup = ageGroups.find((a) => a.id === selectedAge)
    const ageFilter: AgeRange | null = selectedGroup && selectedGroup.min !== null
      ? { min: selectedGroup.min, max: selectedGroup.max }
      : null

    const dateVal = selectedDate === 'all' ? undefined : (selectedDate || selectedCalendarDate || undefined)

    onFilter({
      date: dateVal,
      age: ageFilter,
      time: formatTime(selectedTime),
    })
  }

  const handleCalendarDateChange = (day: number): void => {
    setSelectedDay(day)
    const selectedDateObj = new Date(currentYear, currentMonth, day)
    setSelectedCalendarDate(selectedDateObj.toISOString().split('T')[0])
    setSelectedDate('')
  }

  const changeMonth = (increment: number): void => {
    let newMonth = currentMonth + increment
    let newYear = currentYear
    if (newMonth > 11) {
      newMonth = 0
      newYear++
    } else if (newMonth < 0) {
      newMonth = 11
      newYear--
    }
    setCurrentMonth(newMonth)
    setCurrentYear(newYear)
  }

  const formatTime = (hourValue: number): string => {
    const hour = Math.floor(hourValue)
    const minute = Math.round((hourValue - hour) * 60)
    let hourDisplay = hour
    const period = hour >= 12 ? 'PM' : 'AM'
    if (hourDisplay > 12) hourDisplay -= 12
    if (hourDisplay === 0) hourDisplay = 12
    const minuteDisplay = minute < 10 ? `0${minute}` : String(minute)
    return `${hourDisplay}:${minuteDisplay} ${period}`
  }

  const generateCalendarGrid = (): React.ReactNode[] => {
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay()
    const calendarDays: React.ReactNode[] = []
    for (let i = 0; i < firstDayOfMonth; i++) {
      calendarDays.push(<div key={`empty-${i}`} className="h-12 w-12"></div>)
    }
    for (let day = 1; day <= daysInMonth; day++) {
      const isSelected = selectedDay === day
      calendarDays.push(
        <button
          key={`day-${day}`}
          onClick={() => handleCalendarDateChange(day)}
          className={`h-12 w-12 rounded-full flex items-center justify-center ${isSelected ? 'bg-black text-white' : 'hover:bg-gray-100'}`}
        >
          {day}
        </button>,
      )
    }
    return calendarDays
  }

  const monthNames = ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월']
  const dayNames = ['일', '월', '화', '수', '목', '금', '토']

  return (
    <div className="w-full md:w-3/4 mx-auto bg-white rounded-lg shadow-sm flex items-stretch my-3">
      {/* Date Section */}
      <div className="flex-1 py-2 px-3 border-r border-gray-200">
        <h3 className="text-gray-500 text-xs mb-0.5">Date</h3>
        <div className="relative">
          <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleCategory('date')}>
            <span className="text-sm font-medium truncate max-w-[120px]">
              {selectedCalendarDate
                ? new Date(selectedCalendarDate).toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' })
                : selectedDate
                  ? dates.find((d) => d.id === selectedDate)?.name
                  : 'Select Date'}
              {selectedTime ? ` • ${formatTime(selectedTime)}` : ''}
            </span>
            {expandedCategory === 'date' ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </div>
          {expandedCategory === 'date' && (
            <div className="absolute top-full left-0 mt-1 bg-white rounded-lg shadow-lg z-10 w-[600px] p-3">
              <div className="flex gap-6">
                {/* Quick selection options */}
                <div className="w-[180px]">
                  {dates.map((date) => (
                    <div
                      key={date.id}
                      className={`p-3 border border-gray-200 rounded-lg mb-2 cursor-pointer ${selectedDate === date.id ? 'border-black' : ''}`}
                      onClick={() => { setSelectedDate(date.id); setSelectedCalendarDate(''); setSelectedDay(null) }}
                    >
                      <div className="font-medium text-sm">{date.name}</div>
                      <div className="text-gray-500 text-xs">{date.subtext}</div>
                    </div>
                  ))}
                </div>
                {/* Calendar */}
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-3">
                    <button onClick={() => changeMonth(-1)} className="p-1"><ChevronLeft size={18} /></button>
                    <h2 className="text-sm font-semibold">{currentYear}년 {monthNames[currentMonth]}</h2>
                    <button onClick={() => changeMonth(1)} className="p-1"><ChevronRight size={18} /></button>
                  </div>
                  <div className="grid grid-cols-7 gap-1 mb-1">
                    {dayNames.map((day, index) => (
                      <div key={`day-name-${index}`} className="h-8 flex items-center justify-center font-medium text-xs">{day}</div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-1">{generateCalendarGrid()}</div>
                  <div className="mt-6 border-t pt-4">
                    <div className="flex items-center mb-3">
                      <Clock size={16} className="text-gray-500 mr-2" />
                      <h3 className="text-sm font-medium">Time: {formatTime(selectedTime)}</h3>
                    </div>
                    <div className="px-2">
                      <input
                        type="range"
                        min="0"
                        max="24"
                        step="0.5"
                        value={selectedTime}
                        onChange={(e) => setSelectedTime(parseFloat(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>12 AM</span><span>6 AM</span><span>12 PM</span><span>6 PM</span><span>12 AM</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Age Section */}
      <div className="flex-1 py-2 px-3">
        <h3 className="text-gray-500 text-xs mb-0.5">Age</h3>
        <div className="relative">
          <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleCategory('age')}>
            <span className="text-sm font-medium truncate max-w-[120px]">
              {selectedAge ? ageGroups.find((a) => a.id === selectedAge)?.name : 'All'}
            </span>
            {expandedCategory === 'age' ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </div>
          {expandedCategory === 'age' && (
            <div className="absolute top-full left-0 mt-1 bg-white rounded-lg shadow-lg z-10 w-56 p-3">
              <div className="flex items-center mb-2">
                <Users size={14} className="mr-1.5 text-gray-500" />
                <span className="font-medium text-sm">연령대 선택</span>
              </div>
              <div className="space-y-1.5">
                {ageGroups.map((age) => (
                  <div key={age.id} className="flex items-center">
                    <input
                      type="radio"
                      id={age.id}
                      name="age"
                      checked={selectedAge === age.id}
                      onChange={() => setSelectedAge(age.id)}
                      className="mr-1.5"
                    />
                    <label htmlFor={age.id} className="text-xs cursor-pointer">{age.name}</label>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Search Button */}
      <button
        className="bg-red-500 hover:bg-red-600 text-white rounded-full w-10 h-10 flex items-center justify-center ml-2 my-auto mr-2 transition-colors"
        onClick={handleSearch}
        aria-label="Search"
      >
        <Search size={16} />
      </button>
    </div>
  )
}
