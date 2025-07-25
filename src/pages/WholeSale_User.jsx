import React from 'react';

const WelcomePage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-100">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-blue-500 mb-4">Welcome Wholesale User!</h1>
        <p className="text-xl text-gray-600">
          We're glad to have you in the game. Let's get started and enjoy the experience!
        </p>
      </div>
    </div>
  );
};

export default WelcomePage;
