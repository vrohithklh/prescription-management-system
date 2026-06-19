import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

// Doctor Module

import DoctorDashboard from "./dashboard/doctor/DoctorDashboard";
import DoctorHome from "./dashboard/doctor/pages/DoctorHome";
import Prescriptions from "./dashboard/doctor/pages/Prescriptions";
import Patients from "./dashboard/doctor/pages/Patients";
import Medicines from "./dashboard/doctor/pages/Medicines";
import Analytics from "./dashboard/doctor/pages/Analytics";
import Settings from "./dashboard/doctor/pages/Settings";
import ProtectedRoute from "./components/ProtectedRoute";
// Patient Module
import PatientAppointments from "./dashboard/patient/pages/PatientAppointments";
import PatientDashboard from "./dashboard/patient/PatientDashboard";
import PatientHome from "./dashboard/patient/pages/PatientHome";
import PatientPrescriptions from "./dashboard/patient/pages/PatientPrescriptions";
import PatientRefills from "./dashboard/patient/pages/PatientRefills";
import PatientProfile from "./dashboard/patient/pages/PatientProfile";
import MedicineSchedule from "./dashboard/patient/pages/MedicineSchedule";
import RefillRequest from "./dashboard/patient/pages/RefillRequest";
// Admin Module
import DoctorAppointments from "./dashboard/doctor/pages/Appointments";
import AdminDashboard from "./dashboard/admin/pages/AdminDashboard";
import AdminDoctors from "./dashboard/admin/pages/Doctors";
import AdminPatients from "./dashboard/admin/pages/Patients";
import AdminPrescriptions from "./dashboard/admin/pages/Prescriptions";
import AdminAnalytics from "./dashboard/admin/pages/Analytics";
import AdminMedicines from "./dashboard/admin/pages/Medicines";
import AdminRefillRequests from "./dashboard/admin/pages/RefillRequests";
import Appointments from "./dashboard/admin/pages/Appointments";
import PatientDoctorChat from "./dashboard/chat/PatientDoctorChat";
import DoctorChat from "./dashboard/chat/DoctorChat";
import PatientNotifications from "./dashboard/patient/pages/PatientNotifications";
import PatientMedicalHistory from "./dashboard/patient/pages/PatientMedicalHistory";
import HospitalRegister from "./dashboard/hospital/HospitalRegister";
import HospitalLogin from "./dashboard/hospital/HospitalLogin";
import CreatePrescription from "./dashboard/doctor/pages/CreatePrescription";
import HospitalDashboard from "./dashboard/hospital/pages/HospitalDashboard";
import HospitalDoctors from "./dashboard/hospital/pages/HospitalDoctors";

import ConsultationEnded from "./pages/ConsultationEnded";
import ViewPrescription from "./dashboard/patient/pages/ViewPrescription";



function App() {

  return (
    < BrowserRouter >

      <Routes>
        <Route
          path="/hospital/dashboard"
          element={<HospitalDashboard />}
        />

        {/* HOSPTIAL ADMIN SETUP */}
        <Route
          path="/hospital/doctors"
          element={<HospitalDoctors />}
        />
        <Route
          path="/doctor/create-prescription"
          element={<CreatePrescription />}
        />
        <Route
          path="/consultation-ended"
          element={<ConsultationEnded />}
        />
        <Route
          path="/view-prescription"
          element={<ViewPrescription />}
        />

























        {/* Public Routes */}

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        {/* Doctor Routes */}

        <Route
          path="/doctor"
          element={
            <ProtectedRoute role="doctor">
              <DoctorDashboard />
            </ProtectedRoute>
          }
        />

        <Route path="/doctor/home" element={<DoctorHome />} />

        <Route
          path="/doctor/prescriptions"
          element={<Prescriptions />}
        />

        <Route
          path="/doctor/patients"
          element={<Patients />}
        />

        <Route
          path="/doctor/medicines"
          element={<Medicines />}
        />

        <Route
          path="/doctor/analytics"
          element={<Analytics />}
        />

        <Route
          path="/doctor/settings"
          element={<Settings />}
        />
        <Route
          path="/doctor/appointments"
          element={<DoctorAppointments />}
        />
        {/* Patient Routes */}

        <Route
          path="/patient"
          element={
            <ProtectedRoute role="patient">
              <PatientDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/hospital/login"
          element={<HospitalLogin />}
        />
        <Route
          path="/patient/appointments"
          element={<PatientAppointments />}
        />
        <Route
          path="/patient/home"
          element={<PatientHome />}
        />

        <Route
          path="/patient/prescriptions"
          element={<PatientPrescriptions />}
        />
        <Route
          path="/hospital/register"
          element={<HospitalRegister />}
        />
        <Route
          path="/patient/refills"
          element={<PatientRefills />}
        />

        <Route
          path="/patient/profile"
          element={<PatientProfile />}
        />
        <Route
          path="/patient/history"
          element={<PatientMedicalHistory />}
        />
        <Route
          path="/patient/schedule"
          element={<MedicineSchedule />}
        />
        <Route
          path="/patient/refill-request"
          element={<RefillRequest />}
        />
        <Route
          path="/patient/notifications"
          element={<PatientNotifications />}
        />
        {/* Admin Routes */}
        <Route
          path="/chat"
          element={<PatientDoctorChat />}
        />
<Route
  path="/admin"
  element={<AdminDashboard />}
/>
<Route
    path="/admin/appointments"
    element={<Appointments />}
/>
        <Route
          path="/admin/doctors"
          element={<AdminDoctors />}
        />
        <Route
          path="/doctor/chat"
          element={<DoctorChat />}
        />
        <Route
          path="/admin/patients"
          element={<AdminPatients />}
        />

        <Route
          path="/admin/prescriptions"
          element={<AdminPrescriptions />}
        />
        <Route
          path="/admin/analytics"
          element={<AdminAnalytics />}
        />
        <Route
          path="/admin/medicines"
          element={<AdminMedicines />}
        />
        <Route
          path="/doctor/appointments"
          element={<DoctorAppointments />}
        />
        <Route
          path="/admin/refills"
          element={<AdminRefillRequests />}
        />
      </Routes>

    </BrowserRouter >

  );

}

export default App;