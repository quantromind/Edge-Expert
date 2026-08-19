export default function AddOnsSection({ addons, format }) {
  return (
    <section className="mb-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Additional Services
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Enhance your workspace experience with these flexible add-ons
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {addons.map((addon) => (
          <div
            key={addon.id}
            className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-indigo-300 hover:shadow-lg transition-all duration-300 group"
          >
            <div className="flex flex-col h-full">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                  {addon.label}
                </h3>
                <p className="text-2xl font-bold text-indigo-600 mb-4">
                  {format(addon.price)}
                  <span className="text-sm text-gray-500 font-normal"> / month</span>
                </p>
              </div>
              
              <button className="w-full py-3 px-4 bg-gray-100 hover:bg-indigo-600 hover:text-white text-gray-700 rounded-xl font-semibold transition-all duration-300 group-hover:shadow-md">
                Add to Plan
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}