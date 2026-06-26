import { useEffect } from "react";
import { HomeStore } from "../store/homeStore";

export const SubscriptionPage = () => {
  const { getAllPlans, allPlans,Subscribe} = HomeStore();

  useEffect(() => {
    getAllPlans();
  }, []);

  const handleSubscribe=(plan)=>{
    Subscribe(plan);
     
  }

  return (
  <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 py-16 px-6">
    <div className="max-w-7xl mx-auto">

      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Choose Your GolfHeroes Plan
        </h1>

        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Join monthly prize draws, track your scores, and support your
          favorite charity while competing with golfers worldwide.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {allPlans?.map((plan) => (
          <div
            key={plan._id}
            className={`relative rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl
            ${
              plan.name?.toLowerCase().includes("year")
                ? "border-4 border-green-500 shadow-xl"
                : "border border-gray-200 shadow-lg"
            }`}
          >

            {plan.name?.toLowerCase().includes("year") && (
              <div className="absolute top-4 right-4 bg-green-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                BEST VALUE
              </div>
            )}

            <div className="bg-white p-8">

              <h2 className="text-3xl font-bold text-gray-900 mb-2 capitalize">
                {plan.name}
              </h2>

              <p className="text-gray-500 mb-8">
                {plan.description}
              </p>

              <div className="mb-8">
                <span className="text-5xl font-bold text-green-600">
                  ₹{plan.price}
                </span>

                <span className="text-gray-500 ml-2">
                  / {plan.duration || "plan"}
                </span>
              </div>

              <div className="space-y-4 mb-10">

                <div className="flex items-center gap-3">
                  <span className="text-green-600 text-xl">✓</span>
                  <span>Participate in Prize Draws</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-green-600 text-xl">✓</span>
                  <span>Track Golf Scores</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-green-600 text-xl">✓</span>
                  <span>Support Selected Charity</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-green-600 text-xl">✓</span>
                  <span>Eligible for Monthly Rewards</span>
                </div>

                {plan.name?.toLowerCase().includes("year") && (
                  <div className="flex items-center gap-3">
                    <span className="text-green-600 text-xl">✓</span>
                    <span>Priority Member Benefits</span>
                  </div>
                )}
              </div>

              <button
                className={`w-full py-4 rounded-xl font-bold text-lg transition-all
                ${
                  plan.name?.toLowerCase().includes("year")
                    ? "bg-green-600 hover:bg-green-700 text-white"
                    : "bg-gray-900 hover:bg-black text-white"
                }`}
                onClick={()=> handleSubscribe(plan)}
              >
                Subscribe Now
              </button>

            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);
};