// app/not-found.js

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const NotFound = () => {
    return (
        <div style={{ textAlign: 'center', padding: '50px' }}>
            <div className='flex items-center justify-center max-w-full max-h-full mb-6'>
                <Image
                    src="/404.png" // Ensure 404.png is in the public directory
                    width={500}       // Set width for the container
                    height={300}      // Set height for the container
                    className="w-auto h-auto"
                    layout="intrinsic"  // Use this if you want the image to scale based on intrinsic size
                    alt="404 - Page Not Found" // Always add an alt attribute for accessibility
                    priority
                />
            </div>

            <h1 style={{ fontSize: '2.6rem' }} className='text-black dark:text-white font-google-sans'>This page cannot be found</h1>
            <p style={{ fontSize: '1.1rem' }} className='text-black dark:text-white font-google-sans'>
                Try a different destination or head back to<br/> the&nbsp;
                <Link
                    href="/"
                    style={{ color: '#6442D6', textDecoration: 'underline' }} // Style applied directly to the Link
                >
                    homepage
                </Link>.
            </p>
        </div>
    );
};

export default NotFound;
