import PatientSidebar from "../../../components/PatientSidebar";

const PatientLayout = ({ children }) => {

    return (

        <div className="relative flex min-h-screen bg-white overflow-hidden">

            {/* Floating Background Glow */}

            <div className="absolute top-[-150px] right-[-100px] w-[320px] h-[320px] bg-cyan-400/10 blur-3xl rounded-full animate-pulse"></div>

            <div className="absolute bottom-[-150px] left-[20%] w-[320px] h-[320px] bg-blue-500/10 blur-3xl rounded-full animate-pulse"></div>

            {/* Animated Particles */}

            <div className="absolute top-[20%] left-[40%] w-4 h-4 bg-cyan-400 rounded-full opacity-20 animate-bounce"></div>

            <div className="absolute top-[60%] left-[70%] w-3 h-3 bg-blue-500 rounded-full opacity-20 animate-ping"></div>

            <div className="absolute top-[80%] left-[50%] w-5 h-5 bg-cyan-300 rounded-full opacity-10 animate-pulse"></div>

            {/* Sidebar */}

            <PatientSidebar />

            {/* Main Content */}

            <div className="relative z-10 flex-1 p-10 overflow-y-auto text-black">

                {children}

            </div>

        </div>

    );

};

export default PatientLayout;