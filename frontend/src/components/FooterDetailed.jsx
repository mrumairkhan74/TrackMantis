import React from 'react';

const FooterDetailed = () => {
  const year = new Date().getFullYear();

  return (
    <footer className='w-full bg-gradient-to-r from-slate-600 to-slate-900 text-white pt-8 mt-1'>
      <div className='w-full flex flex-col md:flex-row items-center justify-around px-5 pb-8'>
        <div className="flex flex-col items-center text-center md:items-start md:text-left max-w-xs">
          <h1 className='text-3xl font-bold mb-2 font-[Poppins]'>BugTrack</h1>
          <p className='text-lg'>Helping teams track and manage bugs efficiently since 2024</p>
        </div>

        <div className="flex flex-col items-center m-5">
          <h2 className='text-xl font-semibold font-[Poppins]'>Product</h2>
          <ul className='mt-2 space-y-1 text-lg'>
            <li className='hover:underline'><a href="/">Features</a></li>
            <li className='hover:underline'><a href="/about">Prices</a></li>
            <li className='hover:underline'><a href="/contact">API</a></li>
            <li className='hover:underline'><a href="/privacy">Integration</a></li>
          </ul>
        </div>

        <div className="flex flex-col items-center m-5">
          <h2 className='text-xl font-semibold font-[Poppins]'>Resources</h2>
          <ul className='mt-2 space-y-1 text-lg'>
            <li className='hover:underline'><a href="/">Documentation</a></li>
            <li className='hover:underline'><a href="/about">Help Center</a></li>
            <li className='hover:underline'><a href="/contact">Community</a></li>
            <li className='hover:underline'><a href="/privacy">Changelog</a></li>
          </ul>
        </div>

        <div className="flex flex-col items-center m-5">
          <h2 className='text-xl font-semibold font-[Poppins]'>Company</h2>
          <ul className='mt-2 space-y-1 text-lg'>
            <li className='hover:underline'><a href="/">About</a></li>
            <li className='hover:underline'><a href="/about">Blog</a></li>
            <li className='hover:underline'><a href="/contact">Careers</a></li>
            <li className='hover:underline'><a href="/privacy">Contact</a></li>
          </ul>
        </div>
      </div>
      <div className='w-full  text-center border-t border-gray-200 pt-4 mt-4'>
        <p className='text-xl pb-4'>&copy; {year} BugTrack. All rights reserved.</p>
      </div>

    </footer>
  );
};

export default FooterDetailed;
