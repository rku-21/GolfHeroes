import { useState, useRef, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Home, Menu } from "lucide-react"

import { useQueryPagination } from "../store/useQueryPagination";
import { HomeStore } from "../store/homeStore";

export const SelectCharity = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const navigate = useNavigate();
    const observerRef = useRef();
    const Navigate=useNavigate();
    const {updateCharity}=HomeStore();

    // Track the currently selected charity ID locally
    const [selectedCharityId, setSelectedCharityId] = useState(null);

    const { charityPagination, getCharity, loadMoreCharity, charities } = useQueryPagination();

    // Intersection Observer for Infinite Scroll
    const lastCharityRef = useCallback((node) => {
        if (charityPagination.isLoading) return;
        if (observerRef.current) observerRef.current.disconnect();

        observerRef.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && charityPagination.hasMore) {
                loadMoreCharity();
            }
        });
        if (node) observerRef.current.observe(node);
    }, [charityPagination.isLoading, charityPagination.hasMore, loadMoreCharity]); // Fixed typo here

    // Fetch initial data once on mount
    useEffect(() => {
        getCharity(true);
    }, []); // Added empty array to stop infinite API request loop

    const handleSelectCharity = (charityId) => {
        setSelectedCharityId(charityId);
        
    };
    const handleContinue=(charityId)=>{
        try {
            console.log(charityId)
            updateCharity(charityId);
            Navigate('/home');
        }
        catch(error){
            console.log(error);
        }


    }

    return (
        <>
            {/* Navbar - Kept only the Logo */}
            <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center h-16">
                        {/* Logo */}
                        <div className="flex items-center space-x-2">
                            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-lg">⛳</span>
                            </div>
                            <span className="font-bold text-xl text-gray-900">GolfHeroes</span>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Content Section */}
            <div className="pt-24 px-4 max-w-7xl mx-auto space-y-8">
                <div className="border-t-2 border-gray-200 pt-8">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end w-full px-4 mt-6 gap-4">
                        {/* Left Side: Headings Stacked Vertically */}
                        <div className="flex-1">
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">Explore More Charities</h2>
                            <p className="text-gray-600 mb-0 sm:mb-2">Discover charities you can support and switch your contribution anytime.</p>
                        </div>

                        {/* Right Side: Button aligned cleanly at the baseline/bottom */}
                        <div className="flex-shrink-0">
                            <button
                                disabled={!selectedCharityId}
                                className={`mb-5 rounded-xl font-semibold px-6 py-2.5 transition w-full sm:w-auto ${selectedCharityId
                                        ? "bg-blue-600 text-white hover:bg-blue-700 cursor-pointer shadow-md"
                                        : "bg-gray-200 text-gray-400 cursor-not-allowed border border-gray-300"
                                    }`}
                                    onClick={()=> handleContinue(selectedCharityId)}
                            >
                                Continue
                            </button>

                        </div>
                    </div>

                    {/* Call to action message */}
                    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded-r-xl">
                        <p className="text-blue-700 font-medium">
                            {selectedCharityId
                                ? "✨ Great choice! Ready to move forward with your selection?"
                                : "Please select a charity below to update your active contribution profile."}
                        </p>

                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {charities?.map((charity, index) => {
                            const isLastElement = charities.length === index + 1;
                            const isSelected = selectedCharityId === charity._id;

                            return (
                                <div
                                    key={charity._id}
                                    ref={isLastElement ? lastCharityRef : null}
                                    className={`bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition transform hover:-translate-y-2 border-2 ${isSelected ? "border-green-500 bg-green-50/20" : "border-transparent"
                                        }`}
                                >
                                    <div className="relative h-40 bg-gray-200 overflow-hidden">
                                        <img
                                            src={charity.image}
                                            alt={charity.name}
                                            className="w-full h-full object-cover hover:scale-110 transition duration-300"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                                        <div className="absolute top-3 right-3 text-3xl">{charity.icon}</div>
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-bold text-gray-900 mb-1">{charity.name}</h3>
                                        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{charity.description}</p>
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs text-gray-600">{charity.members || 0} members</span>
                                            <button
                                                onClick={() => handleSelectCharity(charity._id)}
                                                className={`px-3 py-2 rounded-lg transition font-semibold text-sm ${isSelected
                                                    ? "bg-green-700 text-white"
                                                    : "bg-green-600 text-white hover:bg-green-700"
                                                    }`}
                                            >
                                                {isSelected ? "Selected ✓" : "Switch"}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Loading state indicator at bottom */}
                    {charityPagination.isLoading && (
                        <div className="text-center py-4 text-gray-500 font-medium">
                            Loading more charities...
                        </div>
                    )}
                </div>
            </div>




        </>
    );
};
