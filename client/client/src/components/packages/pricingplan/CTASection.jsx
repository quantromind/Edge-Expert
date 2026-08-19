export default function CTASection() {
  return (
    <section className="mb-12">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-8 lg:p-12 text-white">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="flex-1 text-center lg:text-left">
            <h3 className="text-2xl lg:text-3xl font-bold mb-4">
              Ready to Transform Your Workspace?
            </h3>
            <p className="text-indigo-100 text-lg mb-6">
              Join thousands of businesses that trust Edge Expert for their workspace solutions.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="px-8 py-4 bg-white text-indigo-600 rounded-xl font-bold hover:bg-gray-100 transition-colors duration-300 shadow-lg hover:shadow-xl">
                Start Free Trial
              </button>
              <button className="px-8 py-4 border-2 border-white text-white rounded-xl font-bold hover:bg-white hover:text-indigo-600 transition-all duration-300">
                Schedule Tour
              </button>
            </div>
          </div>
          
          <div className="flex-1 grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span>No long-term commitment</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span>24/7 access</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <span>Secure environment</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                </svg>
              </div>
              <span>Flexible scaling</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <p className="mt-8 text-sm text-gray-500 text-center max-w-2xl mx-auto">
        *All prices exclude GST. Plans subject to availability. Security deposit equivalent to 1 month's rent required. 
        Free trial available for first-time customers. Cancel anytime with 30-day written notice.
      </p>
    </section>
  );
}