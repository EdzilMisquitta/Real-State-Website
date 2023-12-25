import { getAuth } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore"
import { useEffect, useState } from "react"
import { db } from "../Firebase"
import { toast } from "react-toastify"

function Contact({ownerID,Listing}){
    const auth =getAuth()
    const [data,setdata]=useState(null)
    const [message,setmessage]=useState("")
    useEffect(()=>{
        async function landlord(){
            const docRef=doc(db,"users",ownerID)
            const docsnap= await getDoc(docRef)
            if(docsnap.exists()){
                setdata(docsnap.data())
                console.log(data)
            }else{
                toast.error("Could not get landlord data")
            }
        }
        landlord()
    },[ownerID])
    function messagehandler(event){
        setmessage(event.target.value)
    }

    return(
        <>
        <div  className="flex flex-col w-full">
           <p>
            Contact Owner - {data?.name} For {Listing.name.toLowerCase()}
            </p>
           <div className="mt-3 mb-6">
            <textarea name="message" id="message" value={message} rows={2} onChange={messagehandler}  
            className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded 
            transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600">
            </textarea>
           </div>
           <a href={`mailto:${data?.email}?subject=${data?.name}&body${message}`}>
           <button className="px-7 py-3 bg-blue-600 text-white rounded text-sm uppercase shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full text-center mb-6" type="button">
              Send Message
            </button>
            </a>
        </div>
        </>
    )
}
export default Contact