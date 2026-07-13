import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileText, CheckSquare, AlertTriangle, Users, Shield } from 'lucide-react';

const TermsConditions = () => {
  return (
    <div className="min-h-screen bg-[#e8eef9]">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link to="/" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-8">
          <ArrowLeft size={20} />
          Back to Home
        </Link>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <FileText className="w-16 h-16 text-blue-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-[#1e3a8a]">Terms & Conditions</h1>
            <p className="text-gray-600 mt-2">Last updated: July 2026</p>
          </div>

          <div className="space-y-6 text-gray-700">
            <section>
              <h2 className="text-xl font-bold text-[#1e3a8a] flex items-center gap-2 mb-3">
                <CheckSquare className="text-blue-600" size={20} />
                Acceptance of Terms
              </h2>
              <div className="bg-gray-50 rounded-lg p-4">
                <p>
                  By using the School Report Card Management System, you agree to these 
                  Terms and Conditions. If you do not agree to these terms, please do not 
                  use our services.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#1e3a8a] flex items-center gap-2 mb-3">
                <Users className="text-blue-600" size={20} />
                User Accounts
              </h2>
              <div className="bg-gray-50 rounded-lg p-4">
                <ul className="space-y-2">
                  <li className="flex items-end gap-2">
                    <span className="text-blue-600 text-2xl font-bold">.</span>
                    <span>You must be authorized to use this system</span>
                  </li>
                  <li className="flex items-end gap-2">
                    <span className="text-blue-600 text-2xl font-bold">.</span>
                    <span>Your account is for educational purposes only</span>
                  </li>
                  <li className="flex items-end gap-2">
                    <span className="text-blue-600 text-2xl font-bold">.</span>
                    <span>Keep your login credentials confidential</span>
                  </li>
                  <li className="flex items-end gap-2">
                    <span className="text-blue-600 text-2xl font-bold">.</span>
                    <span>You are responsible for all activities under your account</span>
                  </li>
                  <li className="flex items-end gap-2">
                    <span className="text-blue-600 text-2xl font-bold">.</span>
                    <span>Report any unauthorized access immediately</span>
                  </li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#1e3a8a] flex items-center gap-2 mb-3">
                <Shield className="text-blue-600" size={20} />
                User Responsibilities
              </h2>
              <div className="bg-gray-50 rounded-lg p-4">
                <ul className="space-y-2">
                   <li className="flex items-end gap-2">
                    <span className="text-blue-600 text-2xl font-bold">.</span>
                    <span>Accurately enter and maintain student records</span>
                  </li>
                  <li className="flex items-end gap-2">
                    <span className="text-blue-600 text-2xl font-bold">.</span>
                    <span>Keep all student data confidential</span>
                  </li>
                  <li className="flex items-end gap-2">
                    <span className="text-blue-600 text-2xl font-bold">.</span>
                    <span>Use the system only for authorized purposes</span>
                  </li>
                  <li className="flex items-end gap-2">
                    <span className="text-blue-600 text-2xl font-bold">.</span>
                    <span>Respect the intellectual property of the system</span>
                  </li>
                  <li className="flex items-end gap-2">
                    <span className="text-blue-600 text-2xl font-bold">.</span>
                    <span>Not attempt to disrupt or compromise system security</span>
                  </li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#1e3a8a] flex items-center gap-2 mb-3">
                <AlertTriangle className="text-blue-600" size={20} />
                Data Accuracy
              </h2>
              <div className="bg-gray-50 rounded-lg p-4">
                <p>
                  You are responsible for ensuring that all data entered into the system 
                  is accurate and up-to-date. The system provides features for data 
                  validation, but final verification rests with the user.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#1e3a8a] mb-3">Prohibited Activities</h2>
              <div className="bg-gray-50 rounded-lg p-4">
                <ul className="space-y-2">
                  <li className="flex items-end gap-2">
                    <span className="text-red-500 text-2xl font-bold">.</span>
                    <span>Accessing data without proper authorization</span>
                  </li>
                  <li className="flex items-end gap-2">
                   <span className="text-red-500 text-2xl font-bold">.</span>
                    <span>Tampering with system functionality</span>
                  </li>
                  <li className="flex items-end gap-2">
                    <span className="text-red-500 text-2xl font-bold">.</span>
                    <span>Uploading malicious content or viruses</span>
                  </li>
                  <li className="flex items-end gap-2">
                    <span className="text-red-500 text-2xl font-bold">.</span>
                    <span>Attempting to bypass security measures</span>
                  </li>
                  <li className="flex items-end gap-2">
                    <span className="text-red-500 text-2xl font-bold">.</span>
                    <span>Sharing sensitive data with unauthorized parties</span>
                  </li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#1e3a8a] mb-3">Intellectual Property</h2>
              <div className="bg-gray-50 rounded-lg p-4">
                <p>
                  The School Report Card System, including its design, code, and content, 
                  is protected by copyright and intellectual property laws. You may not 
                  copy, modify, distribute, or reverse-engineer any part of the system 
                  without explicit permission.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#1e3a8a] mb-3">Termination</h2>
              <div className="bg-gray-50 rounded-lg p-4">
                <p>
                  We reserve the right to suspend or terminate accounts that violate these 
                  terms or are used for unauthorized purposes. Users will be notified of 
                  any termination and may appeal the decision.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#1e3a8a] mb-3">Limitation of Liability</h2>
              <div className="bg-gray-50 rounded-lg p-4">
                <p>
                  The system is provided "as is" without warranties of any kind. While we 
                  strive for accuracy and reliability, we are not liable for errors, 
                  omissions, or interruptions in service. Users are responsible for 
                  backing up their own data.
                </p>
              </div>
            </section>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
              <h3 className="font-bold text-blue-800 mb-2">Questions?</h3>
              <p className="text-sm text-gray-700">
                If you have questions about these Terms & Conditions, please contact us at 
                <strong> bayebrian89@gmail.com</strong> or call 
                <strong> +237 678772649</strong> 
                <strong> /  +237 675717944</strong>.
              </p>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200 text-center text-sm text-gray-500">
            <p>SCHOOL Report Card &amp; Information System. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsConditions;