import { FaHandHoldingHeart, FaUsers, FaHeartbeat } from 'react-icons/fa';

const features = [
  {
    icon: FaHandHoldingHeart,
    title: 'Save Lives',
    description: 'One donation can save up to three lives. Be a hero for someone in critical need.',
  },
  {
    icon: FaUsers,
    title: 'Community Support',
    description: 'Join a network of donors and volunteers to support your local community.',
  },
  {
    icon: FaHeartbeat,
    title: 'Health Benefits',
    description: 'Donating blood regularly can improve your health and wellbeing.',
  },
];

const Features = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-16 text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-red-600 mb-12">
        Why Donate Blood?
      </h2>
      <div className="grid grid-cols-3 md:grid-cols-3 gap-8">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="text-red-500 text-4xl mb-4 inline-block">
                <Icon />
              </div>
              <h3 className="text-xl text-red-600 font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Features;
