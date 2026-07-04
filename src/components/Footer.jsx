import React from "react";
import { Link } from "react-router-dom";
import { BookOpen } from "lucide-react";

const Footer=()=>{
    return(
        <footer className="py-12 border-t border-white/10 bg-[#2563eb]">
            
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                ReportCard
              </h3>
              <p className="text-white text-sm">
                A smart and secure solution for managing student report cards efficiently. 
                Built for schools and teachers
              </p>
            </div>
            <div>
            <ul className="space-y-2 text-sm text-white">
                <h4 className="text-white font-semibold mb-4">Quick Links</h4>
                <li><a href="#home" className="hover:border-b-2 transition">Home</a></li>
                <li><a href="#about" className="hover:border-b-2 transition">About</a></li>
                <li><a href="#features" className="hover:border-b-2 transition">Features</a></li>
                <li><a href="#how-it-works" className="hover:border-b-2 transition">How It Works</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-white">
                <li><a href="#home" className="hover:border-b-2 cursor-pointer transition">User guide</a></li>
                <li><a href="#about" className="hover:border-b-2 transition">Help Center</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-white">
                <li><a href="#" className="hover:border-b-2 cursor-pointer transition">Privacy</a></li>
                <li><a href="#" className="hover:border-b-2cursor-pointe transition">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="text-center text-white text-sm pt-8 border-t border-white">
            <p>&copy; 2026 Report Card Management System. All rights reserved.</p>
          </div>
        </div>
      </footer>
    );

}

export default Footer;