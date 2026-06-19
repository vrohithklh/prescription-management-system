const Topbar = ({ searchTerm, setSearchTerm }) => {
    return (
        <div className="bg-white rounded-3xl px-8 py-6 shadow-lg flex justify-between items-center mb-8">

            {/* Left Side */}

            <div>

                <h1 className="text-4xl font-bold text-gray-800">
                    Welcome Back 👋
                </h1>

                <p className="text-gray-500 mt-2">
                    Monitor healthcare activities and prescription workflows.
                </p>

            </div>

            {/* Right Side */}

            <div className="flex items-center gap-5">

                {/* Search Box */}

                <div className="relative">

                    <input
                        type="text"
                        placeholder="Search patients or medicines..."
                        value={searchTerm}
                        onChange={(e) =>
                            setSearchTerm(e.target.value)
                        }
                        className="border border-gray-300 px-5 py-3 rounded-2xl w-[320px] outline-none focus:border-blue-600"
                    />
                </div>

                {/* Profile */}

                <div className="flex items-center gap-4 bg-blue-50 px-5 py-3 rounded-2xl">

                    <div className="w-14 h-14 rounded-full bg-blue-700 text-white flex items-center justify-center text-xl font-bold">
                        D
                    </div>

                    <div>

                        <h3 className="font-bold text-gray-800">
                            Doctor User
                        </h3>

                        <p className="text-gray-500 text-sm">
                            Healthcare Specialist
                        </p>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default Topbar;