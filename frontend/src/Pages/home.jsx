import React, { useState } from 'react';
import defaultProfileImage from "../assets/golfheroes.jpg";
import { useAuthStore } from '../store/useAuthStore';
import { Menu, X, BarChart3, Trophy, Heart, Award, Upload, Settings, LogOut, ChevronRight, TrendingUp, Users, Calendar, Target, Search, Bell, User as UserIcon } from 'lucide-react';
import { useEffect } from 'react';
import { HomeStore } from '../store/homeStore';

export const HomePage = () => {
  const [sidebarOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [scoreInput, setScoreInput] = useState('');
  const [courseInput, setCourseInput] = useState('');



  const { logout, authUser } = useAuthStore();
  const { getDashboard, dashboardData, getScoreHistroy, ScoresHistroy, getallExploreCha, exploreCha, getMycharity, mycharity,getDrawHistory,drawHistory } = HomeStore();

  // Sidebar navigation items
  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <BarChart3 size={20} /> },
    { id: 'scores', label: 'My Scores', icon: <Target size={20} /> },
    { id: 'subscription', label: 'Subscription', icon: <Trophy size={20} /> },
    { id: 'charity', label: 'My Charity', icon: <Heart size={20} /> },
    { id: 'draws', label: 'Draw Results', icon: <Award size={20} /> },
    { id: 'profile', label: 'Profile', icon: <UserIcon size={20} /> }
  ];

  const [showDrawDetails, setShowDrawDetails] = useState(false);

  useEffect(() => {
    getDashboard();
  }, [authUser]);

  useEffect(() => {
    if (activeTab == 'scores') {
      getScoreHistroy();
    }
  }, [activeTab]);

  useEffect(() => {
    getallExploreCha();

  }, [activeTab])

  useEffect(() => {
    if (activeTab == 'charity') {
      getMycharity();
    }

  }, [activeTab])

  useEffect(()=>{
    if(activeTab=='draws'){
      getDrawHistory();
       
    }
  },[activeTab]);                       


  const handleLogout = () => {
    logout();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="fixed top-0 w-full bg-white shadow-md z-40">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">⛳</span>
              </div>
              <span className="font-bold text-xl text-gray-900">GolfHeroes</span>
            </div>

            {/* Right side icons */}
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-600 hover:text-green-600 relative">
                <Bell size={24} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="hidden sm:flex items-center space-x-3 pl-4 border-l border-gray-200">
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">{authUser.username}</p>
                  <p className="text-xs text-gray-600">{authUser.subscription}</p>
                </div>
                <img
                  src={authUser.profilePicture || defaultProfileImage}
                  alt={authUser.username}
                  className="w-10 h-10 rounded-full"
                />
              </div>
              <button
                onClick={() => setMobileMenuOpen(!sidebarOpen)}
                className="md:hidden p-2 text-gray-600 hover:text-green-600"
              >
                {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex pt-16">
        {/* Sidebar */}
        <aside
          className={`fixed md:static w-64 h-screen bg-white shadow-lg transform transition-transform duration-300 z-30 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
            }`}
        >
          <div className="p-6 space-y-8">
            {/* User Profile Card */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-4 border border-green-200">
              <div className="text-center">
                <img
                  src={authUser.profilePicture || defaultProfileImage}
                  alt={authUser.username}
                  className="w-16 h-16 rounded-full mx-auto mb-3"
                />
                <h3 className="font-bold text-gray-900">{authUser.username}</h3>
                <p className="text-xs text-gray-600 mt-1">{authUser.email}</p>
                <div className="mt-3 pt-3 border-t border-green-200">
                  <p className="text-xs font-semibold text-green-600">{authUser.subscription}</p>
                </div>
              </div>
            </div>

            {/* Navigation Items */}
            <nav className="space-y-2">
              {sidebarItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition ${activeTab === item.id
                    ? 'bg-green-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                    }`}
                >
                  <span className={activeTab === item.id ? 'text-white' : 'text-gray-600'}>
                    {item.icon}
                  </span>
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </nav>

            {/* Logout Button */}
            <button className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition font-medium"
              onClick={handleLogout}
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 md:ml-0 p-4 sm:p-6 lg:p-8">
          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8">
              {/* Welcome Header */}
              <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-8 text-white shadow-lg">
                <h1 className="text-4xl font-bold mb-2">Welcome back, {authUser.username}!</h1>

              </div>


              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

                <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-gray-600 font-semibold">Current Draw</h3>
                    <Trophy className="text-yellow-500" size={24} />
                  </div>

                  <p className="text-3xl font-bold text-gray-900 capitalize">
                    {dashboardData?.currentDraw?.status}
                  </p>

                  <p className="text-green-600 font-semibold mt-2">
                    Jackpot: ${dashboardData?.currentDraw?.jackpot}
                  </p>

                  <button
                    onClick={() => setShowDrawDetails(!showDrawDetails)}
                    className="mt-4 text-green-600 font-medium hover:text-green-700 flex items-center gap-1"
                  >
                    {showDrawDetails ? "Hide Details" : "Know More"} ›
                  </button>

                  {showDrawDetails && (
                    <div className="mt-4 border-t pt-4">
                      <div className="space-y-2 text-sm text-gray-600">
                        <p>
                          <strong>Month:</strong>{" "}
                          {dashboardData?.currentDraw?.month}
                        </p>

                        <p>
                          <strong>Year:</strong>{" "}
                          {dashboardData?.currentDraw?.year}
                        </p>

                        <p>
                          <strong>Status:</strong>{" "}
                          {dashboardData?.currentDraw?.status}
                        </p>

                        <p>
                          <strong>Winning Numbers:</strong>{" "}
                          {dashboardData?.currentDraw?.winningNumbers?.join(", ")}
                        </p>

                        <p>
                          <strong>Jackpot Prize:</strong> $
                          {dashboardData?.currentDraw?.jackpot}
                        </p>

                        <div className="bg-green-50 p-3 rounded-lg mt-3">
                          <p className="text-green-700 text-xs">
                            Upload your latest golf scores to participate in
                            upcoming draws.
                          </p>

                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Scores Uploaded */}
                <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-gray-600 font-semibold">Scores Uploaded</h3>
                    <Target className="text-blue-500" size={24} />
                  </div>
                  <p className="text-4xl font-bold text-gray-900">{dashboardData?.averageScore}</p>
                  <p className="text-sm text-gray-600 mt-2">This month: 6 scores</p>
                </div>

                {/* Events Participated */}
                <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-gray-600 font-semibold">Events Participated</h3>
                    <Users className="text-purple-500" size={24} />
                  </div>
                  <p className="text-4xl font-bold text-gray-900">{dashboardData?.totalDrawsPlayed}</p>
                  <p className="text-sm text-gray-600 mt-2">Since joining</p>
                </div>

                {/* Total Winnings */}
                <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-gray-600 font-semibold">Total Winnings</h3>
                    <TrendingUp className="text-green-500" size={24} />
                  </div>
                  <p className="text-4xl font-bold text-gray-900">{dashboardData?.totalWinnings}</p>
                  <p className="text-sm text-gray-600 mt-2">All time</p>
                </div>

                {/* Charity Donated */}
                <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-gray-600 font-semibold">Charity Donated</h3>
                    <Heart className="text-red-500" size={24} />
                  </div>
                  <p className="text-4xl font-bold text-gray-900">{dashboardData?.totalDonated}</p>

                </div>

                {/* Subscription Status */}
                <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-gray-600 font-semibold">Subscription</h3>
                    <Award className="text-indigo-500" size={24} />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{authUser.subscription}</p>
                  <p className="text-sm text-green-600 mt-2">{authUser.subscriptionExpiry}</p>
                </div>
              </div>

              {/* Upload Score Section */}
              <div className="bg-white rounded-2xl p-8 shadow-md">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Upload size={24} className="text-green-600" />
                  Upload Your Latest Score
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Course Name
                    </label>
                    <input
                      type="text"
                      value={courseInput}
                      onChange={(e) => setCourseInput(e.target.value)}
                      placeholder="e.g., Pebble Beach Golf Links"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-600 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Your Score
                    </label>
                    <input
                      type="number"
                      value={scoreInput}
                      onChange={(e) => setScoreInput(e.target.value)}
                      placeholder="e.g., 78"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-600 transition"
                    />
                  </div>
                </div>
                <button className="mt-6 px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold flex items-center gap-2">
                  <Upload size={20} />
                  Upload Score
                </button>
              </div>

              {/* Recent Scores */}
              <div className="bg-white rounded-2xl p-8 shadow-md">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Scores</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-gray-200">
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">
                          Score
                        </th>

                        <th className="text-left py-3 px-4 font-semibold text-gray-900">
                          Played On
                        </th>

                        <th className="text-left py-3 px-4 font-semibold text-gray-900">
                          Uploaded On
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {dashboardData?.recentScores?.map((score) => (
                        <tr
                          key={score._id}
                          className="border-b border-gray-100 hover:bg-gray-50"
                        >
                          <td className="py-4 px-4">
                            <span className="font-bold text-green-600 text-lg">
                              {score.score}
                            </span>
                          </td>

                          <td className="py-4 px-4 text-gray-600">
                            {new Date(score.playedOn).toLocaleDateString()}
                          </td>

                          <td className="py-4 px-4 text-gray-600">
                            {new Date(score.createdAt).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* My Scores Tab */}
          {activeTab === 'scores' && (
            <div className="space-y-8">
              <h1 className="text-3xl font-bold text-gray-900">My Scores</h1>
              <div className="bg-white rounded-2xl p-8 shadow-md">
                <div className="overflow-x-auto">
                  <table className="w-full">

                    <thead>
                      <tr className="border-b-2 border-gray-200">
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">
                          Score
                        </th>

                        <th className="text-left py-3 px-4 font-semibold text-gray-900">
                          Played On
                        </th>

                        <th className="text-left py-3 px-4 font-semibold text-gray-900">
                          Uploaded On
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {ScoresHistroy?.map((score) => (
                        <tr
                          key={score._id}
                          className="border-b border-gray-100 hover:bg-gray-50"
                        >
                          <td className="py-4 px-4">
                            <span className="font-bold text-green-600 text-lg">
                              {score.score}
                            </span>
                          </td>

                          <td className="py-4 px-4 text-gray-600">
                            {new Date(score.playedOn).toLocaleDateString()}
                          </td>

                          <td className="py-4 px-4 text-gray-600">
                            {new Date(score.createdAt).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === "subscription" && (
            <div className="space-y-8">
              <h1 className="text-3xl font-bold text-gray-900">
                Subscription Details
              </h1>

              <div className="grid lg:grid-cols-2 gap-8">

                {/* Current Subscription */}
                <div className="bg-gradient-to-br from-green-600 to-emerald-600 text-white rounded-2xl p-8 shadow-lg">
                  <h2 className="text-2xl font-bold mb-4">
                    Current Plan
                  </h2>

                  <p className="text-4xl font-bold mb-2 capitalize">
                    {dashboardData?.subscription?.plan || "No Plan"}
                  </p>

                  <p className="text-green-100 mb-6 capitalize">
                    Status:{" "}
                    {dashboardData?.subscription?.status || "Inactive"}
                  </p>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2">
                      <span>✓</span>
                      <span>
                        Started:{" "}
                        {dashboardData?.subscription?.startDate
                          ? new Date(
                            dashboardData.subscription.startDate
                          ).toLocaleDateString()
                          : "N/A"}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span>✓</span>
                      <span>
                        Expires:{" "}
                        {dashboardData?.subscription?.expiryDate
                          ? new Date(
                            dashboardData.subscription.expiryDate
                          ).toLocaleDateString()
                          : "N/A"}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span>✓</span>
                      <span>
                        Amount Paid: $
                        {dashboardData?.subscription?.amount || 0}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span>✓</span>
                      <span>
                        Membership:{" "}
                        {dashboardData?.subscription?.plan === "yearly"
                          ? "Premium Annual Member"
                          : "Monthly Member"}
                      </span>
                    </div>
                  </div>

                  <button className="w-full py-3 bg-white text-green-600 rounded-lg hover:bg-gray-100 transition font-semibold">
                    Manage Subscription
                  </button>
                </div>

                {/* Subscription Details */}
                <div className="bg-white rounded-2xl p-8 shadow-md">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Subscription Details
                  </h2>

                  <div className="space-y-5">

                    <div>
                      <p className="text-gray-500 text-sm">
                        Plan Type
                      </p>
                      <p className="font-semibold text-lg capitalize">
                        {dashboardData?.subscription?.plan || "N/A"}
                      </p>
                    </div>

                    <div>
                      <p className="text-gray-500 text-sm">
                        Current Status
                      </p>
                      <p className="font-semibold text-lg text-green-600 capitalize">
                        {dashboardData?.subscription?.status || "Inactive"}
                      </p>
                    </div>

                    <div>
                      <p className="text-gray-500 text-sm">
                        Subscription Amount
                      </p>
                      <p className="font-semibold text-lg">
                        ${dashboardData?.subscription?.amount || 0}
                      </p>
                    </div>

                    <div>
                      <p className="text-gray-500 text-sm">
                        Payment ID
                      </p>
                      <p className="font-semibold break-all">
                        {dashboardData?.subscription?.paymentId ||
                          "Demo Subscription"}
                      </p>
                    </div>

                    <div>
                      <p className="text-gray-500 text-sm">
                        Start Date
                      </p>
                      <p className="font-semibold">
                        {dashboardData?.subscription?.startDate
                          ? new Date(
                            dashboardData.subscription.startDate
                          ).toLocaleDateString()
                          : "N/A"}
                      </p>
                    </div>

                    <div>
                      <p className="text-gray-500 text-sm">
                        Expiry Date
                      </p>
                      <p className="font-semibold">
                        {dashboardData?.subscription?.expiryDate
                          ? new Date(
                            dashboardData.subscription.expiryDate
                          ).toLocaleDateString()
                          : "N/A"}
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

          {activeTab === "charity" && (
            <div className="space-y-8">
              <h1 className="text-3xl font-bold text-gray-900">
                My Charity
              </h1>

              <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                <img
                  src={dashboardData?.user.selectedCharity?.image}
                  alt={dashboardData?.user.selectedCharity?.name}
                  className="w-full h-64 object-cover"
                />

                <div className="p-8">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-3xl font-bold text-gray-900">
                      {dashboardData?.user?.selectedCharity?.name}
                    </h2>

                    <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">
                      {dashboardData?.user?.selectedCharity?.category}
                    </span>
                  </div>

                  <p className="text-gray-600 text-lg mb-6">
                    {dashboardData?.user?.selectedCharity?.description}
                  </p>

                  <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-green-50 p-5 rounded-xl">
                      <h3 className="font-semibold text-gray-800 mb-2">
                        Donation Support
                      </h3>

                      <p className="text-green-600 font-bold text-xl">
                        Active
                      </p>
                    </div>

                    <div className="bg-blue-50 p-5 rounded-xl">
                      <h3 className="font-semibold text-gray-800 mb-2">
                        Your Contribution
                      </h3>

                      <p className="text-blue-600 font-bold text-xl">
                        ${dashboardData?.totalDonated || 0}
                      </p>
                    </div>

                    <div className="bg-yellow-50 p-5 rounded-xl">
                      <h3 className="font-semibold text-gray-800 mb-2">
                        GolfHeroes Status
                      </h3>

                      <p className="text-yellow-600 font-bold text-xl">
                        Partner
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <a
                      href={dashboardData?.user?.selectedCharity?.website}
                      target="_blank"
                      rel="noreferrer"
                      className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition font-semibold"
                    >
                      Visit Website
                    </a>

                    <button
                      className="border border-green-600 text-green-600 hover:bg-green-50 px-6 py-3 rounded-lg transition font-semibold"
                    >
                      Change Charity
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}





          {/* Draw Results Tab
          {activeTab === 'draws' && (
            <div className="space-y-8">
              <h1 className="text-3xl font-bold text-gray-900">Draw Results</h1>
              <div className="space-y-4">
                {drawHistory.map(draw => (
                  <div key={draw.id} className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{draw.month}</h3>
                        <p className={`text-sm font-semibold ${draw.winner === 'You Won!' ? 'text-green-600' : 'text-gray-600'}`}>
                          {draw.winner}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-gray-900">{draw.prize}</p>
                        <p className="text-sm text-gray-600">{draw.status}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )} */}

          {/* Winners Tab */}
          {activeTab === 'winners' && (
            <div className="space-y-8">
              <h1 className="text-3xl font-bold text-gray-900">Top Winners</h1>
              <div className="grid md:grid-cols-2 gap-6">
                {topWinners.map((winner, index) => (
                  <div key={winner.id} className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                          {index + 1}
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">{winner.name}</h3>
                          <p className="text-sm text-gray-600">{winner.wins} wins</p>
                        </div>
                      </div>
                      <Trophy className="text-yellow-500" size={24} />
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-sm text-gray-600">Total Prize Money</p>
                      <p className="text-2xl font-bold text-green-600">{winner.totalPrize}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="space-y-8">
              <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
              <div className="bg-white rounded-2xl p-8 shadow-md">
                <div className="flex flex-col md:flex-row gap-8 mb-8">
                  <div>
                    <img
                      src={authUser.image || defaultProfileImage}
                      alt={authUser.uesrname}
                      className="w-32 h-32 rounded-full"
                    />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">{authUser.username}</h2>
                    <p className="text-gray-600 mb-4">{authUser.email}</p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Member Since</p>
                        <p className="font-semibold text-gray-900">{<p>
                          Joined: {new Date(authUser.createdAt).toLocaleString("en-IN", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </p>}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Subscription</p>
                        <p className="font-semibold text-gray-900">{authUser.subscription}</p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold">
                  Edit Profile
                </button> */}
              </div>
            </div>
          )}

          {/* Explore Section - Always visible at bottom */}
          <div className="mt-12 space-y-8">
            <div className="border-t-2 border-gray-200 pt-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Explore More Charities</h2>
              <p className="text-gray-600 mb-8">Discover charities you can support and switch your contribution anytime.</p>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {exploreCha?.map(charity => (
                  <div key={charity.id} className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition transform hover:-translate-y-2">
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
                      <p className="text-sm text-gray-600 mb-4">{charity.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-600">{charity.members} members</span>
                        <button className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold text-sm">
                          Switch
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default HomePage;
