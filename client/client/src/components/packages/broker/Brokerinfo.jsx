import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import companyImg from '../../../assets/broker/company.png'; // Import the company image

const brokerInfoData = {
  properties: [
    {
      title: 'Verified Property Listings',
      description:
        'All properties go through strict verification to ensure authenticity and reliability before being listed.',
      included: true,
    },
    {
      title: 'High-Resolution Images & Virtual Tours',
      description:
        'Showcase properties with detailed images and interactive 3D tours for better engagement.',
      included: true,
    },
    {
      title: 'Property Analytics & Insights',
      description:
        'Get detailed reports and analytics on property performance, visitor traffic, and inquiries.',
      included: false,
    },
  ],
  companyPolicy: [
    {
      title: 'Trusted Broker Network',
      description:
        'We ensure all brokers meet verification standards, maintaining credibility across the platform.',
      included: true,
    },
    {
      title: 'Secure Transactions',
      description:
        'All transactions and payments are encrypted and processed securely for buyer and seller safety.',
      included: true,
    },
    {
      title: 'Dedicated Customer Support',
      description:
        'Our team is available to resolve queries quickly and provide guidance for smooth operations.',
      included: true,
    },
  ],
};

const InfoItem = ({ item }) => (
  <div className="flex items-start space-x-4 mb-4">
    {item.included ? (
      <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
    ) : (
      <XCircle className="w-6 h-6 text-red-400 flex-shrink-0 mt-1" />
    )}
    <div>
      <h4 className="text-lg font-semibold text-gray-800">{item.title}</h4>
      <p className="text-gray-600">{item.description}</p>
    </div>
  </div>
);

const BrokerInfo = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Properties Section */}
        <div className="flex flex-col md:flex-row items-center md:space-x-12">
          <div className="md:w-1/2">
            <img
              src="https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&q=80"
              alt="Properties"
              className="rounded-xl shadow-lg w-full object-cover"
            />
          </div>
          <div className="md:w-1/2 mt-8 md:mt-0">
            <h2 className="text-3xl font-light text-gray-900 mb-4">
              Property Features & Services
            </h2>
            <p className="text-gray-600 mb-6">
              Edge Expert provides top-notch property listings, high-quality visuals, and detailed analytics to make your real estate business more efficient and trustworthy.
            </p>
            {brokerInfoData.properties.map((item, index) => (
              <InfoItem key={index} item={item} />
            ))}
          </div>
        </div>

        {/* Company Policy Section */}
        <div className="flex flex-col md:flex-row-reverse items-center md:space-x-12 md:space-x-reverse">
          <div className="md:w-1/2">
            <img
              src={companyImg}
              alt="Company Policy"
              className="rounded-xl shadow-lg w-full object-cover"
            />
          </div>
          <div className="md:w-1/2 mt-8 md:mt-0">
            <h2 className="text-3xl font-light text-gray-900 mb-4">
              Company Policies & Benefits
            </h2>
            <p className="text-gray-600 mb-6">
              Our platform ensures trust, security, and professional support for all brokers, making it easier to manage listings, connect with clients, and grow your real estate business.
            </p>
            {brokerInfoData.companyPolicy.map((item, index) => (
              <InfoItem key={index} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrokerInfo;
