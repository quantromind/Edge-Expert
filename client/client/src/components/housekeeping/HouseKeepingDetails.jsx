import React from "react";

const HousekeepingDetails = () => {
  const housekeepingData = [
    {
      id: 1,
      title: "Regular Home Cleaning",
      video: "https://v.ftcdn.net/05/43/78/16/700_F_543781665_gQehVp0zmZfAigTD3fGL1bvJGgNO62hw_ST.mp4",
      videoType: "mp4",
      badge: "Basic",
      price: 899,
      rating: 5,
      description:
        "Keep your home fresh and tidy with our daily or weekly cleaning service. Includes dusting, sweeping, mopping, and bathroom/kitchen cleaning.",
    },
    {
      id: 2,
      title: "Floor Cleaning",
      video: "https://www.pexels.com/download/video/6197557/",
      videoType: "mp4",
      badge: "Premium",
      price: 2499,
      rating: 5,
      description:
        "Deep cleaning using scrubbing and polishing machines to make your floors shiny and spotless.",
    },
    {
      id: 3,
      title: "Office Cleaning",
      video: "https://v.ftcdn.net/02/77/89/39/700_F_277893911_K8gqpgWhdfXCfV7WKQQZmCbYGFzTvzB5_ST.mp4",
      videoType: "mp4",
      badge: "Commercial",
      price: 3999,
      rating: 5,
      description:
        "Professional cleaning for corporate spaces ensuring a spotless and germ-free environment.",
    },
    {
    id: 4,
    title: "Sofa& Chair Shampooing",
    video: "https://v.ftcdn.net/06/09/48/66/700_F_609486631_discQHKWYAidLoOCIwyeCRasB5i9D7xR_ST.mp4",
    videoType: "mp4",
    badge: "Premium",
    price: 2499,
    rating: 5,
    description:
      "Deep cleaning using scrubbing and polishing machines to make your floors shiny and spotless.",
  },
   {
    id: 5,
    title: "Carpet cleaning",
    video: "https://v.ftcdn.net/08/53/77/72/700_F_853777211_w34q7oRoeC7diqrNP5HAvx3VeZDAMBHv_ST.mp4",
    videoType: "mp4",
    badge: "Premium",
    price: 2499,
    rating: 5,
    description:
      "Deep cleaning using scrubbing and polishing machines to make your floors shiny and spotless.",
  },


  {
    id: 6,
    title: "Bathroom cleaning",
    video: "https://v.ftcdn.net/14/10/51/07/700_F_1410510787_ASOhlg7fw5NwefyIoDXlqF9fA5gbiF0t_ST.mp4",
    videoType: "mp4",
    badge: "Premium",
    price: 2499,
    rating: 5,
    description:
      "Deep cleaning using scrubbing and polishing machines to make your floors shiny and spotless.",
  },
 
  ];

  // Fallback image for Pinterest links
  const pinterestThumbnail =
    "https://upload.wikimedia.org/wikipedia/commons/0/08/Pinterest-logo.png";

  // Render Video Logic
  const renderVideo = (item) => {
    if (item.videoType === "mp4") {
      return (
        <video
          src={item.video}
          controls
          className="w-full h-52 object-cover rounded-t-xl"
        />
      );
    }

    // Fallback for Pinterest / Non-MP4
    return (
      <img
        src={pinterestThumbnail}
        alt="Preview Not Available"
        className="w-full h-52 object-contain bg-gray-100 rounded-t-xl"
      />
    );
  };

  return (
    <div className="w-full px-6 py-10 bg-white">
      {/* <h1 className="text-4xl font-bold text-[#0A2342] mb-10">
        Explore Our Housekeeping Options
      </h1> */}<br></br><br></br><br></br><br></br>

      <div className="grid md:grid-cols-3 gap-8">
        {housekeepingData.map((item) => (
          <div
            key={item.id}
            className="shadow-xl rounded-3xl p-0 bg-white border hover:shadow-2xl transition"
          >
            {/* Video / Thumbnail */}
            <div className="relative">
              {renderVideo(item)}

              <span className="absolute top-4 right-4 bg-yellow-500 text-white text-sm px-4 py-1 rounded-full">
                {item.badge}
              </span>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="flex items-center gap-2 text-gray-600 mb-4">
                ⭐ <span>{item.rating} / 5</span>
              </div>

              <h2 className="text-2xl font-semibold mb-2">{item.title}</h2>
              <p className="text-gray-600">{item.description}</p>

              {/* Price + Button */}
              <div className="mt-6 flex justify-between items-center">
                <div>
                  <p className="text-3xl font-bold text-blue-600">
                    ₹{item.price}
                  </p>
                  <p className="text-xs">per session</p>
                </div>

                <button className="bg-blue-600 text-white px-6 py-2 rounded-full shadow-md">
                  Book Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HousekeepingDetails;
