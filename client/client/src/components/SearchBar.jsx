import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, ChevronDown } from 'lucide-react';
import { fetchSuggestions } from '../machine/property';

const TABS = [
  { key: 'buy', label: 'Buy' },
  { key: 'rent', label: 'Rent' },
  { key: 'sell', label: 'Sell' },
];

const Cities = [
  "Mumbai", "Bengaluru", "Hyderabad", "Pune", "Chennai", "Delhi", "Gurgaon", "Noida",
  "Kolkata", "Ahmedabad", "Thane", "Navi Mumbai", "Ghaziabad", "Greater Noida",
  "Faridabad", "Lucknow", "Jaipur", "Chandigarh", "Indore", "Nagpur", "Coimbatore",
  "Vizag", "Vadodara", "Bhopal", "Mysuru", "Surat", "Patna", "Kanpur", "Rajkot",
  "Vijayawada", "Ludhiana", "Nashik", "Varanasi", "Aurangabad", "Jodhpur", "Madurai",
  "Agra", "Meerut", "Jabalpur", "Ranchi", "Amritsar", "Guwahati", "Jamshedpur",
  "Raipur", "Dehradun", "Trivandrum", "Thrissur", "Salem", "Gwalior"
];

const popularByCity = {
  Pune: ["Wakad", "Baner", "Kothrud", "Viman Nagar", "Hinjewadi"],
  Bengaluru: ["Whitefield", "Electronic City", "JP Nagar", "KR Puram", "Devanahalli"],
  Mumbai: ["Andheri West", "Borivali", "Dadar", "Mira Road East", "Chembur"],
};

