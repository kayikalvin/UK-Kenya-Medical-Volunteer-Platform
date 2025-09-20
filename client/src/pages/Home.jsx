// import { ArrowRight, Globe, Shield, Users, MapPin, Heart, Award, Clock } from 'lucide-react'

// const Home = ({ setActiveTab }) => {
//   return (
//     <>
//       <div className="min-h-screen w-full">
//         {/* Hero Section */}
//         <section className="relative bg-gradient-to-br from-indigo-600 via-purple-700 to-blue-800 text-white overflow-hidden">
//           <div className="absolute inset-0 bg-black/20"></div>
//           <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fillRule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fillOpacity=\'0.05\'%3E%3Ccircle cx=\'30\' cy=\'30\' r=\'2\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>

//           <div className="relative container mx-auto px-6 py-10 md:py-20 text-center">
//             <div className="max-w-4xl mx-auto">
//               <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 mb-8">
//                 <Heart className="w-5 h-5 mr-2 text-red-300" />
//                 <span className="text-sm font-medium">Connecting Healthcare Globally</span>
//               </div>

//               <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
//                 Bridging Healthcare
//                 <span className="block bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
//                   Across Continents
//                 </span>
//               </h1>

//               <p className="text-xl md:text-2xl mb-10 text-gray-200 max-w-3xl mx-auto leading-relaxed">
//                 Empowering meaningful exchange of medical professionals between the UK and Kenya.
//                 Building bridges that save lives and transform communities.
//               </p>

//               <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
//                 <button
//                   onClick={() => setActiveTab("clinician-register")}
//                   className="group bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-green-500/25 flex items-center"
//                 >
//                   Get Started as a Clinician
//                   <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
//                 </button>
//                 <button
//                   onClick={() => setActiveTab("hospital-register")}
//                   className="group bg-white/20 backdrop-blur-sm hover:bg-white/30 border border-white/30 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl flex items-center"
//                 >
//                   Register Your Hospital
//                   <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
//                 </button>
//               </div>

//               {/* Stats */}
//               <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
//                 <div className="text-center">
//                   <div className="text-3xl font-bold text-yellow-400">500+</div>
//                   <div className="text-sm text-gray-300">Registered Clinicians</div>
//                 </div>
//                 <div className="text-center">
//                   <div className="text-3xl font-bold text-green-400">150+</div>
//                   <div className="text-sm text-gray-300">Partner Hospitals</div>
//                 </div>
//                 <div className="text-center">
//                   <div className="text-3xl font-bold text-blue-400">25+</div>
//                   <div className="text-sm text-gray-300">Counties Served</div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Floating shapes */}
//           <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse"></div>
//           <div className="absolute bottom-20 right-10 w-32 h-32 bg-purple-400/20 rounded-full blur-xl animate-pulse delay-1000"></div>
//           <div className="absolute top-1/2 right-20 w-16 h-16 bg-yellow-400/20 rounded-full blur-xl animate-pulse delay-500"></div>
//         </section>

//         {/* Features Section */}
//         <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
//           <div className="container mx-auto px-6">
//             <div className="text-center mb-16">
//               <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
//                 Why Choose Our Platform?
//               </h2>
//               <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//                 We've built the most comprehensive platform for healthcare professional exchange,
//                 ensuring safety, efficiency, and meaningful impact.
//               </p>
//             </div>

//             <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
//               <div className="group bg-white hover:bg-gradient-to-br hover:from-green-50 hover:to-emerald-50 shadow-lg hover:shadow-2xl p-8 rounded-2xl text-center transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
//                 <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
//                   <Users className="w-8 h-8 text-white" />
//                 </div>
//                 <h3 className="font-bold text-xl text-gray-900 mb-3">For UK Clinicians</h3>
//                 <p className="text-gray-600 leading-relaxed">
//                   Register your qualifications, set availability, and choose your preferred volunteer locations.
//                   Gain invaluable international experience while making a difference.
//                 </p>
//               </div>

//               <div className="group bg-white hover:bg-gradient-to-br hover:from-blue-50 hover:to-indigo-50 shadow-lg hover:shadow-2xl p-8 rounded-2xl text-center transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
//                 <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
//                   <Heart className="w-8 h-8 text-white" />
//                 </div>
//                 <h3 className="font-bold text-xl text-gray-900 mb-3">For Kenyan Hospitals</h3>
//                 <p className="text-gray-600 leading-relaxed">
//                   Connect with qualified UK healthcare professionals instantly.
//                   Post your clinical needs and find the right volunteers for your community.
//                 </p>
//               </div>

//               <div className="group bg-white hover:bg-gradient-to-br hover:from-purple-50 hover:to-violet-50 shadow-lg hover:shadow-2xl p-8 rounded-2xl text-center transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
//                 <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-purple-400 to-violet-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
//                   <Shield className="w-8 h-8 text-white" />
//                 </div>
//                 <h3 className="font-bold text-xl text-gray-900 mb-3">Credential Verification</h3>
//                 <p className="text-gray-600 leading-relaxed">
//                   Advanced verification system ensuring all clinicians have valid UK medical licenses.
//                   Trust and safety are our top priorities.
//                 </p>
//               </div>

