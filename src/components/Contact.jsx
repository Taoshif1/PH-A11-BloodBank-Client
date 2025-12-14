// Contact.jsx
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';

const ContactUs = () => {
  return (
    <section className="bg-gray-50 py-20" id="contact">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Heading */}
        <h2 className="text-4xl font-extrabold text-center mb-16 text-red-500">
          Get in Touch
          <span className="block w-20 h-1 bg-red-600 mx-auto mt-2 rounded-full"></span>
        </h2>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info Side */}
          <div className="space-y-8 p-8 bg-white rounded-xl shadow-lg border-l-4 border-red-500">
            <h3 className="text-2xl font-semibold text-gray-800">Our Details</h3>

            <div className="flex items-center gap-4 group">
              <FaPhone className="text-3xl text-red-600 group-hover:scale-110 transition-transform duration-300" />
              <div>
                <p className="text-sm text-gray-500">Call Us</p>
                <p className="text-lg font-medium text-gray-700">+880 123 456 789</p>
              </div>
            </div>

            <div className="flex items-center gap-4 group">
              <FaEnvelope className="text-3xl text-red-600 group-hover:scale-110 transition-transform duration-300" />
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="text-lg font-medium text-gray-700">support@blooddonor.org</p>
              </div>
            </div>

            <div className="flex items-center gap-4 group">
              <FaMapMarkerAlt className="text-3xl text-red-600 group-hover:scale-110 transition-transform duration-300" />
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p className="text-lg font-medium text-gray-700">Dhaka, Bangladesh</p>
              </div>
            </div>
          </div>

          {/* Contact Form Side */}
          <div className="p-8 bg-white rounded-xl shadow-lg">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">Send Us a Message</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-1">Your Name</label>
                <input
                  type="text"
                  placeholder="Taoshif Gazi"
                  className="input input-bordered w-full focus:border-red-500 focus:ring focus:ring-red-100 rounded-lg transition"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">Your Email</label>
                <input
                  type="email"
                  placeholder="email@example.com"
                  className="input input-bordered w-full focus:border-red-500 focus:ring focus:ring-red-100 rounded-lg transition"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">Message</label>
                <textarea
                  placeholder="Your message"
                  className="textarea textarea-bordered w-full h-32 focus:border-red-500 focus:ring focus:ring-red-100 rounded-lg transition"
                ></textarea>
              </div>
              <button
                type="submit"
                className="btn bg-red-600 text-white w-full hover:bg-red-700 hover:-translate-y-0.5 transform transition duration-300 border-none rounded-lg py-3"
              >
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
