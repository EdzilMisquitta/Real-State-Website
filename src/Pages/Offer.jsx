import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../Firebase";
import Itemstructure from "../Components/Itemstructure";
import Loading from "../Components/Loading";
import { toast } from "react-toastify";

function Offer() {
  const [offerdata, setofferdata] = useState(null);
  const [loading, setloading] = useState(true);
  const [lastdata, setlastdata] = useState(null);
  useEffect(() => {
    try {
      async function offerdatafetcher() {
        const ListingRef = collection(db, "listings");
        const q = query(
          ListingRef,
          orderBy("timestamp", "desc"),
          where("offer", "==", true),
          limit(4)
        );

        const querySnap = await getDocs(q);
        const lastdatafetch = querySnap.docs[querySnap.docs.length - 1];
        setlastdata(lastdatafetch);
        console.log(lastdatafetch);

        const Listing = [];
        querySnap.forEach((doc) => {
          return Listing.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setofferdata(Listing);
        setloading(false);
      }
      offerdatafetcher();
    } catch (error) {
      toast.error("Something Went Wrong");
    }
  }, []);
  if (loading) {
    return <Loading />;
  }
  async function loadmorehandler() {
    try {
      const ListingRef = collection(db, "listings");
      const q = query(
        ListingRef,
        orderBy("timestamp", "desc"),
        limit(4),
        where("offer", "==", true),
        startAfter(lastdata)
      );
      const querysnap = await getDocs(q);
      const lastdatafetch = querysnap.docs[querysnap.docs.length - 1];
      setlastdata(lastdatafetch);
      const Listing = [];
      querysnap.forEach((doc) => {
        return Listing.push({
          id: doc.id,
          data: doc.data(),
        });
        
      }
      );
      setofferdata((prevestate) => [...prevestate, ...Listing]);
      
      setloading(false);
    } catch (error) {}
  }
  return (
    <div className="max-w-6xl mx-auto pt-4 space-y-6">
      <h1 className="text-3xl text-center mt-6 font-bold mb-6">Offers</h1>

      {offerdata ? (
        <>
          <main>
            <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
              {offerdata.map((data) => (
                <Itemstructure key={data.id} id={data.id} listing={data.data} />
              ))}
            </ul>
          </main>

          {lastdata && (
            <div className="flex justify-center items-center">
              <button
                onClick={loadmorehandler}
                className="bg-white px-3 py-1.5 text-gray-700 border border-gray-300 mb-6 mt-6 hover:border-slate-600 rounded transition duration-150 ease-in-out"
              >
                Load more
              </button>
            </div>
          )}
        </>
      ) : (
        <p>There are no current offers</p>
      )}
    </div>
  );
}
export default Offer;
