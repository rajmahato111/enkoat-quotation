import React from "react";
import QuoteForm from "@/components/QuoteForm";

const Quote = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-100 via-gray-50 to-white">
      <main className="flex-1 container mx-auto px-6 md:px-12 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-extrabold text-blue-900 mb-4">IntelliKoat™ Quote Request</h1>
            <p className="text-lg text-gray-600">
              Submit your project details to receive a customized IntelliKoat™ quote for your roofing project.
            </p>
          </div>

          <QuoteForm />

          <div className="mt-12 p-8 bg-white rounded-lg shadow-lg border border-gray-200">
            <h2 className="text-2xl font-bold mb-6 text-blue-800">Why Choose IntelliKoat™?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="space-y-4">
                <h3 className="font-semibold text-yellow-600 text-lg">Energy Efficiency</h3>
                <p className="text-gray-700">
                  Reduce energy consumption by up to 30% with our revolutionary coating technology.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="font-semibold text-yellow-600 text-lg">Extended Roof Life</h3>
                <p className="text-gray-700">
                  Protect your client's roof and extend its lifespan by up to 15 years.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="font-semibold text-yellow-600 text-lg">Cost Savings</h3>
                <p className="text-gray-700">
                  Offer significant long-term cost savings through reduced energy bills and maintenance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} EnKoat. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Quote;