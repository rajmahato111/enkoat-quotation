import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FileTextIcon, BarChart3Icon, ArrowRightIcon } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-blue-800 to-blue-600 py-24">
          <div className="container mx-auto px-6 md:px-12 lg:px-20">
            <div className="max-w-4xl">
              <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
                EnKoat IntelliKoat™ Contractor Portal
              </h1>
              <p className="text-2xl mb-10 text-blue-200">
                Submit project quotes and visualize performance data for your IntelliKoat™ projects.
              </p>
              <div className="flex flex-col sm:flex-row gap-6">
                <Button asChild size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold">
                  <Link to="/quote">
                    <FileTextIcon className="mr-2 h-6 w-6" />
                    Submit a Quote
                  </Link>
                </Button>
                <Button asChild size="lg" className="bg-green-500 hover:bg-green-600 text-black font-semibold">
                  <Link to="/dashboard">
                    <BarChart3Icon className="mr-2 h-6 w-6" />
                    View Dashboard
                  </Link>
                </Button>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-blue-800 to-transparent"></div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6 md:px-12 lg:px-20">
            <h2 className="text-4xl font-bold text-center mb-16 text-blue-900">
              Why Contractors Choose IntelliKoat™
            </h2>
            <div className="grid md:grid-cols-3 gap-12">
              {/* Feature Cards */}
              <div className="bg-blue-50 p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="rounded-full w-16 h-16 flex items-center justify-center bg-blue-200 text-blue-900 mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-blue-600">Increased Profit Margins</h3>
                <p className="text-gray-700 mb-6">
                  Offer premium solutions to your clients with higher profit margins than traditional roofing projects.
                </p>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>20-30% higher margins on projects</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Exclusive contractor certification</span>
                  </li>
                </ul>
              </div>

              <div className="bg-blue-50 p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="rounded-full w-16 h-16 flex items-center justify-center bg-green-200 text-green-900 mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-blue-600">Proven Performance</h3>
                <p className="text-gray-700 mb-6">
                  Back your projects with verified performance data that shows real-world energy and cost savings.
                </p>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>10-30% energy savings for clients</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>5-15°F temperature reduction</span>
                  </li>
                </ul>
              </div>

              <div className="bg-blue-50 p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="rounded-full w-16 h-16 flex items-center justify-center bg-teal-200 text-teal-900 mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-blue-600">Competitive Advantage</h3>
                <p className="text-gray-700 mb-6">
                  Stand out from competitors by offering cutting-edge energy-efficient solutions to your clients.
                </p>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Access to exclusive technology</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Marketing and sales support</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-yellow-400 to-yellow-500">
          <div className="container mx-auto px-6 md:px-12 lg:px-20 text-center">
            <h2 className="text-4xl font-bold mb-6 text-blue-900">
              Ready to increase your project value?
            </h2>
            <p className="text-lg mb-10 text-blue-800 max-w-3xl mx-auto">
              Start offering IntelliKoat™ solutions to your clients today and boost your business with higher-margin projects.
            </p>
            <Button asChild size="lg" className="bg-blue-900 hover:bg-blue-800 text-white font-semibold">
              <Link to="/quote" className="flex items-center">
                Get Started
                <ArrowRightIcon className="ml-3 h-6 w-6" />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center space-x-3">
                <span className="font-bold text-2xl text-yellow-400">EnKoat</span>
                <span className="text-sm bg-yellow-500 text-gray-900 px-3 py-1 rounded-full">
                  IntelliKoat™
                </span>
              </div>
              <p className="text-sm mt-2">
                Innovative roofing solutions for contractors
              </p>
            </div>
            <div className="text-sm">
              &copy; {new Date().getFullYear()} EnKoat. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;