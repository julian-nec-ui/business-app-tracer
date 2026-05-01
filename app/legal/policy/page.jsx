import { memo } from 'react';
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="mb-6 mt-0 p-0">
            <Link href="/sign-up" className="inline-flex items-center font-bold gap-1.5 text-blue-600 hover:text-blue-800">
              Back
              <ArrowLeft className="h-4 w-4 font-bold" />
            </Link>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h1>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Information We Collect</h2>
            <p className="text-gray-600 leading-relaxed">
              We don't collect any personal information from users. We do not use cookies, track user behavior, or store any data on our servers. Your privacy is our top priority.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Data Security</h2>
            <div className="prose text-gray-600">
              <p className="mb-4">
                We implement appropriate technical and organizational security measures to protect your personal
                information.
                However, please note that no method of transmission over the Internet is 100% secure.
              </p>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                <p className="text-blue-700">
                  We regularly review and update our security practices to enhance the protection of your data.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Rights</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">Access</h3>
                <p className="text-gray-600">You can request access to your personal data at any time.</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">Rectification</h3>
                <p className="text-gray-600">You can request correction of your personal data.</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">Erasure</h3>
                <p className="text-gray-600">You can request deletion of your personal data.</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">Portability</h3>
                <p className="text-gray-600">You can request transfer of your data to another service.</p>
              </div>
            </div>
          </section>
          <div className="mb-6 mt-0 p-0">
            <Link href="/sign-up" className="inline-flex items-center font-bold gap-1.5 text-blue-600 hover:text-blue-800">
              Back
              <ArrowLeft className="h-4 w-4 font-bold" />
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default memo(Privacy);