import {
  collection,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../Firebase";
import Loading from "../Components/Loading";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { EffectFade, Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css/bundle";
import { useNavigate } from "react-router-dom";

export default function Slider() {
  SwiperCore.use([Autoplay, Navigation, Pagination]);
  const navigate = useNavigate()
  
  const [data, setdata] = useState(null);
  const [loading, setloading] = useState(true);
  useEffect(() => {
    async function slidershow() {
      const ListingRef = collection(db, "listings");
      const q = query(ListingRef, orderBy("timestamp", "desc"), limit(5));
      const docsnap = await getDocs(q);
      const Listing = [];
      docsnap.forEach((doc) => {
        return Listing.push({
          id: doc.id,
          data: doc.data(),
        });
      });

      setdata(Listing);
      setloading(false);
      
    }
    slidershow();
  }, []);
  if (loading) {
    return <Loading />;
  }
  if (data.length === 0) {
    return <></>;
  }

  return (
    data && (
      <div>
      <Swiper
        slidesPerView={1}
        navigation
        pagination={{ type: "progressbar" }}
        effect="fade"
        modules={[EffectFade]}
        autoplay={{ delay: 3000 }}
      >
        {data.map((doc) => (
          <SwiperSlide key={doc.id} onClick={()=>{navigate(`/category/${doc.data.type}/${doc?.id}`)}} >
            <div
              className="relative w-full overflow-hidden h-[300px]"
              style={{
                background: `url(${doc.data.imgUrls[0]}) center no-repeat`,
                backgroundSize: "cover",
              }}
            ></div>
             <p className="text-[#f1faee] absolute left-1 top-3 font-medium max-w-[90%] bg-[#457b9d] shadow-lg 
             opacity-90 p-2 rounded-br-3xl">
                {doc.data.name}
              </p>
              <p className="text-[#f1faee] absolute left-1 bottom-1 font-semibold max-w-[90%] bg-[#e63946] shadow-lg opacity-90 p-2 rounded-tr-3xl">
               $ {doc.data.offer===true?(doc.data?.discounted):(doc.data.regularprice)}
                 {doc.data.type==="rent"?(" / Month "):("")}
              </p>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
    )
    
  );
}
