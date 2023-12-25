import { useState } from "react";
import Loading from "../Components/Loading";
import { toast } from "react-toastify";
import { getAuth } from "firebase/auth";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { addDoc, collection, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../Firebase";
import { useNavigate } from "react-router-dom";
function CreateListing() {
  const [geolocation, setgeolocation] = useState(true);
  const [loading, setloading] = useState(false);
  const auth = getAuth();
  const navigate = useNavigate()

  const [form, setform] = useState({
    type: "rent",
    name: "",
    bedrooms: 1,
    bathrooms: 1,
    parking: false,
    furnished: false,
    address: "",
    description: "",
    offer: false,
    regularprice: 1,
    discounted: 1,
    longitude: 0,
    latitude: 0,
    image: 0,
  });
  const {
    type,
    name,
    bedrooms,
    bathrooms,
    parking,
    furnished,
    address,
    description,
    offer,
    regularprice,
    discounted,
    longitude,
    latitude,
    image,
  } = form;
  
  function changehandler(event) {
    let boolean = null;
    if (event.target.value === "true") {
      boolean = true;
    }

    if (event.target.value === "false") {
      boolean = false;
    }

    if (event.target.files) {
      setform((prevstate) => ({
        ...prevstate,
        [event.target.id]: event.target.files,
      }));
    }

    if (!event.target.files) {
      setform((prevstate) => ({
        ...prevstate,
        [event.target.id]: boolean ?? event.target.value,
      }));
    }
  }

  async function submithandler(event) {
    event.preventDefault();
    setloading(true);
    if (+discounted >= +regularprice) {
      setloading(false);
      toast.error("Discounted price needs to be less than regular price");
      return
    }
    if (image.length > 6) {
      setloading(false);
      toast.error("maximum 6 images are allowed");
      return
    }

    let geolocationmark = {};
    let loaction;
    if (geolocation) {
      const response = await fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${address}&key=${process.env.REACT_APP_GECCODE_API_KEY}`
      );
      const data = await response.json();
      console.log(data.results.length);

      geolocationmark.lat = data.results[0]?.geometry.lat ?? 0;
      geolocationmark.lng = data.results[0]?.geometry.lng ?? 0;

      loaction = data.results.length === 0 && undefined;

      if (loaction === undefined) {
        setloading(false);
        toast.error("Please Enter a Correct Address");
        return
      }
    } else {
      geolocationmark.lat = latitude;
      geolocationmark.lng = longitude;
    }
    
      async function storeImage(image) {
        return new Promise((resolve,reject ) => {
          const storage = getStorage();
          const filename = `${auth.currentUser.uid}-${image.name}`;
          const storageref = ref(storage, filename);
          const uploadTask = uploadBytesResumable(storageref, image);
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log("Upload is " + progress + "% done");
              switch (snapshot.state) {
                case "paused":
                  console.log("Upload is paused");
                  break;
                case "running":
                  console.log("Upload is running");
                  break;
              }
            },
            (error) => {
              reject(error);
            },
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                resolve(downloadURL);
                
              });
            }
          );
        });
      }
      const imgUrls = await Promise.all(
        [...image].map((image) => storeImage(image))
      ).catch ((error)=> {
      setloading(false);
      toast.error("Image Not Upload");
    })
    const formcopy = {...form,geolocationmark,imgUrls,timestamp: serverTimestamp(),userRef: auth.currentUser.uid}
    delete formcopy.image
    delete formcopy.longitude
    delete formcopy.latitude
    !formcopy.offer && delete formcopy.discounted

    const docRef = await addDoc(collection(db,"listings",),formcopy)
    
    setloading(false)
    toast.success("Listing created")
    navigate(`/category/${form.type}/${docRef.id}`)

  }

  if (loading) {
    return <Loading />;
  }
  return (
    <main className="max-w-md mx-auto px-2">
      <h1 className="text-3xl text-center mt-6 font-bold">Create Listing</h1>
      <form onSubmit={submithandler}>
        <p className="text-lg mt-6 font-semibold">Sell / Rent</p>
        <div className=" flex m-2 uppercase">
          <button
            type="button"
            id="type"
            value={"sale"}
            onClick={changehandler}
            className={`px-7 py-3 font-medium uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg 
                    active:shadow-lg transition duration-150 ease-in-out w-full mr-3 ${
                      type === "sale" && "bg-gray-600 text-white"
                    }`}
          >
            Sell
          </button>
          <button
            type="button"
            id="type"
            value={"rent"}
            onClick={changehandler}
            className={`px-7 py-3 font-medium uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg 
                    active:shadow-lg transition duration-150 ease-in-out w-full ml-3 ${
                      type === "rent" && "bg-slate-600 text-white"
                    }`}
          >
            Rent
          </button>
        </div>
        <p className="mt-6 text-lg font-semibold">Name</p>
        <input
          type="text"
          id="name"
          value={name}
          className="w-full px-4 py-2 text-xl text-gray-700
                 border-gray-300 rounded transition ease-in-out duration-150 focus:text-gray-700 bg-white
                  focus:border-slate-600 mb-6"
          onChange={changehandler}
          placeholder="Enter Property Name"
          maxLength="32"
          minLength="10"
          required
        />

        {/* --------------------------------------------beds & Baths------------------------------------------------ */}

        <div className="flex space-x-6 mb-6 ">
          {/*----------------------------------------------Beds-----------------------------------------------------  */}

          <div>
            <p className="text-lg font-semibold ">Beds</p>
            <input
              type="number"
              id="bedrooms"
              value={bedrooms}
              onChange={changehandler}
              min="1"
              max="50"
              className="px-4 py-2 text-xl text-gray-700 bg-white border border-gray-700 rounded transition 
              duration-150 ease-in-out focus:bg-white focus: focus:border-slate-600 focus:text-gray-700 text-center
              w-full"
            />
          </div>

          {/*-------------------------------------------------Baths----------------------------------------------  */}

          <div>
            <p className="text-lg font-semibold ">Baths</p>
            <input
              type="number"
              id="bathrooms"
              value={bathrooms}
              onChange={changehandler}
              min="1"
              max="50"
              className="px-4 py-2 text-xl text-gray-700 bg-white border border-gray-700 rounded transition 
              duration-150 ease-in-out focus:bg-white focus: focus:border-slate-600 focus:text-gray-700 text-center
               w-full"
            />
          </div>
        </div>

        {/* ---------------------------------------------Parking Spot------------------------------------------------- */}

        <p className="text-lg mt-6 font-semibold">Parking Spot</p>
        <div className=" flex m-2 uppercase">
          <button
            type="button"
            id="parking"
            value={true}
            onClick={changehandler}
            className={`px-7 py-3 font-medium uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg 
                    active:shadow-lg transition duration-150 ease-in-out w-full mr-3 ${
                      parking
                        ? "bg-slate-600 text-white"
                        : "bg-white text-black"
                    }`}
          >
            Yes
          </button>
          <button
            type="button"
            id="parking"
            value={false}
            onClick={changehandler}
            className={`px-7 py-3 font-medium uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg 
                    active:shadow-lg transition duration-150 ease-in-out w-full ml-3 ${
                      parking
                        ? "bg-white text-black"
                        : "bg-slate-600 text-white"
                    }`}
          >
            No
          </button>
        </div>

        {/* ---------------------------------------------Furnished-------------------------------------------------- */}

        <p className="text-lg mt-6 font-semibold">Furnished</p>
        <div className=" flex m-2 uppercase">
          <button
            type="button"
            id="furnished"
            value={true}
            onClick={changehandler}
            className={`px-7 py-3 font-medium uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg 
                    active:shadow-lg transition duration-150 ease-in-out w-full mr-3 ${
                      furnished
                        ? "bg-slate-600 text-white"
                        : "bg-white text-black"
                    }`}
          >
            Yes
          </button>
          <button
            type="button"
            id="furnished"
            value={false}
            onClick={changehandler}
            className={`px-7 py-3 font-medium uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg 
                    active:shadow-lg transition duration-150 ease-in-out w-full ml-3 ${
                      furnished
                        ? "bg-white text-black"
                        : "bg-slate-600 text-white"
                    }`}
          >
            No
          </button>
        </div>

        {/* -----------------------------------------Address--------------------------------------------------------- */}
        <div>
          <p className="mt-6 text-lg font-semibold">Address</p>
          <textarea
            type="text"
            id="address"
            value={address}
            className="w-full px-4 py-2 text-xl text-gray-700
                 border-gray-300 rounded transition ease-in-out duration-150 focus:text-gray-700 bg-white
                  focus:border-slate-600 mb-6 "
            onChange={changehandler}
            placeholder="Enter Address"
            required
          />
          {!geolocation && (
            <div className="flex space-x-6 mb-6">
              <div>
                <p className="text-lg font-semibold">Latitude</p>
                <input
                  type="number"
                  id="latitude"
                  min={-90}
                  max={90}
                  onChange={changehandler}
                  required
                  className="rounded w-full px-4 py-2 text-lg text-gray-700 bg-white border
                   border-gray-300 transition ease-in-out focus:bg-white focus:text-gray-700 focus:border-slate-600
                   text-center"
                />
              </div>
              <div>
                <p className="text-lg font-semibold">Longitude</p>
                <input
                  type="number"
                  id="Longitude"
                  min={-180}
                  max={180}
                  onChange={changehandler}
                  required
                  className="rounded w-full px-4 py-2 text-lg text-gray-700 bg-white border
                   border-gray-300 transition ease-in-out focus:bg-white focus:text-gray-700 focus:border-slate-600
                   text-center"
                />
              </div>
            </div>
          )}
        </div>

        {/* -------------------------------------------Description-------------------------------------------------- */}
        <div>
          <p className="text-lg font-semibold">Description</p>
          <textarea
            type="text"
            id="description"
            value={description}
            className="w-full px-4 py-2 text-xl text-gray-700
                 border-gray-300 rounded transition ease-in-out duration-150 focus:text-gray-700 bg-white
                  focus:border-slate-600 mb-6 "
            onChange={changehandler}
            placeholder="Description"
            required
          />
        </div>

        {/* ---------------------------------------Offer--------------------------------------------------------- */}

        <p className="text-lg mt-6 font-semibold">Offer</p>
        <div className=" flex m-2 uppercase mb-6">
          <button
            type="button"
            id="offer"
            value={true}
            onClick={changehandler}
            className={`px-7 py-3 font-medium uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg 
                    active:shadow-lg transition duration-150 ease-in-out w-full mr-3 ${
                      offer ? "bg-slate-600 text-white" : "bg-white text-black"
                    }`}
          >
            Yes
          </button>
          <button
            type="button"
            id="offer"
            value={false}
            onClick={changehandler}
            className={`px-7 py-3 font-medium uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg 
                    active:shadow-lg transition duration-150 ease-in-out w-full ml-3 ${
                      offer ? "bg-white text-black" : "bg-slate-600 text-white"
                    }`}
          >
            No
          </button>
        </div>
        {/* ------------------------------------RegularPrice---------------------------------------------------------- */}
        <div className="flex items-center mb-6">
          <div className="">
            <p className="text-lg font-semibold ">Regular Price</p>
            <div className="flex w-full justify-center items-center space-x-6">
              <input
                type="number"
                id="regularprice"
                value={regularprice}
                onChange={changehandler}
                min={50}
                max={40000000}
                className="px-4 py-2 text-xl text-gray-700 bg-white border border-gray-700 rounded transition 
              duration-150 ease-in-out focus:bg-white focus: focus:border-slate-600 focus:text-gray-700 text-center
               w-full"
                required
              />
              {type === "rent" && (
                <div className="text-md w-full whitespace-nowrap">
                  <p>$ / Month</p>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* ----------------------------------------------Discounted------------------------------------------- */}
        {offer === true && (
          <div className="flex items-center mb-6">
            <div className="">
              <p className="text-lg font-semibold ">Discounted</p>
              <div className="flex w-full justify-center items-center space-x-6">
                <input
                  type="number"
                  id="discounted"
                  value={discounted}
                  onChange={changehandler}
                  min={50}
                  max={40000000}
                  className="px-4 py-2 text-xl text-gray-700 bg-white border border-gray-700 rounded transition 
              duration-150 ease-in-out focus:bg-white focus: focus:border-slate-600 focus:text-gray-700 text-center
               w-full"
                  required
                />
                {type === "rent" && (
                  <div className="text-md w-full whitespace-nowrap">
                    <p>$ / Month</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        {/* -----------------------------------------------Image----------------------------------------------------- */}
        <div className="mb-6">
          <p className="text-lg font-semibold">Images</p>
          <p className="text-gray-600 ">
            The First Image will be cover (max 6)
          </p>
          <input
            type="file"
            id="image"
            onChange={changehandler}
            accept=".jpg,.png,.jpeg"
            multiple
            required
            className="w-full px-3 py-1.5 text-gray-700 bg-white border border-gray-300 rounded transition 
            duration-150 ease-in-out focus:bg-white focus:border-s-teal-600"
          />
        </div>
        <button
          type="submit"
          className="mb-6 w-full px-7 py-3 bg-blue-600 text-white font-medium text-sm shadow-md 
          uppercase rounded hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg
           active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out "
        >
          Create Listing
        </button>
      </form>
    </main>
  );
}
export default CreateListing;
