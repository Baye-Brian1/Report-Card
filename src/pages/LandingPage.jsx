import Navbar from "../components/NavBar"
import { CheckCircle, GraduationCap, Users } from "lucide-react";
import { Link } from "react-router-dom";

const LandingPage=()=>{
    return(
        <>
        <Navbar/>
        <section id="home" className="min-h-screen items-center justify-center flex px-4 py-8 relative  overflow:hidden">
            <div className="absolute inset-0">
                <div className="absolute inset-0" style={{
                    backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 49px, rgba(37,99,235, 0.05) 49px, rgba(37,99,235, 0.05) 50px),
                                      repeating-linear-gradient(90deg, transparent, transparent 49px, rgba(37,99,235, 0.05) 49px, rgba(37,99,235, 0.05) 50px)`,
                    backgroundSize: '50px 50px'
                }}>

                </div>

            </div>
            <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-3xl md:text-6xl font-bold text-[#0F172A] mb-3">
             Smart Report Card
              <span className="block text-[#2563eb]">Management System</span>
            </h1>
            
            <p className="text-md md:text-lg text-[#0F172A] max-w-2xl mx-auto mb-8">
              Manage student report card securely, efficiently, and digitally. <br />
              Easy for teachers, accessible for students and reliable for schools
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/login"
                className="px-8 py-2 rounded-xs bg-[#2563eb] text-white font-semibold hover:bg-blue-600 transition transform hover:scale-105 flex items-center gap-2"
              >
                Get Started
              </Link>
              <button
                onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-2 rounded-xs border border-[#2563eb] bg-white text-[#2563eb] hover:bg-white/10 transition transform hover:scale-105"
              >
                Learn More
              </button>
            </div>
            
            <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-gray-500">
              <span className="flex items-center text-[#2563eb] gap-2">
                <CheckCircle className="w-4 h-4 " />
                For Administrators & Teachers
              </span>
              <span className="flex items-center  text-[#2563eb] gap-2">
                <CheckCircle className="w-4 h-4" />
                Accurate & Easy to Use 
              </span>
              <span className="flex text-[#2563eb] items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Automatic Calculation
              </span>
            </div>
          </div>
        </div>
        </section>
         <section id="features" className="py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-[20px] font-semibold text-[#2563eb]">
              Features
            </h2>
            <p className="text-lg md:text-4xl font-bold text-[#0F172A] max-w-2xl mx-auto">
              Everything You Need
            </p>
          </div>
          </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">How It Works</h2>
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
              Simple process from quiz creation to student results
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white/10 flex items-center justify-center text-2xl font-bold text-white border border-white/20">
                1
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Teacher Creates Quiz</h3>
              <p className="text-gray-400">Upload PDF or manually create questions with answer key</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white/10 flex items-center justify-center text-2xl font-bold text-white border border-white/20">
                2
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Student Takes Quiz</h3>
              <p className="text-gray-400">Access available quizzes and submit answers</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white/10 flex items-center justify-center text-2xl font-bold text-white border border-white/20">
                3
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Instant Results & Feedback</h3>
              <p className="text-gray-400">Get grades, correct answers, and personalized feedback</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="backdrop-blur-xl bg-[rgba(16,22,36,0.8)] rounded-xs p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Ready to reduce paperwork and save time?
            </h2>
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-8">
              Join us and start creating report card  effortlessly which saves time and reduces alot of paperwork
            </p>
            <Link
              to="/login"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-xs bg-white text-black font-semibold hover:bg-gray-200 transition transform hover:scale-105"
            >
              Get Started Now
            </Link>
          </div>
        </div>
      </section>
        </>
    )

}

export default LandingPage;