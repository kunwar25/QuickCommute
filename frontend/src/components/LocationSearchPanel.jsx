import React from "react";

const LocationSearchPanel = (props) => {

    const locations = [
        "24B, Near Kapoors's Cafe, Army Cantt, Kolkata",
        "22B, Near Kirana Store, Armirul, Kolkata",
        "21B, Near Raj Store, Amy Road, Kolkata",
        "20D, Near Kaliram sweet shop, Sujad Colony, Kolkata",
        "19B, Near Sujata's Medical Store, Kolkata",
    ]






    return (
        <div>
        {/* <h1>this is a sample data</h1> */}
        {
            locations.map((elem,idx)=>{
                return  <div onClick={()=>{
                    props.setVehiclePanelOpen(true);
                    props.setPanelOpen(false);
                    
                }} className="flex items-center my-2 border-2 border-white active:border-black px-2 rounded-xl gap-4 justify-start">
                <h2 className="bg-[#eee] h-8 w-12 flex items-center rounded-full justify-center  "><i className="ri-map-pin-fill "></i></h2>
                <h4  className="font-medium ">{elem}</h4>
            </div>
            })
}
        
        </div>
    );
    }

export default LocationSearchPanel;