//               <div className="group bg-white hover:bg-gradient-to-br hover:from-orange-50 hover:to-red-50 shadow-lg hover:shadow-2xl p-8 rounded-2xl text-center transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
//                 <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
//                   <MapPin className="w-8 h-8 text-white" />
//                 </div>
//                 <h3 className="font-bold text-xl text-gray-900 mb-3">Smart Location Matching</h3>
//                 <p className="text-gray-600 leading-relaxed">
//                   GPS-powered matching system connects volunteers with hospitals based on geography,
//                   specialties, and availability for optimal placements.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Impact Section */}
//         <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-700 text-white relative overflow-hidden">
//           {/* <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'40\' height=\'40\' viewBox=\'0 0 40 40\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'white\' fillOpacity=\'0.05\'%3E%3Cpath d=\'M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z\'/%3E%3C/g%3E%3C/svg%3E')]"></div> */}

//           <div className="container mx-auto px-6 relative">
//             <div className="text-center mb-16">
//               <h2 className="text-4xl md:text-5xl font-bold mb-4">Making Real Impact</h2>
//               <p className="text-xl text-purple-200 max-w-3xl mx-auto">
//                 Every connection we facilitate creates ripples of positive change across communities
//               </p>
//             </div>

//             <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
//               <div className="text-center group">
//                 <div className="w-20 h-20 mx-auto mb-6 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
//                   <Globe className="w-10 h-10" />
//                 </div>
//                 <h3 className="text-2xl font-bold mb-3">Global Reach</h3>
//                 <p className="text-purple-200">
//                   Connecting healthcare systems across continents to share knowledge and expertise
//                 </p>
//               </div>

//               <div className="text-center group">
//                 <div className="w-20 h-20 mx-auto mb-6 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
//                   <Award className="w-10 h-10" />
//                 </div>
//                 <h3 className="text-2xl font-bold mb-3">Excellence</h3>
//                 <p className="text-purple-200">
//                   Maintaining the highest standards of medical care and professional development
//                 </p>
//               </div>

//               <div className="text-center group">
//                 <div className="w-20 h-20 mx-auto mb-6 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
//                   <Clock className="w-10 h-10" />
//                 </div>
//                 <h3 className="text-2xl font-bold mb-3">Efficient</h3>
//                 <p className="text-purple-200">
//                   Streamlined processes that get medical professionals where they're needed most
//                 </p>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* CTA Section */}
//         <section className="py-20 bg-gradient-to-b from-white to-gray-100">
//           <div className="container mx-auto px-6 text-center">
//             <div className="max-w-3xl mx-auto">
//               <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
//                 Ready to Make a Difference?
//               </h2>
//               <p className="text-xl text-gray-600 mb-10">
//                 Join our community of healthcare professionals dedicated to improving global health outcomes.
//                 Your expertise can change lives.
//               </p>

//               <div className="flex flex-col sm:flex-row gap-4 justify-center">
//                 <button
//                   onClick={() => setActiveTab("clinician-register")}
//                   className="group bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-indigo-500/25 flex items-center justify-center"
//                 >
//                   Start Your Journey
//                   <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
//                 </button>
//                 <button
//                   onClick={() => setActiveTab("hospital-register")}
//                   className="group border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
//                 >
//                   Find Volunteers
//                   <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
//                 </button>
//               </div>
//             </div>
//           </div>
//         </section>
//       </div>
//     </>
//   )
// }

// export default Home
import React from "react";
import { ArrowRight, Globe, Shield, Users, MapPin, Heart, Award, Clock } from "lucide-react";

