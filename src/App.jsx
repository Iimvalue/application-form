import { useState } from "react";

import "./App.css";
import {
  CheckCircle,
  X,
  MapPin,
  User,
  Calendar,
  MessageSquare,
} from "lucide-react";
import YesNoSelector from "./components/YesNoSelector";

export default function App() {
  const [formData, setFormData] = useState({
    name: "",
    birthDate: "",
    city: "",
    expectedSalary: "",
    reason: "",
    question1: "",
    question2: "",
    question3: "",
  });

  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);

  const cities = ["Riyadh", "Qassim", "Jeddah", "Makkah", "Dammam", "Ha'il"];

  const salaryRanges = [
    { value: "3000-8000", label: "3000 - 8000" },
    { value: "9000-13000", label: "9000 - 13000" },
    { value: "15000+", label: "15000 and above" },
  ];

  const questions = [
    "Do you have previous experience in this field?",
    "Are you willing to work overtime when needed?",
    "Can you start working within two weeks of acceptance?",
  ];

  const calculateAge = (birthDate) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birth.getDate())
    ) {
      age--;
    }

    return age;
  };

  const validateForm = () => {
    const newErrors = {};

    // Full name chekc
    if (!formData.name || formData.name.trim().length < 4) {
      newErrors.name = "Name must be at least 4 characters long";
    }

    // Age check
    if (!formData.birthDate) {
      newErrors.birthDate = "Please enter your birth date";
    } else {
      const age = calculateAge(formData.birthDate);
      if (age < 18 || age > 70) {
        newErrors.birthDate = "Age must be between 18 and 70 years";
      }
    }

    // City check
    if (!formData.city) {
      newErrors.city = "Please select a city";
    }

    // Salary check
    if (!formData.expectedSalary) {
      newErrors.expectedSalary = "Please select expected salary range";
    }

    // Questions Yes no checks
    if (!formData.question1) {
      newErrors.question1 = "Please answer this question";
    }
    if (!formData.question2) {
      newErrors.question2 = "Please answer this question";
    }
    if (!formData.question3) {
      newErrors.question3 = "Please answer this question";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      setShowModal(true);
    } else {
      scrollToTop();
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setFormData({
      name: "",
      birthDate: "",
      city: "",
      expectedSalary: "",
      reason: "",
      question1: "",
      question2: "",
      question3: "",
    });
    setErrors({});
    setTimeout(() => {
      scrollToTop();
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Job Application
          </h1>
          <p className="text-lg text-gray-600">
            Fill out the form bellow to apply for the available position
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 space-y-8">
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
                <User className="text-blue-600" size={24} />
                Personal Information
              </h2>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    errors.name ? "border-red-500 bg-red-50" : "border-gray-300"
                  }`}
                  placeholder="Enter your full name"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="inline mr-1" size={16} />
                  Date of Birth *
                </label>
                <input
                  type="date"
                  value={formData.birthDate}
                  onChange={(e) =>
                    handleInputChange("birthDate", e.target.value)
                  }
                  max={new Date().toISOString().split("T")[0]}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    errors.birthDate
                      ? "border-red-500 bg-red-50"
                      : "border-gray-300"
                  }`}
                />
                {errors.birthDate && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.birthDate}
                  </p>
                )}
                {formData.birthDate && !errors.birthDate && (
                  <p className="mt-1 text-sm text-gray-600">
                    Age: {calculateAge(formData.birthDate)} years
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
                <MapPin className="text-green-600" size={24} />
                Job Details
              </h2>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Work City *
                </label>
                <select
                  value={formData.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    errors.city ? "border-red-500 bg-red-50" : "border-gray-300"
                  }`}
                >
                  <option value="">Select a city</option>
                  {cities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
                {errors.city && (
                  <p className="mt-1 text-sm text-red-600">{errors.city}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expected Salary *
                </label>
                <div className="space-y-3">
                  {salaryRanges.map((range) => (
                    <div key={range.value} className="flex items-center">
                      <input
                        type="radio"
                        id={range.value}
                        name="expectedSalary"
                        value={range.value}
                        checked={formData.expectedSalary === range.value}
                        onChange={(e) =>
                          handleInputChange("expectedSalary", e.target.value)
                        }
                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      <label
                        htmlFor={range.value}
                        className="ml-3 text-sm font-medium text-gray-700"
                      >
                        {range.label + " "}
                        <img
                          className="inline-block"
                          src="https://raw.githubusercontent.com/abdulrysrr/new-saudi-riyal-symbol/main/png/Saudi_Riyal_Symbol.png"
                          alt="Saudi Riyal Symbol"
                          width="15"
                          height="15"
                        />
                      </label>
                    </div>
                  ))}
                </div>
                {errors.expectedSalary && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.expectedSalary}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
                <MessageSquare className="text-purple-600" size={24} />
                Additional Information
              </h2>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Why do you want to apply for this job?
                </label>
                <textarea
                  value={formData.reason}
                  onChange={(e) => handleInputChange("reason", e.target.value)}
                  rows={4}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none ${
                    errors.reason
                      ? "border-red-500 bg-red-50"
                      : "border-gray-300"
                  }`}
                  placeholder="Describe the reasons that motivate you to apply for this position..."
                />
                {errors.reason && (
                  <p className="mt-1 text-sm text-red-600">{errors.reason}</p>
                )}
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-800">
                Additional Questions
              </h2>

              {questions.map((question, index) => {
                const fieldName = `question${index + 1}`;
                return (
                  <div
                    key={index}
                    className="bg-gradient-to-r from-gray-50 to-blue-50 p-6 rounded-xl border border-gray-100"
                  >
                    <p className="text-lg font-medium text-gray-800 mb-4">
                      {index + 1}. {question} *
                    </p>
                    <YesNoSelector
                      value={formData[fieldName]}
                      onChange={(value) => handleInputChange(fieldName, value)}
                      error={errors[fieldName]}
                      questionIndex={index}
                    />
                  </div>
                );
              })}
            </div>

            <div className="pt-6">
              <button
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
              >
                Submit Job Application
              </button>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 transform">
            <div className="p-8 text-center">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Application Submitted Successfully!
              </h3>

              <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
                <h4 className="font-semibold text-gray-800 mb-2">
                  Application Summary:
                </h4>
                <div className="space-y-1 text-sm text-gray-600">
                  <p>
                    <span className="font-medium">Name:</span> {formData.name}
                  </p>
                  <p>
                    <span className="font-medium">Age:</span>{" "}
                    {calculateAge(formData.birthDate)} years
                  </p>
                  <p>
                    <span className="font-medium">City:</span> {formData.city}
                  </p>
                  <p>
                    <span className="font-medium">Expected Salary:</span>{" "}
                    {
                      salaryRanges.find(
                        (r) => r.value === formData.expectedSalary
                      )?.label
                    }
                  </p>
                </div>
              </div>

              <p className="text-gray-600 mb-6">
                Your application will be reviewed and we'll contact you within
                3-5 business days
              </p>

              <button
                onClick={closeModal}
                className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-3 px-6 rounded-lg font-semibold hover:from-green-600 hover:to-blue-600 transition-all duration-200 transform hover:scale-105"
              >
                Close
              </button>
            </div>

            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={24} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Basic version
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}