const SearchBar = ({ className = '', variant = 'light' }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('buy');
  const [location, setLocation] = useState('');
  const [city, setCity] = useState('');
  const [query, setQuery] = useState('');
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const [showPopularSearches, setShowPopularSearches] = useState(false);
  const [filteredCities, setFilteredCities] = useState(Cities);
  const [popularLocations, setPopularLocations] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  const cityInputRef = useRef(null);
  const cityDropdownRef = useRef(null);
  const popularSearch = useRef(null);

  const handleSearch = (e) => {
    e.preventDefault();
    if (location.trim()) {
      navigate(`/search?type=${activeTab}&location=${encodeURIComponent(location.trim())}`);
    }
  };

  const handleCityInput = (value) => {
    setCity(value);
    setLocation(value);
    setQuery('');
    const filtered = Cities.filter((c) =>
      c.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredCities(filtered);
  };

  const handleCitySelect = (value) => {
    setCity(value);
    setLocation(value);
    setQuery('');
    setShowCityDropdown(false);
    setShowPopularSearches(false);
  };

  useEffect(() => {
    setPopularLocations(popularByCity[city] || []);
  }, [city]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !cityDropdownRef.current?.contains(event.target) &&
        !cityInputRef.current?.contains(event.target) &&
        !popularSearch.current?.contains(event.target)
      ) {
        setShowCityDropdown(false);
        setShowPopularSearches(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (query.length < 2 || !city) {
      setSuggestions([]);
      return;
    }

    const controller = new AbortController();
    const delayDebounce = setTimeout(() => {
      fetchSuggestions(query, city, controller, setSuggestions);
    }, 300);

    return () => {
      clearTimeout(delayDebounce);
      controller.abort();
    };
  }, [query, city]);

  const baseTab = 'flex-1 py-2 font-medium text-center transition-colors duration-300 focus:outline-none';
  const activeTabStyle = 'bg-blue-600 text-white';
  const inactiveTabStyle = variant === 'light' ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' : 'bg-gray-800 text-gray-300 hover:bg-gray-700';

  return (
    <div className={`rounded-lg shadow-lg p-4 ${variant === 'light' ? 'bg-white' : 'bg-gray-900'} ${className} max-w-2xl mx-auto w-full`}>
      {/* Tabs */}
      <div className="flex mb-4">
        {TABS.map((tab, idx) => (
          <button
            key={idx}
            className={`${baseTab} ${activeTab === tab.key ? activeTabStyle : inactiveTabStyle} ${idx === 0 ? 'rounded-tl-md rounded-bl-md' : ''} ${idx === TABS.length - 1 ? 'rounded-tr-md rounded-br-md' : ''} text-sm sm:text-base`}
            onClick={() => setActiveTab(tab.key)}
            type="button"
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Search Form */}
      <form onSubmit={handleSearch}>
        <div className="relative" ref={cityDropdownRef}>

          <div className="flex items-center bg-white rounded-r-full rounded-tl-full px-4 py-2 shadow-sm border border-gray-300 mt-2">
            {/* City input */}
            <input
              type="text"
              ref={cityInputRef}
              className="w-[30%] md:w-[20%] px-2 py-2 text-sm text-gray-800 bg-transparent outline-none"
              value={city}
              onChange={(e) => handleCityInput(e.target.value)}
              onFocus={() => {
                setShowCityDropdown(true);
                setShowPopularSearches(false);
              }}
              placeholder="City"
            />
            <ChevronDown className="h-4 w-4 text-gray-500 mr-4" />

            {/* Divider */}
            <div className="h-8 w-px bg-gray-300 mr-4" />

            {/* Main input */}
            <input
              type="text"
              className="flex-1 px-2 py-2 text-sm text-gray-700 bg-transparent outline-none"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => {
                if (popularLocations.length > 0 && !query) {
                  setShowPopularSearches(true);
                }
              }}
              placeholder="Search for locality, landmark, project, or builder"
            />

            {/* Search button */}
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-r-md transition-colors duration-300"
            >
              <Search size={20} />
            </button>
          </div>

          {/* City Dropdown */}
          {showCityDropdown && (
            <div className="absolute top-full left-0 bg-white border border-gray-300 rounded-md shadow-lg z-50 w-44">
              <div className="p-3 border-b border-gray-200">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Top Cities</p>
              </div>
              <div className="max-h-60 overflow-y-auto custom-scroll">
                {filteredCities.length > 0 ? (
                  filteredCities.map((c, index) => (
                    <div
                      key={index}
                      className="px-4 py-1 cursor-pointer hover:bg-gray-100 text-sm text-black flex items-center gap-2"
                      onClick={() => handleCitySelect(c)}
                    >
                      <MapPin className="h-4 w-4 text-gray-500" />
                      {c}
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-2 text-gray-500 text-sm">No cities found</div>
                )}
              </div>
            </div>
          )}

          {/* Popular Locations */}
          {showPopularSearches && !query && popularLocations?.length > 0 && (
            <div
              className="absolute top-full left-[26.5%] bg-white border border-gray-300 rounded-md shadow-lg z-50 w-[70%] mt-2"
              ref={popularSearch}
            >
              <div className="p-3 border-b border-gray-200 text-sm font-semibold text-gray-600">
                Popular search in <span className="font-bold">{city}</span>:
              </div>
              {popularLocations.map((loc, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-black hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setQuery(loc);
                    setLocation(loc);
                    setShowPopularSearches(false);
                  }}
                >
                  <MapPin className="h-4 w-4 text-gray-500" />
                  {loc}
                  <span className="ml-auto text-[10px] text-gray-400 tracking-widest">LOCALITY</span>
                </div>
              ))}
            </div>
          )}

          {/* Google Suggestions */}
          {query && suggestions.length > 0 && (
            <div className="absolute top-full left-1/4 bg-white border border-gray-300 rounded-md shadow-lg z-50 w-[70%] mt-2 max-h-60 overflow-y-auto">
              {suggestions.map((s, i) => (
                <div
                  key={i}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-black"
                  onClick={() => {
                    setQuery(s);
                    setLocation(s);
                  }}
                >
                  {s}
                </div>
              ))}
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default SearchBar;







