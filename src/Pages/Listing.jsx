import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../Firebase";
import Loading from "../Components/Loading";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { EffectFade, Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css/bundle";
import { IoMdShare } from "react-icons/io";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaBed } from "react-icons/fa";
import { FaBath } from "react-icons/fa";
import { FaCar } from "react-icons/fa";
import { MdChair } from "react-icons/md";
import { getAuth } from "firebase/auth";
import Contact from "../Components/Contact";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

function Listing() {
  const params = useParams();
  SwiperCore.use([Autoplay, Navigation, Pagination]);
  

  const auth = getAuth();
  const [Listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sharevalue, setsharevalue] = useState(false);
  const [contact, setcontact] = useState(false);

  useEffect(() => {
    async function fetchdata() {
      const docRef = doc(db, "listings", params.ID);
      const docsnap = await getDoc(docRef);

      if (docsnap.exists()) {
        setListing(docsnap.data());
        setLoading(false);
        console.log(Listing);
      }
    }
    fetchdata();
  }, [params.ID]);

  if (loading) {
    return<Loading />;
  }
  function sharehandler() {
    navigator.clipboard.writeText(window.location.href);
    setsharevalue(true);
    setTimeout(() => {
      setsharevalue(false);
    }, 2000);
  }
  return (
    <main>
      {Listing && Listing.imgUrls && (
        <Swiper
          slidesPerView={1}
          navigation
          pagination={{ type: "progressbar" }}
          effect="fade"
          modules={[EffectFade]}
          autoplay={{ delay: 3000 }}
        >
          {Listing.imgUrls.map((url, index) => (
            <SwiperSlide key={index}>
              <div
                className="relative w-full overflow-hidden h-[300px]"
                style={{
                  background: `url(${Listing.imgUrls[index]}) center no-repeat`,
                  backgroundSize: "cover",
                }}
              ></div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
      <div
        className="fixed top-[13%] right-[3%] z-10 bg-white cursor-pointer border-2 border-gray-400
     rounded-full w-12 h-12 flex justify-center items-center"
        onClick={sharehandler}
      >
        <IoMdShare className="text-2xl text-black" />
      </div>
      {sharevalue && (
        <p
          className="fixed top-[23%] right-[5%] font-semibold border-2 border-gray-400 rounded-md
       bg-white z-10 p-2"
        >
          {" "}
          Link Copied
        </p>
      )}
      <div
        className="m-4 flex flex-col md:flex-row max-w-6xl lg:mx-auto rounded-lg p-4 border-3 shadow-lg
       bg-white lg:space-x-5 "
      >
        <div className="w-full">
          <p className="text-2xl mb-3 font-bold text-blue-900">
            {Listing?.name} - ${" "}
            {Listing?.offer
              ? Listing?.discounted
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              : Listing?.regularprice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            {Listing?.type === "rent" ? " / Month" : ""}
          </p>
          <p className="flex items-center mt-6 mb-3 font-semibold ">
            <FaMapMarkerAlt className="mr-1" />
            {Listing?.address}
          </p>
          <div className="flex justify-start items-center space-x-4 w-[75%]">
            <p className="bg-red-800 w-full max-w-[200px] rounded-md p-1 text-white text-center font-semibold shadow-md">
              {Listing?.type === "rent" ? "Rent" : "Sale"}
            </p>
            {Listing?.offer && (
              <p className="w-full max-w-[200px] bg-green-800 rounded-md p-1 text-white text-center font-semibold shadow-md">
                ${+Listing.regularprice - +Listing.discounted} Discount
              </p>
            )}
          </div>
          <p className="mt-6  mb-3">
            <span className=" font-semibold">Description -</span>
            {Listing?.description}
          </p>
          <ul className="flex items-center space-x-2 sm:space-x-10 text-sm font-semibold mb-6">
            <li className="flex items-center whitespace-nowrap">
              <FaBed className="text-lg mr-1" />
              {+Listing?.bedrooms > 1
                ? `${Listing?.bedrooms} Beds `
                : `${Listing?.bedrooms} Bed`}
            </li>
            <li className="flex items-center whitespace-nowrap">
              <FaBath className="text-lg mr-1" />
              {+Listing?.bedrooms > 1
                ? `${Listing?.bathrooms} Baths `
                : `${Listing?.bathrooms} Bath`}
            </li>
            <li className="flex items-center whitespace-nowrap">
              <FaCar className="text-lg mr-1" />
              {Listing?.parking === true ? "Parking Available" : "No Parking"}
            </li>
            <li className="flex items-center whitespace-nowrap">
              <MdChair className="text-lg mr-1" />
              {Listing?.furnished === true ? "Furnished" : "Non-Furnished"}
            </li>
          </ul>
          {Listing?.userRef !== auth?.currentUser?.uid && !contact && (
            <div className="mt-6">
              <button
                onClick={() => {
                  setcontact(true);
                }}
                className="px-7 py-3 bg-blue-600 text-white font-medium text-sm uppercase rounded 
            shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg w-full text-center 
            transition duration-150 ease-in-out "
              >
                Contact Landlord
              </button>
            </div>
          )}
          {contact && <Contact ownerID={Listing?.userRef} Listing={Listing} />}
        </div>
        <div className="w-full h-[200px] md:h-[400px] z-10 overflow-x-hidden mt-6 md:mt-0 md:ml-2">
          {Listing && Listing.geolocationmark ? (
            <MapContainer
              center={[
                Listing.geolocationmark.lat,
                Listing.geolocationmark.lng,
              ]}
              zoom={13}
              scrollWheelZoom={false}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker
                position={[
                  Listing.geolocationmark.lat,
                  Listing.geolocationmark.lng,
                ]}
              >
                <Popup>
                  A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
              </Marker>
            </MapContainer>
          ) : (
            <p>Loading map...</p>
          )}
        </div>
      </div>
    </main>
  );
}
export default Listing;
