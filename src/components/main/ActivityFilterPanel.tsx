import React, { useState } from 'react';
import { Search, ChevronDown, ChevronUp, Calendar, Users, ChevronLeft, ChevronRight } from 'lucide-react';

type Filters = {
    date?: string;
    age?: string;
};

interface FilterPanelProps {
    onFilter: (filters: Filters) => void;
}

export default function ActivityFilterPanel({
    onFilter
}: FilterPanelProps) {
    const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
    const [selectedDate, setSelectedDate] = useState<string>('');
    const [selectedCalendarDate, setSelectedCalendarDate] = useState<string>('');
    const [selectedAge, setSelectedAge] = useState<string>('');
    // Calendar state
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const [selectedDay, setSelectedDay] = useState<number | null>(null);
    const dates = [{
        id: 'today',
        name: '오늘',
        subtext: `${currentMonth + 1}월 ${new Date().getDate()}일`
    }, {
        id: 'tomorrow',
        name: '내일',
        subtext: `${currentMonth + 1}월 ${new Date().getDate() + 1}일`
    }, {
        id: 'weekend',
        name: '이번 주말',
        subtext: `${currentMonth + 1}월 ${getWeekendDates()}`
    }];
    function getWeekendDates() {
        const today = new Date();
        const dayOfWeek = today.getDay(); // 0 is Sunday, 6 is Saturday
        // Calculate days until next Friday
        const daysUntilFriday = dayOfWeek <= 5 ? 5 - dayOfWeek : 5 + 7 - dayOfWeek;
        const friday = new Date(today);
        friday.setDate(today.getDate() + daysUntilFriday);
        // Calculate days until next Sunday
        const daysUntilSunday = dayOfWeek <= 0 ? 0 - dayOfWeek : 7 - dayOfWeek;
        const sunday = new Date(today);
        sunday.setDate(today.getDate() + daysUntilSunday);
        return `${friday.getDate()}일~${sunday.getDate()}일`;
    }
    const ageGroups = [{
        id: 'age-6-8',
        name: '0-3'
    }, {
        id: 'age-9-11',
        name: '4-6'
    }, {
        id: 'age-12-14',
        name: '7-9세'
    }, {
        id: 'age-12-14',
        name: '10-12세'
    }, {
        id: 'age-12-14',
        name: 'All'
    }];
    const toggleCategory = (categoryId: string) => {
        setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
    };
    const handleSearch = () => {
        onFilter({
            date: selectedDate || selectedCalendarDate,
            age: selectedAge
        });
    };
    const handleCalendarDateChange = (day: number) => {
        setSelectedDay(day);
        const selectedDate = new Date(currentYear, currentMonth, day);
        setSelectedCalendarDate(selectedDate.toISOString().split('T')[0]);
        setSelectedDate(''); // Clear predefined date options when calendar date is selected
    };
    const changeMonth = (increment: number) => {
        let newMonth = currentMonth + increment;
        let newYear = currentYear;
        if (newMonth > 11) {
            newMonth = 0;
            newYear++;
        } else if (newMonth < 0) {
            newMonth = 11;
            newYear--;
        }
        setCurrentMonth(newMonth);
        setCurrentYear(newYear);
    };
    // Generate calendar days grid
    const generateCalendarGrid = () => {
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
        const calendarDays = [];
        // Add empty cells for days before the first day of the month
        for (let i = 0; i < firstDayOfMonth; i++) {
            calendarDays.push(<div key={`empty-${i}`} className="h-12 w-12"></div>);
        }
        // Add cells for each day of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const isSelected = selectedDay === day;
            calendarDays.push(<button key={`day-${day}`} onClick={() => handleCalendarDateChange(day)} className={`h-12 w-12 rounded-full flex items-center justify-center ${isSelected ? 'bg-black text-white' : 'hover:bg-gray-100'}`}>
                {day}
            </button>);
        }
        return calendarDays;
    };
    const monthNames = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];
    const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
    return <div className="w-full md:w-3/4 mx-auto bg-white rounded-lg shadow-sm flex items-stretch my-3">
        {/* Date Section */}
        <div className="flex-1 py-2 px-3 border-r border-gray-200">
            <h3 className="text-gray-500 text-xs mb-0.5">Date</h3>
            <div className="relative">
                <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleCategory('date')}>
                    <span className="text-sm font-medium truncate max-w-[120px]">
                        {selectedCalendarDate ? new Date(selectedCalendarDate).toLocaleDateString('ko-KR', {
                            month: 'short',
                            day: 'numeric'
                        }) : selectedDate ? dates.find(d => d.id === selectedDate)?.name : 'Select Date'}
                    </span>
                    {expandedCategory === 'date' ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </div>
                {expandedCategory === 'date' && <div className="absolute top-full left-0 mt-1 bg-white rounded-lg shadow-lg z-10 w-[600px] p-3">
                    <div className="flex gap-6">
                        {/* Quick selection options */}
                        <div className="w-[180px]">
                            {dates.map(date => <div key={date.id} className={`p-3 border border-gray-200 rounded-lg mb-2 cursor-pointer ${selectedDate === date.id ? 'border-black' : ''}`} onClick={() => {
                                setSelectedDate(date.id);
                                setSelectedCalendarDate('');
                                setSelectedDay(null);
                            }}>
                                <div className="font-medium text-sm">{date.name}</div>
                                <div className="text-gray-500 text-xs">
                                    {date.subtext}
                                </div>
                            </div>)}
                        </div>
                        {/* Calendar */}
                        <div className="flex-1">
                            {/* Calendar header */}
                            <div className="flex justify-between items-center mb-3">
                                <button onClick={() => changeMonth(-1)} className="p-1">
                                    <ChevronLeft size={18} />
                                </button>
                                <h2 className="text-sm font-semibold">
                                    {currentYear}년 {monthNames[currentMonth]}
                                </h2>
                                <button onClick={() => changeMonth(1)} className="p-1">
                                    <ChevronRight size={18} />
                                </button>
                            </div>
                            {/* Day names */}
                            <div className="grid grid-cols-7 gap-1 mb-1">
                                {dayNames.map((day, index) => <div key={`day-name-${index}`} className="h-8 flex items-center justify-center font-medium text-xs">
                                    {day}
                                </div>)}
                            </div>
                            {/* Calendar grid */}
                            <div className="grid grid-cols-7 gap-1">
                                {generateCalendarGrid()}
                            </div>
                        </div>
                    </div>
                </div>}
            </div>
        </div>
        {/* Age Section */}
        <div className="flex-1 py-2 px-3">
            <h3 className="text-gray-500 text-xs mb-0.5">Age</h3>
            <div className="relative">
                <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleCategory('age')}>
                    <span className="text-sm font-medium truncate max-w-[120px]">
                        {selectedAge ? ageGroups.find(a => a.id === selectedAge)?.name : 'Select Age'}
                    </span>
                    {expandedCategory === 'age' ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </div>
                {expandedCategory === 'age' && <div className="absolute top-full left-0 mt-1 bg-white rounded-lg shadow-lg z-10 w-56 p-3">
                    <div className="flex items-center mb-2">
                        <Users size={14} className="mr-1.5 text-gray-500" />
                        <span className="font-medium text-sm">연령대 선택</span>
                    </div>
                    <div className="space-y-1.5">
                        {ageGroups.map(age => <div key={age.id} className="flex items-center">
                            <input type="radio" id={age.id} name="age" checked={selectedAge === age.id} onChange={() => setSelectedAge(age.id)} className="mr-1.5" />
                            <label htmlFor={age.id} className="text-xs cursor-pointer">
                                {age.name}
                            </label>
                        </div>)}
                    </div>
                </div>}
            </div>
        </div>
        {/* Search Button */}
        <button className="bg-red-500 hover:bg-red-600 text-white rounded-full w-10 h-10 flex items-center justify-center ml-2 my-auto mr-2 transition-colors" onClick={handleSearch} aria-label="Search">
            <Search size={16} />
        </button>
    </div>;
};