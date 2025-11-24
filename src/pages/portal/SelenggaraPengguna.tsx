import Header from "../../components/Header";
import Topbar from "../../components/Topbar";
import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";
import PageTitle from "../../components/PageTitle";
import SectionCard from "../../components/SectionCard";
import Button from "../../components/Button";
import { useState } from "react";
import { MagnifyingGlassIcon, PlusIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

function SelenggaraPengguna() {
    // Sample users data
    const [users, setUsers] = useState([
        {
            id: 1,
            nama: "Dr. Ahmad bin Abdullah",
            jenis: "Super",
            agensi: "PDRM",
            jabatan: "JSPT",
        },
        {
            id: 2,
            nama: "Puan Siti Nurhaliza",
            jenis: "Strategik",
            agensi: "KDN",
            jabatan: "BKDN",
        },
        {
            id: 3,
            nama: "Encik Mohd Razak",
            jenis: "Pemilik Data",
            agensi: "PDRM",
            jabatan: "JSJN",
        },
        {
            id: 4,
            nama: "Puan Mimi Aminah",
            jenis: "Pemilik Data",
            agensi: "PDRM",
            jabatan: "JSPT",
        },
        {
            id: 5,
            nama: "Dr. Tan Wei Ling",
            jenis: "Strategik",
            agensi: "SPRM",
            jabatan: "SPRM",
        },
        {
            id: 6,
            nama: "Encik Rajesh Kumar",
            jenis: "Pemilik Data",
            agensi: "JIM",
            jabatan: "JIMM",
        },
        {
            id: 7,
            nama: "Puan Fatimah Zahra",
            jenis: "Super",
            agensi: "KDN",
            jabatan: "UIKD",
        },
        {
            id: 8,
            nama: "Encik Lee Chong Wei",
            jenis: "Pemilik Data",
            agensi: "APMM",
            jabatan: "APMM",
        },
    ]);

    const [searchQuery, setSearchQuery] = useState("");
    const [filterJenis, setFilterJenis] = useState("Semua");

    // Filter users
    const filteredUsers = users.filter((user) => {
        const matchesSearch = 
            user.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.agensi.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.jabatan.toLowerCase().includes(searchQuery.toLowerCase());
        
        const matchesFilter = filterJenis === "Semua" || user.jenis === filterJenis;
        
        return matchesSearch && matchesFilter;
    });

    const getUserTypeBadgeColor = (jenis: string) => {
        switch (jenis) {
            case "Super":
                return "bg-red-100 text-red-800";
            case "Strategik":
                return "bg-blue-100 text-blue-800";
            case "Pemilik Data":
                return "bg-green-100 text-green-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    const handleAddUser = () => {
        alert("Tambah pengguna baharu");
    };

    const handleEditUser = (id: number) => {
        alert(`Sunting pengguna ID: ${id}`);
    };

    const handleDeleteUser = (id: number) => {
        if (confirm("Adakah anda pasti mahu memadam pengguna ini?")) {
            setUsers(users.filter(user => user.id !== id));
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
        <Header />
        <Topbar />
        <div className="flex flex-grow">
            <Sidebar />
            <main className="flex-grow p-6">
            <div className="container mx-auto">
                <PageTitle>Selenggara Pengguna</PageTitle>
                <SectionCard title="Selenggara Pengguna">
                    {/* Search and Filter Bar */}
                    <div className="mb-6 flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Cari nama pengguna, agensi, atau jabatan..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                />
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <select
                                value={filterJenis}
                                onChange={(e) => setFilterJenis(e.target.value)}
                                className="block px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            >
                                <option value="Semua">Semua Jenis</option>
                                <option value="Super">Super</option>
                                <option value="Strategik">Strategik</option>
                                <option value="Pemilik Data">Pemilik Data</option>
                            </select>
                            <Button
                                variant="primary"
                                size="md"
                                onClick={handleAddUser}
                            >
                                <PlusIcon className="h-5 w-5 mr-2" />
                                Tambah Pengguna
                            </Button>
                        </div>
                    </div>

                    {/* Results Count */}
                    <div className="mb-4 text-sm text-gray-600">
                        Menunjukkan {filteredUsers.length} daripada {users.length} pengguna
                    </div>

                    {/* Users Table */}
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-16">
                                        Bil.
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Nama Pengguna
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-40">
                                        Jenis Pengguna
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">
                                        Agensi
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">
                                        Jabatan
                                    </th>
                                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-40">
                                        Tindakan
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredUsers.map((user, index) => (
                                    <tr key={user.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {index + 1}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {user.nama}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getUserTypeBadgeColor(user.jenis)}`}>
                                                {user.jenis}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                            {user.agensi}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                            {user.jabatan}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center">
                                            <div className="flex items-center justify-center gap-2">
                                                <Button
                                                    variant="secondary"
                                                    size="sm"
                                                    onClick={() => handleEditUser(user.id)}
                                                >
                                                    <PencilIcon className="h-4 w-4 mr-1" />
                                                    Sunting
                                                </Button>
                                                <Button
                                                    variant="danger"
                                                    size="sm"
                                                    onClick={() => handleDeleteUser(user.id)}
                                                >
                                                    <TrashIcon className="h-4 w-4 mr-1" />
                                                    Padam
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {filteredUsers.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-gray-500 text-sm">
                                Tiada pengguna dijumpai. Cuba ubah carian atau tapis anda.
                            </p>
                        </div>
                    )}
                </SectionCard>
            </div>
            </main>
        </div>
        <Footer />
        </div>
    )
}

export default SelenggaraPengguna;