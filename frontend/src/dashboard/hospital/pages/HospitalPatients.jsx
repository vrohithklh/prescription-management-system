import HospitalLayout from "../layouts/HospitalLayout";

const HospitalPatients = () => {

    const patients = [
        {
            id: "PAT001",
            name: "Rahul Sharma",
            age: 32,
            gender: "Male",
            doctor: "Dr. Sharma",
            status: "Active",
        },
        {
            id: "PAT002",
            name: "Priya Reddy",
            age: 27,
            gender: "Female",
            doctor: "Dr. Kumar",
            status: "Critical",
        },
        {
            id: "PAT003",
            name: "Arjun Patel",
            age: 41,
            gender: "Male",
            doctor: "Dr. Smith",
            status: "Recovering",
        },
    ];

    return (
        <HospitalLayout>

            <h1 className="text-5xl font-black text-slate-900 mb-10">
                Patients Management
            </h1>

            <div className="grid lg:grid-cols-3 gap-8">

                {patients.map((patient) => (

                    <div
                        key={patient.id}
                        className="bg-white rounded-[32px] p-8 shadow-xl"
                    >

                        <h2 className="text-2xl font-black">
                            {patient.name}
                        </h2>

                        <p className="text-cyan-600 mt-2">
                            {patient.id}
                        </p>

                        <div className="mt-6 space-y-3">

                            <p>
                                Age: {patient.age}
                            </p>

                            <p>
                                Gender: {patient.gender}
                            </p>

                            <p>
                                Doctor: {patient.doctor}
                            </p>

                        </div>

                        <button className="w-full mt-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-700 text-white font-bold">
                            View Records
                        </button>

                    </div>

                ))}

            </div>

        </HospitalLayout>
    );
};

export default HospitalPatients;