import React from 'react';
import { Crown, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function MemberMembership() {
  const tiers = [
    {
      name: "Free",
      price: "UGX 0",
      features: ["Follow Creators", "Like & Comment", "Access Public Content"],
      color: "from-gray-500 to-gray-600",
      popular: false
    },
    {
      name: "Supporter",
      price: "UGX --",
      features: ["Everything in Free", "Unlock Exclusive Content", "Direct Message Creators", "Support with Tips"],
      color: "from-blue-500 to-teal-500",
      popular: true
    },
    {
      name: "Super Fan",
      price: "UGX --",
      features: ["Everything in Supporter", "Early Access to Content", "Personalized Thank You Notes", "Monthly Q&A with Creators"],
      color: "from-purple-500 to-pink-500",
      popular: false
    },
    {
      name: "Enterprise",
      price: "Contact Us",
      features: ["Branding Services", "Sponsorship Packages", "Marketing Solutions", "Advertising", "Insights"],
      color: "from-pink-500 to-rose-500",
      popular: false
    }
  ];

  return (
    <div className="min-h-screen pt-20 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-playfair font-bold text-white mb-2">Membership</h1>
        <p className="text-gray-300 mb-8">Support your favorite creators and get exclusive perks.</p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tiers.map((tier, index) => (
            <div key={index} className={`glass-effect p-8 rounded-2xl hover-lift relative ${tier.popular ? 'ring-2 ring-blue-400' : ''}`}>
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-blue-500 to-teal-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}

              <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${tier.color} flex items-center justify-center mb-4`}>
                <Crown className="w-6 h-6 text-white" />
              </div>

              <h3 className="text-2xl font-bold text-white mb-2">{tier.name}</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-white">{tier.price}</span>
                {tier.name !== 'Enterprise' && <span className="text-gray-300">/month</span>}
              </div>

              <ul className="space-y-3 mb-8">
                {tier.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-gray-300">
                    <Star className="w-4 h-4 text-green-400 mr-3 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Link
                to="/signup"
                className={`block w-full py-3 text-center font-semibold rounded-lg transition-all duration-300 ${
                  tier.popular
                    ? 'bg-gradient-to-r from-blue-500 to-teal-500 text-white hover:shadow-xl'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                {tier.name === 'Enterprise' ? 'Contact Us' : 'Get Started'}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
