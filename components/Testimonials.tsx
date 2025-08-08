'use client';

import { useState, useEffect } from 'react';

export default function Testimonials() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setIsDarkMode(savedTheme === 'dark');
    
    const observer = new MutationObserver(() => {
      const newIsDark = document.documentElement.classList.contains('dark');
      setIsDarkMode(newIsDark);
    });
    
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });
    
    return () => observer.disconnect();
  }, []);

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Marketing Director',
      company: 'TechStart Inc.',
      avatar: 'https://readdy.ai/api/search-image?query=professional%20business%20woman%20portrait%2C%20confident%20marketing%20director%2C%20modern%20office%20setting%2C%20corporate%20headshot%2C%20friendly%20smile%2C%20professional%20attire&width=100&height=100&seq=sarah-johnson&orientation=squarish',
      rating: 5,
      text: 'MarketPlace transformed how we handle our digital projects. The quality of work and professionalism of sellers is outstanding. We\'ve completed over 20 projects with 100% satisfaction.',
      project: 'Brand Identity Package'
    },
    {
      name: 'Michael Chen',
      role: 'Founder',
      company: 'Digital Solutions Co.',
      avatar: 'https://readdy.ai/api/search-image?query=professional%20asian%20businessman%20portrait%2C%20startup%20founder%2C%20modern%20tech%20entrepreneur%2C%20confident%20expression%2C%20business%20casual%20attire%2C%20office%20background&width=100&height=100&seq=michael-chen&orientation=squarish',
      rating: 5,
      text: 'The escrow system gives us complete peace of mind. We can focus on our business knowing that our payments are secure and we\'ll only pay when we\'re completely satisfied with the work.',
      project: 'Website Development'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Creative Director',
      company: 'Brand Studio',
      avatar: 'https://readdy.ai/api/search-image?query=creative%20director%20woman%20portrait%2C%20artistic%20professional%2C%20design%20studio%20environment%2C%20creative%20industry%20professional%2C%20modern%20workspace%20background&width=100&height=100&seq=emily-rodriguez&orientation=squarish',
      rating: 5,
      text: 'As a creative agency, we often need specialized skills for client projects. MarketPlace connects us with top-tier talent that delivers exceptional results every time.',
      project: 'Video Production'
    },
    {
      name: 'David Thompson',
      role: 'E-commerce Manager',
      company: 'RetailMax',
      avatar: 'https://readdy.ai/api/search-image?query=professional%20business%20manager%20portrait%2C%20ecommerce%20executive%2C%20corporate%20professional%2C%20business%20suit%2C%20confident%20professional%20headshot%2C%20office%20setting&width=100&height=100&seq=david-thompson&orientation=squarish',
      rating: 5,
      text: 'The platform\'s user experience is incredible. From browsing services to project delivery, everything is smooth and intuitive. Customer support is also very responsive.',
      project: 'SEO Optimization'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section className={`py-16 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
            What Our Clients Say
          </h2>
          <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto`}>
            Join thousands of satisfied customers who trust MarketPlace for their digital projects
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'} rounded-2xl p-8 md:p-12 border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} ${isDarkMode ? 'shadow-2xl' : 'shadow-lg'} transition-all duration-500`}>
            <div className="text-center">
              <div className="flex justify-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <i
                    key={i}
                    className={`ri-star-fill text-2xl ${i < testimonials[currentTestimonial].rating ? 'text-yellow-400' : 'text-gray-300'}`}
                  ></i>
                ))}
              </div>

              <blockquote className={`text-xl md:text-2xl ${isDarkMode ? 'text-white' : 'text-gray-900'} font-medium leading-relaxed mb-8`}>
                "{testimonials[currentTestimonial].text}"
              </blockquote>

              <div className="flex items-center justify-center space-x-4">
                <img
                  src={testimonials[currentTestimonial].avatar}
                  alt={testimonials[currentTestimonial].name}
                  className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg"
                />
                <div className="text-left">
                  <div className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} text-lg`}>
                    {testimonials[currentTestimonial].name}
                  </div>
                  <div className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} text-sm`}>
                    {testimonials[currentTestimonial].role}
                  </div>
                  <div className={`${isDarkMode ? 'text-cyan-400' : 'text-cyan-600'} text-sm font-medium`}>
                    {testimonials[currentTestimonial].company}
                  </div>
                </div>
              </div>

              <div className={`inline-flex items-center space-x-2 mt-4 px-4 py-2 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full`}>
                <i className={`ri-briefcase-line ${isDarkMode ? 'text-cyan-400' : 'text-cyan-600'} text-sm`}></i>
                <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} text-sm`}>
                  Project: {testimonials[currentTestimonial].project}
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 cursor-pointer ${
                  index === currentTestimonial
                    ? 'bg-gradient-to-r from-cyan-500 to-purple-600 scale-125'
                    : isDarkMode
                    ? 'bg-gray-600 hover:bg-gray-500'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              ></button>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className={`text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent mb-2`}>
              50,000+
            </div>
            <div className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} font-medium`}>
              Happy Customers
            </div>
          </div>
          <div className="text-center">
            <div className={`text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent mb-2`}>
              98.5%
            </div>
            <div className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} font-medium`}>
              Satisfaction Rate
            </div>
          </div>
          <div className="text-center">
            <div className={`text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent mb-2`}>
              200,000+
            </div>
            <div className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} font-medium`}>
              Projects Completed
            </div>
          </div>
          <div className="text-center">
            <div className={`text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent mb-2`}>
              24/7
            </div>
            <div className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} font-medium`}>
              Customer Support
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}