import { useEffect, useState } from 'react';
import { Menu, X, ChevronRight, Award, Heart, TrendingUp, Smartphone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { HomeStore } from '../store/homeStore';
import { steps } from '../staticData/landingPageData';


export const LandingPage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const {getAllPlans,allPlans}=HomeStore();
  const Navigate=useNavigate();

  const decodedBytesSteps=Uint8Array.fromBase64(steps);
  const newSteps=JSON.parse(new TextDecoder().decode(decodedBytesSteps));

  useEffect(()=>{
    getAllPlans();
  },[])


 const {exploreCha}=HomeStore();


  const charities = [
    {
      id: 1,
      name: 'Global Wildlife Fund',
      description: 'Protecting endangered species and their habitats worldwide.',
      image: 'https://media.istockphoto.com/id/499262824/photo/blackbuck.jpg?s=2048x2048&w=is&k=20&c=Rv0u86vZCemNYdBUoEfW4nPTL5goStzPVmGueL_tTpg=',
      visit:'https://globalwildlifefund.org/',
      
      icon: '🦁'
    },
    {
      id: 2,
      name: 'Clean Water Initiative',
      description: 'Providing clean drinking water to communities in need.',
      image: 'https://images.unsplash.com/photo-1538300342682-cf57afb97285?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      visit:'https://globalwellnessinstitute.org/initiatives/clean-water-initiative/',
      icon: '💧'
    },
    {
      id: 3,
      name: 'Education for All',
      description: 'Empowering children through quality education and scholarships.',
      image: 'https://images.unsplash.com/photo-1758270703813-2ecf235a6462?q=80&w=1331&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      visit:'https://educationforallinindia.com/',
      icon: '📚'
    },
    {
      id: 4,
      name: 'Health & Wellness',
      description: 'Supporting medical research and healthcare access globally.',
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=500&h=300&fit=crop',
      visit:'https://udgifoundation.org/health-wellness/?https://www.udgifoundation.org/?trackingid=googlead&campaign=23289059507&adgroup=&keyword=&gad_source=1&gad_campaignid=23289088454&gbraid=0AAAAAqCTvSqx_r8adkwiZR3Jg08MqzN0p&gclid=CjwKCAjw3ejRBhAdEiwADkqPn4v_0_M2etNGxmAucNd3ajq_HrklAhT61R53dyKwosQw95XycrlPJhoCI6sQAvD_BwE',
      icon: '⚕️'
    }
  ];


  

  const whyChooseUs = [
    {
      icon: <Award className="w-8 h-8" />,
      title: 'Monthly Rewards',
      description: 'Win exciting prizes every month while playing the game you love.'
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'Support Charities',
      description: 'Every subscription directly supports charities that make a real difference.'
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Track Performance',
      description: 'Monitor your golf performance with detailed analytics and insights.'
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: 'Easy Dashboard',
      description: 'Intuitive interface designed for golfers of all skill levels.'
    }
  ];

  

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Bar */}
      <nav className="fixed w-full bg-white shadow-md z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">⛳</span>
              </div>
              <span className="font-bold text-xl text-gray-900">GolfHeroes</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#home" className="text-gray-700 hover:text-green-600 transition font-medium">Home</a>
              <a href="#charities" className="text-gray-700 hover:text-green-600 transition font-medium">Charities</a>
              <a href="#how-it-works" className="text-gray-700 hover:text-green-600 transition font-medium">How It Works</a>
              <button className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:border-green-600 hover:text-green-600 transition font-medium"
              onClick={()=> Navigate('/login')}
              
              >
                Login
              </button>
              <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium"
              onClick={()=> Navigate('/signup')}
              >
                Sign Up
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-gray-700 hover:text-green-600"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden pb-4 space-y-2">
              <a href="#home" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">Home</a>
              <a href="#charities" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">Charities</a>
              <a href="#how-it-works" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">How It Works</a>
              <button className="w-full mt-2 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:border-green-600 transition"
              onClick={()=> Navigate('/signup')}
              
              
              >
                Login
              </button>
              <button className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              onClick={()=> Navigate('/signup')}
              >
                Sign Up
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Play Golf. <span className="text-green-600">Win Rewards.</span> Support Charities.
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Track your golf scores, participate in monthly prize draws, and make a difference by supporting your favorite charity—all with one subscription.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="px-8 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold text-lg flex items-center justify-center gap-2"
                onClick={()=> Navigate('/signup')}
                
                >
                  Get Started <ChevronRight size={20} />
                </button>
                <button className="px-8 py-4 border-2 border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition font-semibold text-lg"
                onClick={()=> Navigate('/login')}
                
                >
                  Login
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-emerald-600 rounded-3xl opacity-10 blur-3xl"></div>
              <div className="relative bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl p-8 text-white shadow-2xl">
                <div className="text-center">
                  <div className="text-6xl mb-4">⛳</div>
                  <h3 className="text-2xl font-bold mb-2">Join 10,000+ Golfers</h3>
                  <p className="text-green-100">Already winning rewards and supporting charities</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Simple steps to start winning and giving back</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {newSteps.map((step, index) => (
              <div key={step.number} className="relative">
                <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 hover:border-green-600 hover:shadow-lg transition">
                  <div className="text-5xl mb-4">{step.icon}</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{step.number}. {step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ChevronRight className="w-8 h-8 text-green-600" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Why Choose GolfHeroes</h2>
            <p className="text-xl text-gray-600">Everything you need to enjoy golf and make an impact</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((item, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition">
                <div className="text-green-600 mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Featured Charities Section */}
      <section id="charities" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Featured Charities</h2>
            <p className="text-xl text-gray-600">Support causes that matter to you</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {charities?.map((charity) => (
              <div key={charity.id} className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition transform hover:-translate-y-2">
                <div className="relative h-48 bg-gray-200 overflow-hidden">
                  <img
                    src={charity.image}
                    alt={charity.name}
                    className="w-full h-full object-cover hover:scale-110 transition duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                  <div className="absolute top-4 right-4 text-4xl">{charity.icon}</div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{charity.name}</h3>
                  <p className="text-gray-600">{charity.description}</p>
                  <button className="mt-4 w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold"
                  onClick={()=>window.location.href=`${charity.visit}`}
                  >
                    Learn More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      

      {/* Subscription Plans Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Subscription Plans</h2>
            <p className="text-xl text-gray-600">Choose the plan that works best for you</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {allPlans?.map((plan, index) => (
              <div
                key={index}
                className={`rounded-2xl p-8 transition transform hover:-translate-y-2 ${
                  plan.highlighted
                    ? 'bg-gradient-to-br from-green-600 to-emerald-600 text-white shadow-2xl md:scale-105'
                    : 'bg-white border-2 border-gray-200 hover:border-green-600'
                }`}
              >
                {plan.savings && (
                  <div className="inline-block bg-yellow-400 text-gray-900 px-4 py-1 rounded-full text-sm font-bold mb-4">
                    {plan.savings}
                  </div>
                )}
                <h3 className={`text-2xl font-bold mb-2 ${plan.highlighted ? 'text-white' : 'text-gray-900'}`}>
                  {plan.name}
                </h3>
                <div className="mb-6">
                  <span className="text-5xl font-bold">{plan.price}</span>
                  <span className={plan.highlighted ? 'text-green-100' : 'text-gray-600'}>{plan.period}</span>
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <span className="text-lg">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-3 rounded-lg font-bold transition ${
                    plan.highlighted
                      ? 'bg-white text-green-600 hover:bg-gray-100'
                      : 'bg-green-600 text-white hover:bg-green-700'
                  }`}
                  onClick={()=> Navigate('/login')}
                >
                  Subscribe Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Make a Difference?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of golfers who are winning rewards while supporting charities they care about.
          </p>
          <button className="px-8 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold text-lg"
          onClick={()=> Navigate('/signup')}
          
          >
            Get Started Today
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 text-gray-400 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">⛳</span>
                </div>
                <span className="font-bold text-white">GolfHeroes</span>
              </div>
              <p className="text-sm">Play Golf. Win Rewards. Support Charities.</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-green-600 transition">Features</a></li>
                <li><a href="#" className="hover:text-green-600 transition">Pricing</a></li>
                <li><a href="#" className="hover:text-green-600 transition">Security</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-green-600 transition">About</a></li>
                <li><a href="#" className="hover:text-green-600 transition">Blog</a></li>
                <li><a href="#" className="hover:text-green-600 transition">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-green-600 transition">Privacy</a></li>
                <li><a href="#" className="hover:text-green-600 transition">Terms</a></li>
                <li><a href="#" className="hover:text-green-600 transition">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>© 2026 GolfHeroes. All rights reserved. | Designed & Developed by &nbsp;
                <a href='https://rku21.me' className="text-blue-600">
                  rku21
                </a>
                &nbsp;
                </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