const Home = ({ setActiveTab }) => {
  return (
    <div className="min-h-screen w-full bg-[var(--background)] text-[var(--text)]">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0E1A2A] via-[#1B263B] to-[#0E1A2A]"></div>
        <div className="relative container mx-auto px-6 py-4 md:py-20 text-center z-10">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center bg-[var(--muted)]/40 backdrop-blur-md rounded-full px-6 py-2 mb-4 md:mb-8">
              <Heart className="w-5 h-5 mr-2 text-[var(--secondary)]" />
              <span className="text-sm font-medium text-[var(--muted-foreground)]">Connecting Healthcare Globally</span>
            </div>

            <h1 className="text-4xl md:text-7xl font-extrabold mb-6 leading-tight">
              <span className="block bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] bg-clip-text text-transparent">
                Bridging Healthcare
              </span>
              <span className="block bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] bg-clip-text text-transparent">
                Across Continents
              </span>
            </h1>

            <p className="text-lg md:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed text-[var(--ptext)]">
              Empowering meaningful exchange of medical professionals between the UK and Kenya.
              Building bridges that save lives and transform communities.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <button
                onClick={() => setActiveTab("clinician-register")}
                className="group bg-[var(--primary)] hover:bg-[var(--secondary)] text-[var(--primary-foreground)] px-8 py-4 rounded-full font-semibold text-sm md:text-lg transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-[var(--primary)]/50 flex items-center justify-center"
              >
                Get Started as a Clinician
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => setActiveTab("hospital-register")}
                className="group bg-[var(--muted)]/50 backdrop-blur-md hover:bg-[var(--muted)]/70 border border-[var(--border)] px-8 py-4 rounded-full font-semibold text-sm md:text-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center"
              >
                Register Your Hospital
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto text-[var(--foreground)]">
              <div className="text-center">
                <div className="text-3xl font-bold text-[var(--primary)]">500+</div>
                <div className="text-sm text-[var(--ptext)]">Registered Clinicians</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[var(--secondary)]">150+</div>
                <div className="text-sm text-[var(--ptext)]">Partner Hospitals</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[var(--accent-foreground)]">25+</div>
                <div className="text-sm text-[var(--ptext)]">Counties Served</div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating shapes */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-[var(--primary)]/15 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-[var(--secondary)]/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-20 w-16 h-16 bg-[var(--accent)]/15 rounded-full blur-3xl animate-pulse delay-500"></div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-[var(--accent)]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold block bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] bg-clip-text text-transparent mb-4">
              Why Choose Our Platform?
            </h2>
            <p className="text-xl text-[var(--ptext)] max-w-3xl mx-auto">
              We've built the most comprehensive platform for healthcare professional exchange,
              ensuring safety, efficiency, and meaningful impact.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard icon={Users} title="For UK Clinicians" color="from-[var(--primary)] to-[var(--secondary)]">
              Register your qualifications, set availability, and choose your preferred volunteer locations.
            </FeatureCard>
            <FeatureCard icon={Heart} title="For Kenyan Hospitals" color="from-[var(--secondary)] to-[var(--primary)]">
              Connect with qualified UK healthcare professionals instantly. Post your clinical needs and find the right volunteers.
            </FeatureCard>
            <FeatureCard icon={Shield} title="Credential Verification" color="from-[var(--primary)] to-[var(--secondary)]">
              Advanced verification system ensuring all clinicians have valid UK medical licenses.
            </FeatureCard>
            <FeatureCard icon={MapPin} title="Smart Location Matching" color="from-[var(--secondary)] to-[var(--primary)]">
              GPS-powered matching system connects volunteers with hospitals based on geography, specialties, and availability.
            </FeatureCard>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-20 bg-[var(--accent)]/90 relative overflow-hidden">
        <div className="container mx-auto px-6 relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 block bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] bg-clip-text text-transparent">Making Real Impact</h2>
            <p className="text-xl text-[var(--ptext)] max-w-3xl mx-auto">
              Every connection we facilitate creates ripples of positive change across communities
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <ImpactCard icon={Globe} title="Global Reach">
              Connecting healthcare systems across continents to share knowledge and expertise
            </ImpactCard>
            <ImpactCard icon={Award} title="Excellence">
              Maintaining the highest standards of medical care and professional development
            </ImpactCard>
            <ImpactCard icon={Clock} title="Efficient">
              Streamlined processes that get medical professionals where they're needed most
            </ImpactCard>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[var(--accent)]/95">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold block bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] bg-clip-text text-transparent mb-6">
              Ready to Make a Difference?
            </h2>
            <p className="text-xl text-[var(--ptext)] mb-10">
              Join our community of healthcare professionals dedicated to improving global health outcomes.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setActiveTab("clinician-register")}
                className="group bg-[var(--primary)] hover:bg-[var(--secondary)] text-[var(--primary-foreground)] px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-[var(--primary)]/50 flex items-center justify-center"
              >
                Start Your Journey
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => setActiveTab("hospital-register")}
                className="group border-2 border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-[var(--primary-foreground)] px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
              >
                Find Volunteers
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
          {/* Divider */}
        <div className="border-t border-[var(--border)] mt-8 pt-6 text-sm md:text-base">
          © 2025 Anchored Health. Empowering healthcare through diaspora connection.
        </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

// --- FeatureCard Component ---
const FeatureCard = ({ icon: Icon, title, color, children }) => (
  <div className={`group bg-[var(--primary)]/40 hover:bg-gradient-to-br ${color} shadow-lg hover:shadow-[var(--primary)]/40 p-8 rounded-2xl text-center transition-all duration-300 transform hover:-translate-y-2 border border-[var(--border)]`}>
    <div className={`w-16 h-16 mx-auto mb-6 bg-gradient-to-br ${color} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
      <Icon className="w-8 h-8 text-[var(--foreground)]" />
    </div>
    <h3 className="font-bold text-xl text-[var(--primary-foreground)] mb-3">{title}</h3>
    <p className="text-[var(--ptext)] leading-relaxed">{children}</p>
  </div>
);

// --- ImpactCard Component ---
const ImpactCard = ({ icon: Icon, title, children }) => (
  <div className="text-center group">
    <div className="w-20 h-20 mx-auto mb-6 bg-[var(--muted)]/40 backdrop-blur-md rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
      <Icon className="w-10 h-10 text-[var(--secondary)]" />
    </div>
    <h3 className="text-2xl font-bold mb-3 text-[var(--primary-foreground)]">{title}</h3>
    <p className="text-[var(--ptext)]">{children}</p>
  </div>
);
