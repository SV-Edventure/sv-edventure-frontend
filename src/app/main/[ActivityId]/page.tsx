import React, { useState, Children } from 'react'
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Star,
  ChevronLeft,
  ChevronRight,
  Check,
  ArrowLeft,
  BookOpen,
  Target,
  DollarSign,
  PackageOpen,
  CalendarCheck,
  Globe,
  Share2,
} from 'lucide-react'
import { ActivityProps } from '@/components/main/ActivityCard'

interface ActivityDetailPageProps {
  activity?: ActivityProps
  onClose: () => void
}

export default function ActivityDetailPage({
  activity,
  onClose,
}: ActivityDetailPageProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  // Fallback data if no activity is provided
  const defaultActivity = {
    id: 'sky-1',
    title: 'Guided Tour of NASA Ames Research Center with a Scientist Talk',
    location: 'Moffett Field, Mountain View, CA',
    price: 20,
    rating: 5.0,
    reviewCount: 32,
    imageUrl:
      'https://images.unsplash.com/photo-1454789548928-9efd52dc4031?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    duration: 2.5,
    ageRange: '8+',
    category: 'Space',
  }
  const displayActivity = activity || defaultActivity
  const images = [
    'https://images.unsplash.com/photo-1454789548928-9efd52dc4031?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    'https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    'https://images.unsplash.com/photo-1541185934-01b600ea069c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    'https://images.unsplash.com/photo-1543615294-d68f5c4b00f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
  ]
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }
  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }
  const handleGoToWebsite = () => {
    // In a real app, this would navigate to the activity's website
    console.log('Navigate to website for:', displayActivity.title)
    alert('Navigating to website for ' + displayActivity.title)
  }
  const handleShare = () => {
    // In a real app, this would open a share dialog
    console.log('Share activity:', displayActivity.title)
    alert('Sharing ' + displayActivity.title)
  }
  return (
    <div className="min-h-screen bg-gray-50 w-full">
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <button
            onClick={onClose}
            className="flex items-center text-gray-600 hover:text-indigo-600 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Activities
          </button>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Image Carousel */}
          <div className="relative h-96">
            <img
              src={images[currentImageIndex]}
              alt={displayActivity.title}
              className="w-full h-full object-cover"
            />
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 rounded-full p-2 shadow-md hover:bg-opacity-100 transition-all"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 rounded-full p-2 shadow-md hover:bg-opacity-100 transition-all"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
            <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2.5 h-2.5 rounded-full ${index === currentImageIndex ? 'bg-white' : 'bg-white bg-opacity-50'}`}
                />
              ))}
            </div>
          </div>
          <div className="p-6 md:p-8">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6">
              <div className="mb-6 md:mb-0">
                <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1 rounded-full mb-3">
                  {displayActivity.category}
                </span>
                <h1 className="text-2xl md:text-3xl font-bold mb-2">
                  {displayActivity.title}
                </h1>
                <div className="flex items-center text-gray-600 mb-2">
                  <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span>{displayActivity.location}</span>
                </div>
                <div className="flex items-center text-gray-600 mb-2">
                  <Users className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span>
                    Recommended Age: {displayActivity.ageRange} (best for
                    Elementary to High School students)
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="flex mr-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className="h-4 w-4 text-yellow-500"
                        fill="#f59e0b"
                      />
                    ))}
                  </div>
                  <span className="text-gray-600 text-sm">
                    ({displayActivity.reviewCount} reviews)
                  </span>
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center mb-1">
                  <DollarSign className="h-5 w-5 text-indigo-600 mr-2" />
                  <h3 className="font-medium">Price</h3>
                </div>
                <div className="text-2xl font-bold mb-1">
                  ${displayActivity.price}{' '}
                  <span className="text-gray-500 text-base font-normal">
                    per child
                  </span>
                </div>
                <div className="text-2xl font-bold mb-3">
                  $15{' '}
                  <span className="text-gray-500 text-base font-normal">
                    per adult
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  School group rates available
                </p>
              </div>
            </div>
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button
                onClick={handleGoToWebsite}
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
              >
                <Globe className="h-5 w-5 mr-2" />
                Go to Register Link
              </button>
              <button
                onClick={handleShare}
                className="flex-1 bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
              >
                <Share2 className="h-5 w-5 mr-2" />
                Share
              </button>
            </div>
            {/* Main Content */}
            <div>
              {/* Available Dates */}
              <section className="mb-8">
                <h2 className="text-xl font-bold mb-4 flex items-center">
                  <Calendar className="h-5 w-5 text-indigo-600 mr-2" />
                  Available Dates
                </h2>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="font-medium">Every Saturday & Sunday</p>
                  <p className="mb-2">10:00 AM – 12:30 PM</p>
                  <p className="text-sm italic text-gray-600">
                    Special weekday tours available for school groups
                  </p>
                </div>
              </section>
              {/* Description */}
              <section className="mb-8">
                <h2 className="text-xl font-bold mb-4 flex items-center">
                  <BookOpen className="h-5 w-5 text-indigo-600 mr-2" />
                  Description
                </h2>
                <p className="mb-4">
                  Step into the heart of Silicon Valley's space exploration hub!
                  Join a guided tour of NASA Ames Research Center and
                  experience:
                </p>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>An exclusive mini-talk from a NASA scientist</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>A walk through interactive exhibits</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>
                      Viewing real space research facilities (wind tunnels,
                      simulation labs)
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Q&A session for curious young minds</span>
                  </li>
                </ul>
              </section>
              {/* Learning Highlights */}
              <section className="mb-8">
                <h2 className="text-xl font-bold mb-4 flex items-center">
                  <Target className="h-5 w-5 text-indigo-600 mr-2" />
                  Learning Highlights
                </h2>
                <div className="bg-indigo-50 p-4 rounded-lg">
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="bg-indigo-100 rounded-full p-1 mr-3 mt-0.5">
                        <Star className="h-4 w-4 text-indigo-600" />
                      </div>
                      <span>
                        Discover NASA's role in space and aeronautics research
                      </span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-indigo-100 rounded-full p-1 mr-3 mt-0.5">
                        <Star className="h-4 w-4 text-indigo-600" />
                      </div>
                      <span>
                        Learn how scientists study space travel, robotics, and
                        planetary science
                      </span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-indigo-100 rounded-full p-1 mr-3 mt-0.5">
                        <Star className="h-4 w-4 text-indigo-600" />
                      </div>
                      <span>Gain insights into STEM career pathways</span>
                    </li>
                  </ul>
                </div>
              </section>
              {/* What's Included */}
              <section className="mb-8">
                <h2 className="text-xl font-bold mb-4 flex items-center">
                  <PackageOpen className="h-5 w-5 text-indigo-600 mr-2" />
                  What's Included
                </h2>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Guided tour & Q&A session</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Access to selected NASA Ames exhibits</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Take-home educational activity sheet</span>
                  </li>
                </ul>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
