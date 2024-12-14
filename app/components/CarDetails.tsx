const CarDetails = () => {
  return (
    <div className=" text-white p-6 rounded-lg shadow-lg max-w-lg mx-auto mt-8">
      <h2 className="text-3xl font-semibold text-teal-500 mb-4">Car Model: Auto Wisdom</h2>
      <ul className="space-y-3">
        <li className="text-lg">
          <span className="font-semibold">Make:</span> Auto Wisdom
        </li>
        <li className="text-lg">
          <span className="font-semibold">Model:</span> 2024
        </li>
        <li className="text-lg">
          <span className="font-semibold">Key Features:</span> Sleek Design, Electric, AI Assistance
        </li>
      </ul>
    
    </div>
  );
};

export default CarDetails;
