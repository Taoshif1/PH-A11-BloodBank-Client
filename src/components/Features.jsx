import { FaHandHoldingHeart, FaUsers, FaHeartbeat } from "react-icons/fa";

const Features = () => {
  return (
    <section className="container mx-auto py-20 px-4">
      <h2 className="text-4xl font-bold text-center mb-14 text-gray-800 animate-fadeInUp">
        Why Donate Blood?
      </h2>

      <div className="grid md:grid-cols-3 gap-8">
        {[
          {
            icon: <FaHandHoldingHeart />,
            title: "Save Lives",
            text: "One donation can save up to three lives. Be someone's hero."
          },
          {
            icon: <FaUsers />,
            title: "Strong Community",
            text: "Join thousands of donors making real-world impact."
          },
          {
            icon: <FaHeartbeat />,
            title: "Health Benefits",
            text: "Helps maintain heart health and reduces health risks."
          }
        ].map((item, index) => (
          <div
            key={index}
            className="card bg-base-100 shadow-xl hover:scale-105 transition-transform duration-300 animate-fadeInUp"
          >
            <div className="card-body items-center text-center">
              <div className="text-6xl text-error mb-4 animate-pulse">
                {item.icon}
              </div>
              <h3 className="card-title text-2xl">{item.title}</h3>
              <p className="text-gray-600">{item.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
