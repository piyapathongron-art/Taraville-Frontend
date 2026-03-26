import React from 'react';
import IntroCard from './IntroCard';

function OurSupervisor() {
    return (
        <div className='w-[80%] flex flex-col mx-auto my-15 py-10 overflow-hidden bg-white h-fit border border-base-300 rounded-2xl'>
            <p className='text-4xl font-medium text-center mb-10 text-navy'>ผู้บริหาร</p>
            
            {/* main container*/}
            <div className="relative flex w-full overflow-hidden  ">
                
                {/* animate */}
                <div className="flex animate-showcase group-hover:[animation-play-state:paused]">
                    
                    {/* main Card */}
                    <div className="flex gap-10 pr-5">
                        <IntroCard />
                        <IntroCard />
                        <IntroCard />
                        <IntroCard />
                        
                    </div>

                    {/* for loop */}
                    <div className="flex gap-5 pr-5">
                        <IntroCard />
                        <IntroCard />
                        <IntroCard />
                        <IntroCard />
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default OurSupervisor