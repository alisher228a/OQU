import React from 'react';
import Button from '@/components/Button';

const Cover = () => {
  return (
    <section className="relative bg-gradient-to-r py-16 h-screen flex items-center justify-center">
      <div className="text-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Write <span className='text-blue-700'>college-level</span> research in 30 minutes
          </h1>
        </div>
        <p className="text-lg md:text-xl mb-6">
        Plore will allow you to write a high-quality study in the shortest possible time
        </p>
        <div className="flex justify-center">
        <Button 
            title="Start Research"
            variant="btn_main"
            action="/en/research"
          />
         </div>
      </div>
    </section>
  );
};

export default Cover;
