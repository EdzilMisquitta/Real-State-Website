import React from "react";
import { data } from "./data";

function Aboutus(props) {
  return (

    <section>
          <h1 className="text-center text-5xl mt-6 mb-11 font-serif font-bold">
            About Us
          </h1>
      <ul>
        <li>
          <h1 className="text-center text-3xl mt-6 font-serif font-bold">
            {data[0].title}
          </h1>
          <div className="flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto ">
            <div className="lg:w-[50%] md:w-[67%] mb-12 md:mb-6 ">
              <img className="w-full rounded-2xl" src={data[0].image} />
            </div>
            <div className="w-full md:w-[67%] lg:w-[40%] lg:ml-20">
              <h2 className="max-w-lg m-auto text-center">{data[0].info}</h2>
            </div>
          </div>
        </li>
        <li>
          <h1 className="text-center text-3xl mt-6 font-serif font-bold">
            {data[1].title}
          </h1>

          <div className="flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto ">
            <div className="lg:w-[50%] md:w-[67%] mb-12 md:mb-6 ">
              <h2 className="max-w-lg m-auto text-center">{data[1].info}</h2>
            </div>
            <div className="w-full md:w-[67%] lg:w-[40%] lg:ml-20">
              <img className="w-full rounded-2xl" src={data[1].image} />
            </div>
          </div>
        </li>

        <li>
          <h1 className="text-center text-3xl mt-6 font-serif font-bold">
            {data[2].title}
          </h1>

          <div className="flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto ">
            <div className="lg:w-[50%] md:w-[67%] mb-12 md:mb-6 ">
            <img className="w-full rounded-2xl" src={data[2].image} />
            </div>
            <div className="w-full md:w-[67%] lg:w-[40%] lg:ml-20">
              
              <h2 className="max-w-lg m-auto text-center">{data[2].info}</h2>
            </div>
          </div>
        </li>

        
        <li>
          <h1 className="text-center text-3xl mt-6 font-serif font-bold">
            {data[3].title}
          </h1>

          <div className="flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto ">
            <div className="lg:w-[50%] md:w-[67%] mb-12 md:mb-6 ">
            
            <h2 className="max-w-lg m-auto text-center">{data[3].info}</h2>
            </div>
            <div className="w-full md:w-[67%] lg:w-[40%] lg:ml-20">
              
            <img className="w-full rounded-2xl" src={data[3].image} />
            </div>
          </div>
          
        </li>

        <li>
          <h1 className="text-center text-3xl mt-6 font-serif font-bold">
            {data[4].title}
          </h1>

          <div className="flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto ">
            <div className="lg:w-[50%] md:w-[67%] mb-12 md:mb-6 ">
            
            <img className="w-full rounded-2xl" src={data[4].image} />
            </div>
            <div className="w-full md:w-[67%] lg:w-[40%] lg:ml-20">
              
            
            <h2 className="max-w-lg m-auto text-center">{data[4].info}</h2>
            </div>
          </div>
          
        </li>

        
        <li>
          <h1 className="text-center text-3xl mt-6 font-serif font-bold">
            {data[5].title}
          </h1>
          <div className="flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto ">
            <div className="lg:w-[50%] md:w-[67%] mb-12 md:mb-6 ">
            
            <h2 className="max-w-lg m-auto text-center">{data[5].info}</h2>
            </div>
            <div className="w-full md:w-[67%] lg:w-[40%] lg:ml-20">
              
            <img className="w-full rounded-2xl" src={data[5].image} />
            </div>
          </div>
         
        </li>
     
      </ul>
    </section>
  );
}

export default Aboutus;
