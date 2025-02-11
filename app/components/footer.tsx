import React from 'react';
import Image from 'next/image'
const Footer = () => {
  const socialLinks = [
    { name: 'GitHub', url: '#' },
    { name: 'Twitter', url: '#' },
    { name: 'YouTube', url: '#' }
  ];

  const legalLinks = [
    { name: 'Privacy Policy', url: '#' },
    { name: 'Terms of Service', url: '#' },
    { name: 'Join research studies', url: '#' },
    { name: 'Feedback', url: '#' }
  ];

  const resourceLinks = [
    { name: 'Documentation', url: '#' },
    { name: 'API Reference', url: '#' },
    { name: 'Guides', url: '#' },
    { name: 'Examples', url: '#' }
  ];

  return (
    <footer className=" dark:bg-[#211F21] py-12 px-4 sm:px-8 mt-[120px] border-t border-gray-200 dark:border-[#141314]">

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between gap-12 mb-16">
          {/* Brand section */}
          <div className="lg:max-w-xl space-y-6">
            <div className="flex items-center space-x-3">
              <Image
                src="/pic.jpg"
                alt="my blog"
                width={40}
                height={40}
                className="h-10 w-10 rounded-lg"
                
                
              />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">My Blog</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed">
              Our blog is an engaging platform designed to share insightful articles, stories, and ideas.
              Backed by a user-friendly interface and a seamless browsing experience, our website helps readers explore diverse topics,
              connect with others, and stay updated. With a focus on simplicity and accessibility,
              we aim to bring valuable content to your fingertips quickly and beautifully.
            </p>
          </div>

          {/* Links section */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 lg:gap-12">
            {/* Social links */}
            <div className="space-y-4">
              <h3 className="text-gray-900 dark:text-white font-medium text-sm">Social</h3>
              <ul className="space-y-3">
                {socialLinks.map(link => (
                  <li key={link.name}>
                    <a
                      href={link.url}
                      className="flex items-center text-purple-600   dark:text-gray-400 hover:text-gray-600 dark:hover:text-purple-400 text-sm group"
                    >

                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div className="space-y-4">
              <h3 className="text-gray-900 dark:text-white font-medium text-sm">Resources</h3>
              <ul className="space-y-3">
                {resourceLinks.map(link => (
                  <li key={link.name}>
                    <a
                      href={link.url}
                      className="text-purple-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>



          </div>
        </div>

        {/* Bottom section */}
        <div className="pt-8 border-t border-gray-200 dark:border-gray-800 mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex flex-wrap justify-center sm:justify-start gap-6">
              {legalLinks.map(link => (
                <a
                  key={link.name}
                  href={link.url}
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm"
                >
                  {link.name}
                </a>
              ))}
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              © {new Date().getFullYear()} My Blog. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;