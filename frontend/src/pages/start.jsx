import React from "react";
import { Link } from "react-router-dom";
const Start = () => {
    return (
    <div>
        <div className="bg-cover bg-center bg-[url(https://images.unsplash.com/photo-1653964964014-fd17ca30ff01?q=80&w=1088&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] h-screen pt-8 pl-4 pr-4 flex justify-between flex-col w-full bg-[#222931]">
        <img className='w-16 ml-8 ' src = '../images/quickcommutelogo.jpg'>

</img>
            <div className=" pb-8 py-4 px-4" >
            
<h2 className="text-3xl font-semibold text-[#88D4AB] mt-4 ml-8">  
    Get Started with QuickCommute
</h2>
<Link to ='/login'className="flex item-center justify-center  bg-[#FFC107] text-[#222931] w-full py-3 rounded mt-5">Continue</Link>
            </div>
        </div>

    </div>
    )
}

export default Start;
