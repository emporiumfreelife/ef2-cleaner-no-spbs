import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, CheckCircle, BookOpen } from 'lucide-react';

export default function CareerGuidance() {
  const { masterclassId } = useParams();

  const masterclassData = {
    '1': {
      title: 'Digital Marketing Mastery',
      testimonials: [
        { name: 'John Doe', comment: 'This masterclass changed my life!' },
        { name: 'Jane Smith', comment: 'I got a promotion after completing this course.' },
      ],
      caseStudies: [
        { title: 'Case Study 1: How a small business doubled its revenue', link: '#' },
        { title: 'Case Study 2: The power of social media marketing', link: '#' },
      ],
    },
    '2': {
        title: 'Brand Ambassador Certification',
        testimonials: [
            { name: 'John Doe', comment: 'This masterclass changed my life!' },
            { name: 'Jane Smith', comment: 'I got a promotion after completing this course.' },
        ],
        caseStudies: [
            { title: 'Case Study 1: How a small business doubled its revenue', link: '#' },
            { title: 'Case Study 2: The power of social media marketing', link: '#' },
        ],
    },
    '3': {
        title: 'Media & Communications Excellence',
        testimonials: [
            { name: 'John Doe', comment: 'This masterclass changed my life!' },
            { name: 'Jane Smith', comment: 'I got a promotion after completing this course.' },
        ],
        caseStudies: [
            { title: 'Case Study 1: How a small business doubled its revenue', link: '#' },
            { title: 'Case Study 2: The power of social media marketing', link: '#' },
        ],
    },
    '4': {
        title: 'Acting for Screen & Stage',
        testimonials: [
            { name: 'John Doe', comment: 'This masterclass changed my life!' },
            { name: 'Jane Smith', comment: 'I got a promotion after completing this course.' },
        ],
        caseStudies: [
            { title: 'Case Study 1: How a small business doubled its revenue', link: '#' },
            { title: 'Case Study 2: The power of social media marketing', link: '#' },
        ],
    },
    '5': {
        title: 'The Art of Modelling',
        testimonials: [
            { name: 'John Doe', comment: 'This masterclass changed my life!' },
            { name: 'Jane Smith', comment: 'I got a promotion after completing this course.' },
        ],
        caseStudies: [
            { title: 'Case Study 1: How a small business doubled its revenue', link: '#' },
            { title: 'Case Study 2: The power of social media marketing', link: '#' },
        ],
    },
    '6': {
        title: 'Film & Video Production Essentials',
        testimonials: [
            { name: 'John Doe', comment: 'This masterclass changed my life!' },
            { name: 'Jane Smith', comment: 'I got a promotion after completing this course.' },
        ],
        caseStudies: [
            { title: 'Case Study 1: How a small business doubled its revenue', link: '#' },
            { title: 'Case Study 2: The power of social media marketing', link: '#' },
        ],
    },
    '7': {
        title: 'Audio Production for Creatives',
        testimonials: [
            { name: 'John Doe', comment: 'This masterclass changed my life!' },
            { name: 'Jane Smith', comment: 'I got a promotion after completing this course.' },
        ],
        caseStudies: [
            { title: 'Case Study 1: How a small business doubled its revenue', link: '#' },
            { title: 'Case Study 2: The power of social media marketing', link: '#' },
        ],
    },
    '8': {
        title: 'Music Theory & Composition',
        testimonials: [
            { name: 'John Doe', comment: 'This masterclass changed my life!' },
            { name: 'Jane Smith', comment: 'I got a promotion after completing this course.' },
        ],
        caseStudies: [
            { title: 'Case Study 1: How a small business doubled its revenue', link: '#' },
            { title: 'Case Study 2: The power of social media marketing', link: '#' },
        ],
    }
  };

  const data = masterclassData[masterclassId as keyof typeof masterclassData];

  if (!data) {
    return (
      <div className="min-h-screen pt-20 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-playfair font-bold text-white mb-2">Masterclass not found</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-playfair font-bold text-white mb-2">Career Guidance: {data.title}</h1>
        <p className="text-gray-300 mb-8">Get inspired and motivated to enroll in this masterclass.</p>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Testimonials */}
          <div className="bg-gray-800 border border-gray-700 p-6 rounded-2xl">
            <h2 className="text-2xl font-semibold text-white mb-6">Testimonials</h2>
            <div className="space-y-4">
              {data.testimonials.map((testimonial, index) => (
                <div key={index} className="bg-white/5 p-4 rounded-lg">
                  <div className="flex items-center space-x-1 mb-2">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />)}
                  </div>
                  <p className="text-gray-300 italic mb-2">"{testimonial.comment}"</p>
                  <div className="text-sm">
                    <span className="text-white font-medium">{testimonial.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Case Studies */}
          <div className="bg-gray-800 border border-gray-700 p-6 rounded-2xl">
            <h2 className="text-2xl font-semibold text-white mb-6">Case Studies & Success Stories</h2>
            <div className="space-y-3">
              {data.caseStudies.map((study, index) => (
                <a key={index} href={study.link} className="flex items-center space-x-3 p-3 hover:bg-white/5 rounded-lg transition-colors">
                  <BookOpen className="w-5 h-5 text-rose-400" />
                  <span className="text-white font-medium">{study.title}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Enrollment Section */}
        <div className="mt-8 bg-gray-800 border border-gray-700 p-6 rounded-2xl">
          <h2 className="text-2xl font-semibold text-white mb-6">Ready to Enroll?</h2>
          <p className="text-gray-300 mb-4">Take the next step in your career and enroll in this masterclass today.</p>
          <Link
            to={`/masterclass?enroll=${masterclassId}`}
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-rose-500 to-purple-600 text-white font-semibold rounded-xl hover:shadow-xl transition-all"
          >
            Enroll Now
          </Link>
        </div>
      </div>
    </div>
  );
}
