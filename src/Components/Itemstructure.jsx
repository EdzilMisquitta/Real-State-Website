import Moment from "react-moment";
import { Link } from "react-router-dom";
import { IoLocation } from "react-icons/io5";
import { FaTrash } from "react-icons/fa";
import { MdEdit } from "react-icons/md";

function Itemstructure({ listing, id ,onDelete,onEdit }) {
  return (
    <li
      className=" relative bg-white flex flex-col justify-between items-center shadow-md hover:shadow-xl 
    rounded-md overflow-hidden transition-shadow duration-150 m-[10px]"
    >
      <Link className="contents" to={`/category/${listing.type}/${id}`}>
        <img
          src={listing.imgUrls[0]}
          className="h-[170px] w-full object-cover hover:scale-105 transition-scale 
        duration-150 ease-out"
          loading="lazy"
        />
        <Moment
          fromNow
          className="absolute top-2 left-2 bg-[#3377cc] text-white uppercase text-xs 
        font-semibold rounded-md px-2 py-1 shadow-lg"
        >
          {listing.timestamp?.toDate()}
        </Moment>
        <div className="w-full p-[10px]">
          <div className="flex item-center space-x-1">
            <IoLocation className="h-4 w-4 text-green-600" />
            <p className=" font-semibold text-sm mb-[2px] text-gray-600 truncate">
              {listing.address}
            </p>
          </div>
          <p className=" font-semibold m-0 text-xl truncate  ">
            {listing.name}
          </p>
          <p className="text-[#457b9d] mt-2 font-semibold">
            {listing &&
              (listing.offer
                ? `${
                    listing.discounted &&
                    listing.discounted
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }`
                : `${
                    listing.regularprice &&
                    listing.regularprice
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }`)}
            {listing && listing.type === "rent" && " / Month"}
          </p>
        </div>
        <div className="flex item-center mt-[10px] space-x-3">
          <div className=" flex items-center space-x-1">
            <p className="font-semibold text-sm">
              {listing.bedrooms > 1
                ? `${listing.bedrooms} Beds`
                : `${listing.bedrooms} Bed`}
            </p>
          </div>
          <div className=" flex items-center space-x-1">
            <p className="font-semibold text-sm">
              {listing.bathrooms > 1
                ? `${listing.bathrooms} Baths`
                : `${listing.bathrooms} Bath`}
        
            </p>
          </div>
        </div>
      </Link>
      {onDelete && (
        <FaTrash
          className="absolute bottom-2 right-2 h-[14px] cursor-pointer text-red-500"
          onClick={onDelete}
        />
      )}
      {onEdit && (
        <MdEdit
          className="absolute bottom-2 right-7 h-4 cursor-pointer "
          onClick={onEdit}
        />
      )}
    </li>
  );
}
export default Itemstructure;
