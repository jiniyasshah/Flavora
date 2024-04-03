import React from 'react';
import { AiOutlineInfoCircle, AiOutlineLink, AiOutlineMail } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-12 px-4 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About Us Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">About Us</h3>
          <p className="text-md leading-8">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla convallis libero nec est luctus, vel tempus tortor laoreet. Curabitur sed dolor id ipsum tristique commodo.
          </p>
        </div>

        {/* Quick Links Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="grid grid-cols-2 gap-2">
            <li className="flex items-center">
              <AiOutlineLink className="mr-2" />
              <Link to="/" className="hover:underline hover:text-blue-300">Home</Link>
            </li>
            <li className="flex items-center">
              <AiOutlineLink className="mr-2" />
              <Link to="/service" className="hover:underline hover:text-blue-300">Services</Link>
            </li>
            <li className="flex items-center">
              <AiOutlineLink className="mr-2" />
              <Link to="/menu" className="hover:underline hover:text-blue-300">Menu</Link>
            </li>
            <li className="flex items-center">
              <AiOutlineLink className="mr-2" />
              <Link to="/about" className="hover:underline hover:text-blue-300">About us</Link>
            </li>
          </ul>
        </div>

        {/* Contact Us Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
          <ul className="flex flex-col gap-2">
            <li className="flex items-center">
              <AiOutlineMail className="mr-2" />
              <a href="mailto:info@example.com" className="hover:underline hover:text-blue-300">info@example.com</a>
            </li>
            <li className="flex items-center">
              <AiOutlineMail className="mr-2" />
              <a href="tel:+1234567890" className="hover:underline hover:text-blue-300">+1 (234) 567-890</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
