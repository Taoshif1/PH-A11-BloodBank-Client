// Home.jsx
import Banner from '../components/Banner';
import Ticker from '../components/Ticker';
import Features from '../components/Features';
import Contact from '../components/Contact';

const Home = () => {
  return (
    <div className="flex-grow max-w-4xl mx-auto text-center ">
      
      {/* 1. Scrolling Ticker */}
      <Ticker />
      
      {/* 2. Main Banner */}
      <Banner />
      
      {/* 3. Featured Section */}
      <Features />
      
      {/* 4. Call to Action Section (Styling only) */}
      <section className="py-16 bg-red-600/10">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h3 className="text-3xl font-bold text-gray-300 mb-4">Ready to Save a Life?</h3>
          <p className="text-lg text-gray-500 mb-8">
            Check the latest donation requests in your area and volunteer instantly to become a lifesaver.
          </p>
          <div className="flex justify-center gap-4">
            <a href="/donation-requests" className="btn btn-lg bg-red-600 text-white hover:bg-red-700 border-none shadow-lg">
              View Urgent Requests
            </a>
          </div>
        </div>
      </section>
      
      {/* 5. Contact Section */}
      <Contact />
      
    </div>
  );
};

export default Home;