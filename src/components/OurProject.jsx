import React from 'react';
import IntroCard from './IntroCard';

function OurProject() {
    return (
        <div className='w-full py-10 overflow-hidden bg-white h-fit'>
            <p className='text-3xl font-medium text-center mb-10'>โครงการของเรา</p>
            
            {/* main container*/}
            <div className="relative flex w-full overflow-hidden group ">
                
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

export default OurProject