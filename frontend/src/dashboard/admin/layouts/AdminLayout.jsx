import AdminSidebar from "../../../components/AdminSidebar";

const AdminLayout = ({ children }) => {

    return (

        <div className="relative flex min-h-screen bg-white overflow-hidden">

            {/* Floating Glow */}

            <div className="absolute top-[-150px] right-[-100px] w-[320px] h-[320px] bg-cyan-400/10 blur-3xl rounded-full animate-pulse"></div>

            <div className="absolute bottom-[-150px] left-[20%] w-[320px] h-[320px] bg-blue-500/10 blur-3xl rounded-full animate-pulse"></div>

            {/* Particles */}

            <div className="absolute top-[20%] left-[40%] w-4 h-4 bg-cyan-400 rounded-full opacity-20 animate-ping"></div>

            <div className="absolute top-[60%] left-[70%] w-3 h-3 bg-blue-500 rounded-full opacity-20 animate-bounce"></div>

            {/* Sidebar */}

            <AdminSidebar />

            {/* Main Content */}

            <div className="relative z-10 flex-1 p-10 overflow-y-auto text-black">

                {children}

            </div>

        </div>

    );

};

export default AdminLayout;