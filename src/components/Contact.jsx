const Contact = () => {
  return (
    <section className="bg-gradient-to-r from-gray-50 to-red-50 py-20">
      <div className="container mx-auto px-4 max-w-xl">
        <h2 className="text-4xl font-bold text-center mb-10 text-gray-800 animate-fadeInUp">
          Get in Touch ❤️
        </h2>

        <div className="bg-white p-8 rounded-xl shadow-lg animate-fadeInUp space-y-4">
          <input
            type="email"
            placeholder="Your email"
            className="input input-bordered w-full"
          />

          <textarea
            placeholder="Your message..."
            className="textarea textarea-bordered w-full h-28"
          ></textarea>

          <button className="btn btn-error w-full text-white">
            Send Message
          </button>
        </div>
      </div>
    </section>
  );
};

export default Contact;
