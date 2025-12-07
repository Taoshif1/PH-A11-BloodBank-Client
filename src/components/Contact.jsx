// ContactUs.jsx
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';

const ContactUs = () => {
  return (
    <section className="bg-red-100 py-20" id="contact">
      <div className="container mx-auto px-4 max-w-7xl">
        <h2 className="text-4xl font-extrabold text-center mb-16 text-gray-800">
          Get in Touch
          <span className="block w-20 h-1 bg-red-500 mx-auto mt-2 rounded-full"></span>
        </h2>
        
        <div className="grid lg:grid-cols-2 gap-12">
          
          {/* Contact Info Side */}
          <div className="space-y-8 p-6 bg-white rounded-xl shadow-lg border-l-4 border-red-500">
            <h3 className="text-2xl font-semibold text-gray-800">Our Details</h3>
            
            <div className="flex items-center gap-4 group">
              <FaPhone className="text-3xl text-red-600 group-hover:scale-110 transition duration-300" />
              <div>
                <p className="text-sm text-gray-500">Call Us</p>
                <p className="text-lg font-medium text-gray-700">+880 123 456 789</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 group">
              <FaEnvelope className="text-3xl text-red-600 group-hover:scale-110 transition duration-300" />
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="text-lg font-medium text-gray-700">support@blooddonor.org</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 group">
              <FaMapMarkerAlt className="text-3xl text-red-600 group-hover:scale-110 transition duration-300" />
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p className="text-lg font-medium text-gray-700">Dhaka, Bangladesh</p>
              </div>
            </div>
          </div>
          
          {/* Contact Form Side */}
          <div className="p-6 bg-white rounded-xl shadow-lg">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">Send Us a Message</h3>
            <form>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text text-gray-700 font-medium">Your Name</span>
                </label>
                <input type="text" placeholder="Taoshif Gazi" className="input input-bordered w-full focus:border-red-500" />
              </div>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text text-gray-700 font-medium">Your Email</span>
                </label>
                <input type="email" placeholder="email@example.com" className="input input-bordered w-full focus:border-red-500" />
              </div>
              <div className="form-control mt-4 mb-6">
                <label className="label">
                  <span className="label-text text-gray-700 font-medium">Message</span>
                </label>
                <textarea className="textarea textarea-bordered h-24 w-full focus:border-red-500" placeholder="Your message"></textarea>
              </div>
              <button type="submit" className="btn btn-lg bg-red-600 text-white w-full hover:bg-red-700 border-none transition duration-300 transform hover:-translate-y-0.5">
                Send Message
              </button>
            </form>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default ContactUs;