import { useEffect, useState } from "react";
import Slider from "./Slider";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../Firebase";
import Itemstructure from "../Components/Itemstructure";
import { Link } from "react-router-dom";

function Home() {
  const [offerdata, setofferdata] = useState(null);
  useEffect(() => {
    async function fetcher() {
      try {
        const listingref = collection(db, "listings");
        const q = query(
          listingref,
          where("offer", "==", true),
          orderBy("timestamp", "desc"),
          limit(4)
        );
        const querysnap = await getDocs(q);

        const offerListing = [];
        querysnap.forEach((doc) => {
          return offerListing.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setofferdata(offerListing);
      } catch (error) {
        console.log(error);
      }
    }
    fetcher();
  }, []);

  const [saledata, setdata] = useState(null);
  useEffect(() => {
    async function salehandler() {
      try {
        const saleRef = collection(db, "listings");
        const q = query(
          saleRef,
          where("type", "==", "sale"),
          limit(4),
          orderBy("timestamp", "desc")
        );
        const querySnap = await getDocs(q);

        const Listing = [];
        querySnap.forEach((doc) => {
          return Listing.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setdata(Listing);
      } catch (error) {
        console.log(error);
      }
      console.log(saledata);
    }
    salehandler();
  }, []);

  const [rentdata, setrentdata] = useState(null);
  useEffect(() => {
    try {
      async function rentdatafetcher() {
        const ListingRef = collection(db, "listings");
        const q = query(
          ListingRef,
          orderBy("timestamp", "desc"),
          limit(4),
          where("type", "==", "rent")
        );
        const querysnap =await getDocs(q);
        const Listing = [];
        querysnap.forEach((doc) => {
          return Listing.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setrentdata(Listing);
      }
      rentdatafetcher()
    } catch (error) {
      console.log(error);
    }
    
  }, []);
  return (
    <div>
      <Slider />
      <div className="max-w-6xl mx-auto pt-4 space-y-6">
        
        {offerdata && (
          <div className="m-2 mb-6">
            <h2 className="px-3 text-2xl mt-6 font-semibold">React Offer</h2>
            <Link to="/offer">
              <p className="px-3 text-sm text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out">
                Show more offers
              </p>
            </Link>
            <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
              {offerdata.map((data) => (
                <Itemstructure key={data.id} id={data.id} listing={data.data} />
              ))}
            </ul>
          </div>
        )}

        {saledata && (
         <div className="m-2 mb-6">
            <h2 className="px-3 text-2xl mt-6 font-semibold">
              Places for Sale
            </h2>
            <Link to="/category/sale">
              <p className="px-3 text-sm text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out">
                Show more offers
              </p>
            </Link>
            <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
              {saledata.map((data) => (
                <Itemstructure key={data.id} id={data.id} listing={data.data} />
              ))}
            </ul>
          </div>
        )}

        {rentdata && (
          <div className="m-2 mb-6">
            <h2 className="px-3 text-2xl mt-6 font-semibold">
              Places for Rent
            </h2>
            <Link to="/category/rent">
              <p className="px-3 text-sm text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out">
                Show more offers
              </p>
            </Link>
            <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
                {rentdata.map((data)=>(
                    <Itemstructure key={data.id} listing={data.data} id={data.id}/>
                ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
export default Home;
