import { getAuth, updateProfile } from "firebase/auth";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../Firebase";
import { FcHome } from "react-icons/fc";
import Itemstructure from "../Components/Itemstructure";

function Profile() {
  const auth = getAuth();

  const [fromdata, setformdata] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });
  const { name, email } = fromdata;

  const [Editstatus, setEditstatus] = useState(false);
  const navigate = useNavigate();

  const [listing, setlisting] = useState(null);
  const [loading, setloading] = useState(true);

  function signouthandler() {
    auth.signOut();
    navigate("/");
  }

  function edithandler() {
    setEditstatus((prevstate) => !prevstate);
    Editstatus && onSubmit();
  }

  function datahandler(event) {
    setformdata((prevstate) => ({
      ...prevstate,
      [event.target.id]: event.target.value,
    }));
  }
  async function onSubmit() {
    try {
      if (auth.currentUser.displayName !== name) {
        const auth = getAuth();
        await updateProfile(auth, auth.currentUser.displayName);

        const docref = doc(db, "users", auth.currentUser.uid);
        await updateDoc(docref, { name });
        toast.success("Profile Updated");
      }
    } catch (error) {
      toast.error("Could Not Update Profile Detail");
    }
  }

  useEffect(() => {
    async function fetchdata() {
      const docRef = collection(db, "listings");

      const q = query(
        docRef,
        where("userRef", "==", auth.currentUser.uid),
        orderBy("timestamp", "desc")
      );

      const querySnap = await getDocs(q);

      console.log(querySnap);
      let datastore = [];
      querySnap.forEach((data) => {
        return datastore.push({ id: data.id, data: data.data() });
      });
      setlisting(datastore);
      setloading(false);
    }
    fetchdata();
  }, [auth.currentUser.uid]);
  async function onDelete(ID) {
    if (window.confirm("Are You Sure You Want TO Delete")) {
      const docref = doc(db, "listings", ID);
      await deleteDoc(docref);
      const updatelist = listing.filter((data) => data.id !== ID);
      setlisting(updatelist);
      toast.success("Successful Updated");
    }
  }
  function onEdit(ID) {
    navigate(`/edit-listing/${ID}`);
  }

  return (
    <>
      <section className="max-w-6xl mx-auto flex justify-center items-center flex-col">
        <h1 className="text-3xl text-center mt-6 font-bold">My Profile</h1>
        <div className="w-full  mt-6 px-3">
          <form>
            <input
              disabled={Editstatus ? false : true}
              type="text"
              id="name"
              value={name}
              placeholder="Profile Name"
              onChange={datahandler}
              className={`"mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded 
              transition ease-in-out"${
                Editstatus && " focus:bg-gray-300 bg-gray-100"
              }`}
            />
            <input
              disabled={Editstatus ? false : true}
              type="email"
              id="email"
              value={email}
              placeholder="Email ID"
              className="mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded 
              transition ease-in-out"
            />

            <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg mb-6">
              <p>
                Do You Want To Change Your Name?
                <span
                  onClick={edithandler}
                  className="text-red-600 hover:text-red-700 transition 
                ease-in-out duration-200  ml-1 cursor-pointer"
                >
                  {Editstatus ? "save" : "Edit"}
                </span>
              </p>
              <p
                className="text-blue-600 hover:text-blue-800 transition ease-in-out duration-200 cursor-pointer"
                onClick={signouthandler}
              >
                Sign out
              </p>
            </div>
          </form>
          <button
            className="w-full text-white bg-blue-600 uppercase px-7 py-3 text-sm font-medium rounded 
          shadow-md hover:bg-blue-700 transition ease-in-out duration-1500 hover:shadow-lg active:bg-blue-900 
          "
          >
            <Link
              to="/create-listing"
              className="flex justify-center items-center "
            >
              <FcHome
                className="mr-2 text-3xl
          rounded-full p-1 border-2 bg-red-200"
              />
              Sell or Rent Your Home
            </Link>{" "}
          </button>
        </div>
      </section>

      <div className="max-w-6xl px-3 mt-6 mx-auto">
        {!loading && listing.length > 0 && (
          <>
            <h2 className="text-2xl text-center font-semibold mb-6">
              My Listings
            </h2>
            <ul className="sm:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
              {listing.map((data) => (
                <Itemstructure
                  key={data.id}
                  id={data.id}
                  listing={data.data}
                  onDelete={() => {
                    onDelete(data.id);
                  }}
                  onEdit={() => {
                    onEdit(data.id);
                  }}
                />
              ))}
            </ul>
          </>
        )}
      </div>
    </>
  );
}
export default Profile;
