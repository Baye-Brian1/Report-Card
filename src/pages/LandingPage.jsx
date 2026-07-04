import Navbar from "../components/NavBar";
import {
  CheckCircle,
  Users,
  Lock,
  FileBox,
  FileBadge,
  Clock12,
  FileCheck,
  File,
  Microchip,
} from "lucide-react";
import { Link } from "react-router-dom";
import Card from "../components/Card";
import Footer from "../components/Footer";

const LandingPage = () => {
  return (
    <>
      <Navbar />
      <main     className="min-h-screen items-center justify-center flex flex-col px-4 py-8 relative  overflow:hidden"
      >
       <div className="absolute inset-0">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 49px, rgba(37,99,235, 0.05) 49px, rgba(37,99,235, 0.05) 50px),
                                      repeating-linear-gradient(90deg, transparent, transparent 49px, rgba(37,99,235, 0.05) 49px, rgba(37,99,235, 0.05) 50px)`,
              backgroundSize: "50px 50px",
            }}
          ></div>
        </div>
        <section
        id="home"
        className="min-h-screen items-center justify-center flex px-4 py-8 relative  overflow:hidden"
      >
       
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-3xl md:text-6xl font-bold text-[#0F172A] mb-3">
              Smart Report Card
              <span className="block text-[#2563eb]">Management System</span>
            </h1>

            <p className="text-md md:text-lg text-[#0F172A] max-w-2xl mx-auto mb-8">
              Manage student report card securely, efficiently, and digitally.{" "}
              <br />
              Easy for teachers, accessible for students and reliable for
              schools
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/login"
                className="px-8 py-2 rounded-xs bg-[#2563eb] text-white font-semibold hover:bg-blue-600 transition transform hover:scale-105 flex items-center gap-2"
              >
                Get Started
              </Link>
              <button
                onClick={() =>
                  document
                    .getElementById("features")
                    .scrollIntoView({ behavior: "smooth" })
                }
                className="px-8 py-2 rounded-xs cursor-pointer border border-[#2563eb] bg-white text-[#2563eb] hover:bg-white/10 transition transform hover:scale-105"
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
      <section id="about" className="py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-lg md:text-2xl font-bold text-[#2563eb] mb-0.5">
              About us
            </h2>
            <p className="text-3xl md:text-4xl font-bold text-[#0F172A] max-w-3xl mx-auto">
              Built For Schools, Made For Educators
            </p>
            <p className="text-center text-[#0F172A]">
                Our report card management system is designed to reduce paper work and <br />
                 save time for teachers. Focus more on teaching, and let us handle the reportings
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-4 items-center justify-center">
            <div className="flex items-start gap-3 p-2 h-25">
              <div
                className="w-12 h-12 rounded-full p-4 flex justify-center items-center 
                      bg-blue-600/12 shadow-2xs"
              >
                <div className="text-[#2563eb] text-2xl">
                  <Clock12 />
                </div>
              </div>
              <div className="flex flex-col">
                <h3 className="text-lg font-semibold text-[#0F172A] mb-0.5">
                  Saves Time
                </h3>
                <p className="text-[#64748B] text-sm">
                  Automate report card generation and reduce manual work
                </p>
              </div>
            </div>
             <div className="flex items-start gap-3 p-2 h-25">
              <div
                className="w-12 h-12 rounded-full p-4 flex justify-center items-center 
                      bg-blue-600/12 shadow-2xs"
              >
                <div className="text-[#2563eb] text-2xl">
                  <Users/>
                </div>
              </div>
              <div className="flex flex-col">
                <h3 className="text-lg font-semibold text-[#0F172A] mb-0.5">
                  Easy to use
                </h3>
                <p className="text-[#64748B] text-sm">
                  simple and intuitive interface for every teacher
                </p>
              </div>
            </div>
             <div className="flex items-start gap-3 p-2 h-25">
              <div
                className="w-12 h-12 rounded-full p-4 flex justify-center items-center 
                      bg-blue-600/12 shadow-2xs"
              >
                <div className="text-[#2563eb] text-2xl">
                  <FileCheck/>
                </div>
              </div>
              <div className="flex flex-col">
                <h3 className="text-lg font-semibold text-[#0F172A] mb-0.5">
                  Accurate Reports
                </h3>
                <p className="text-[#64748B] text-sm">
                  Generate accurate <br /> and consistent <br /> reports
                </p>
              </div>
            </div>
             <div className="flex items-start gap-3 p-2 h-25">
              <div
                className="w-12 h-12 rounded-full p-4 flex justify-center items-center 
                      bg-blue-600/12 shadow-2xs"
              >
                <div className="text-[#2563eb] text-2xl">
                  <File/>
                </div>
              </div>
              <div className="flex flex-col">
                <h3 className="text-lg font-semibold text-[#0F172A] mb-0.5">
                  Accessible Anywhere
                </h3>
                <p className="text-[#64748B] text-sm">
                  Access your data anytime, from any device
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="features" className="py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-[#2563eb]">Features</h2>
            <p className="text-3xl md:text-4xl font-bold text-[#0F172A] max-w-2xl mx-auto">
              Everything You Need
            </p>
            <div className="grid md:grid-cols-4 gap-4 p-8">
              <Card
                icon={<FileBox />}
                title="Input Marks Easily"
                text="Add students by class and input marks for each subject"
              />
              <Card
                icon={<FileBadge />}
                title="Generate Report Cards"
                text="Generate professional report cards instantly with one click"
              />
              <Card
                icon={<Microchip/>}
                title="Export to Excel"
                text="Export report cards to excel for easy sharing and storage"
              />
              <Card
                icon={<Lock />}
                title="Secure & Reliable"
                text="Your date is safe and very reliable with secure storage "
              />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-lg md:text-2xl font-bold text-[#2563eb] mb-1">
              How It Works
            </h2>
            <p className="text-3xl md:text-4xl font-bold text-[#0F172A] max-w-2xl mx-auto">
              Simple steps, Powerful Results
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex items-start gap-3 p-2 border-[#2563eb] border-r h-20">
              <div className="w-10 h-10 mx-auto mb-6 rounded-full bg-[#2563eb] shadow-2xl flex items-center justify-center text-md font-semibold text-white p-4">
                1
              </div>
              <div className="flex flex-col">
                <h3 className="text-lg font-semibold text-[#0F172A] mb-0.5">
                  Add Classes & Input Marks
                </h3>
                <p className="text-[#64748B] text-sm">
                  Create classes and subject of students then input their{" "}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-2 border-[#2563eb] border-r h-20">
              <div className="w-10 h-10 mx-auto mb-6 rounded-full bg-[#2563eb] shadow-2xl flex items-center justify-center text-md font-semibold text-white p-4">
                2
              </div>
              <div className="flex flex-col">
                <h3 className="text-lg font-semibold text-[#0F172A] mb-0.5">
                  Generate Report Cards
                </h3>
                <p className="text-[#64748B] text-sm">
                  Generate professional report cards instantly with one click.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-2 h-20">
              <div className="w-10 h-10 mx-auto mb-6 rounded-full bg-[#2563eb] shadow-2xl flex items-center justify-center text-md font-semibold text-white p-4">
                3
              </div>
              <div className="flex flex-col">
                <h3 className="text-lg font-semibold text-[#0F172A] mb-0.5">
                  Export to Excel
                </h3>
                <p className="text-[#64748B] text-sm">
                  Export report cards to excel instantly with one click for easy
                  sharing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="cta"  className="py-4"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mb-4">
              Ready to reduce paperwork <br /> and save time?
            </h2>
            <p className="text-lg md:text-xl text-[#0F172A] max-w-2xl mx-auto mb-4">
              Join us and start creating report card effortlessly which saves{" "}
              <br />
              time and reduces alot of paperwork
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/login"
                className="px-8 py-2 rounded-xs bg-[#2563eb] text-white font-semibold hover:bg-blue-600 transition transform hover:scale-105 flex items-center gap-2"
              >
                Get Started
              </Link>
              <button
                onClick={() =>
                  document
                    .getElementById("how-it-works")
                    .scrollIntoView({ behavior: "smooth" })
                }
                className="px-8 py-2 rounded-xs cursor-pointer border border-[#2563eb] bg-white text-[#2563eb] hover:bg-white/10 transition transform hover:scale-105"
              >
                How it works
              </button>
            </div>
          </div>
        </div>
      </section>

      </main>
      <Footer/>
    </>
  );
};

export default LandingPage;
