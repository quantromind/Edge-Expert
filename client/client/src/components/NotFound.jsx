import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>404 | Page Not Found - Edge Expert</title>
        <meta name="description" content="The page you are looking for does not exist on Edge Expert." />
      </Helmet>

      <div className="flex items-center justify-center min-h-[70vh] bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full text-center">
          
          <p className="text-9xl font-extrabold text-blue-600 mb-4 opacity-70 animate-pulse">
            404
          </p>
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight mb-4 sm:text-5xl">
            Page Not Found
          </h1>
          
          <p className="mt-4 text-lg text-gray-500 mb-8">
            Oops! It looks like you've followed a broken link or entered a URL that doesn't exist on our site.
            Don't worry, we're here to help you get back on track.
          </p>

          <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
            
            <Link
              to="/"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Return to Home
            </Link>

            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Contact Support
            </Link>
            
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;