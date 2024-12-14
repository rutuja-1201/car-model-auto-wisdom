"use client";
import { useRouter } from "next/navigation";
import CarDetails from "../components/CarDetails";
import CarModel from "../components/CarModel";

const CarPage = () => {
  const router = useRouter();

  const handleConsultation = () => {
    router.push("/consultation");
  };

  return (
    <div className="bg-black text-white min-h-screen">
      <div className="w-full">
        <CarModel />
        <CarDetails />
        <div className="mt-6 text-center pb-12">
          <button
            onClick={handleConsultation}
            className="px-6 py-3 bg-teal-500 text-white font-semibold rounded-lg hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-400"
          >
            Book Consultation
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarPage;
