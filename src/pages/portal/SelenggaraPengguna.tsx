import Header from "../../components/Header";
import Topbar from "../../components/Topbar";
import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";
import PageTitle from "../../components/PageTitle";
import SectionCard from "../../components/SectionCard";
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import { useState } from "react";
import { MagnifyingGlassIcon, PlusIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

function SelenggaraPengguna() {
    // Sample users data
    const [users, setUsers] = useState([
        {
            id: 1,
            nama: "Inspektor Nur Aisyah binti Hassan",
            jenis: "Super",
            jabatan: "JSPT",
        },
        {
            id: 2,
            nama: "Puan Siti Nurhaliza",
            jenis: "Strategik",
            jabatan: "BKDN",
        },
        {
            id: 3,
            nama: "Koperal Stephanie Jane",
            jenis: "Pemilik Data",
            jabatan: "JSJN",
        },
        {
            id: 4,
            nama: "Konstabel Yana Abdul",
            jenis: "Pemilik Data",
            jabatan: "JSPT",
        },
        {
            id: 5,
            nama: "Pegawai Penyiasat Farahin Yazid",
            jenis: "Strategik",
            jabatan: "SPRM",
        },
        {
            id: 6,
            nama: "Ketua Warden Jailani Osman",
            jenis: "Pemilik Data",
            jabatan: "JIMM",
        },
        {
            id: 7,
            nama: "Dr. Fatimah Zahra",
            jenis: "Super",
            jabatan: "UIKD",
        },
        {
            id: 8,
            nama: "Komander Maritim Nabil Ahmad",
            jenis: "Pemilik Data",
            jabatan: "APMM",
        },
    ]);

    const [searchQuery, setSearchQuery] = useState("");
    const [filterJenis, setFilterJenis] = useState("Semua");
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
    const [formData, setFormData] = useState({
        nama: "",
        jenis: "Pemilik Data",
        jabatan: "",
    });

    // Filter users
    const filteredUsers = users.filter((user) => {
        const matchesSearch = 
            user.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
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
        setFormData({
            nama: "",
            jenis: "Pemilik Data",
            jabatan: "",
        });
        setIsAddModalOpen(true);
    };

    const handleEditUser = (id: number) => {
        const user = users.find(u => u.id === id);
        if (user) {
            setFormData({
                nama: user.nama,
                jenis: user.jenis,
                jabatan: user.jabatan,
            });
            setSelectedUserId(id);
            setIsEditModalOpen(true);
        }
    };

    const handleDeleteUser = (id: number) => {
        if (confirm("Adakah anda pasti mahu memadam pengguna ini?")) {
            setUsers(users.filter(user => user.id !== id));
        }
    };

    const handleSubmitAdd = (e: React.FormEvent) => {
        e.preventDefault();
        const newUser = {
            id: Math.max(...users.map(u => u.id)) + 1,
            ...formData,
        };
        setUsers([...users, newUser]);
        setIsAddModalOpen(false);
    };

    const handleSubmitEdit = (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedUserId) {
            setUsers(users.map(user => 
                user.id === selectedUserId 
                    ? { ...user, ...formData }
                    : user
            ));
            setIsEditModalOpen(false);
            setSelectedUserId(null);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
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
                                    placeholder="Cari nama pengguna atau jabatan..."
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
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-24">
                                        Gambar
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Nama Pengguna
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-40">
                                        Jenis Pengguna
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
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <img 
                                                src={`/src/assets/images/${user.jabatan.toLowerCase()}.jpg`}
                                                alt={user.nama}
                                                className="h-10 w-10 rounded-full object-cover"
                                            />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {user.nama}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getUserTypeBadgeColor(user.jenis)}`}>
                                                {user.jenis}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-2">
                                                <img 
                                                    src={`/src/assets/images/pemilik-data/${user.jabatan}.png`}
                                                    alt={user.jabatan}
                                                    className="h-8 w-8 object-contain"
                                                />
                                                <span className="text-sm text-gray-900 font-medium">
                                                    {user.jabatan}
                                                </span>
                                            </div>
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

                {/* Add User Modal */}
                <Modal
                    isOpen={isAddModalOpen}
                    onClose={() => setIsAddModalOpen(false)}
                    title="Tambah Pengguna Baharu"
                    size="md"
                >
                    <form onSubmit={handleSubmitAdd} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Nama Pengguna
                            </label>
                            <input
                                type="text"
                                name="nama"
                                value={formData.nama}
                                onChange={handleInputChange}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Masukkan nama pengguna"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Jenis Pengguna
                            </label>
                            <select
                                name="jenis"
                                value={formData.jenis}
                                onChange={handleInputChange}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="Super">Super</option>
                                <option value="Strategik">Strategik</option>
                                <option value="Pemilik Data">Pemilik Data</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Jabatan
                            </label>
                            <input
                                type="text"
                                name="jabatan"
                                value={formData.jabatan}
                                onChange={handleInputChange}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Masukkan jabatan"
                            />
                        </div>

                        <div className="flex justify-end gap-3 pt-4">
                            <Button
                                type="button"
                                variant="secondary"
                                size="md"
                                onClick={() => setIsAddModalOpen(false)}
                            >
                                Batal
                            </Button>
                            <Button
                                type="submit"
                                variant="primary"
                                size="md"
                            >
                                Tambah
                            </Button>
                        </div>
                    </form>
                </Modal>

                {/* Edit User Modal */}
                <Modal
                    isOpen={isEditModalOpen}
                    onClose={() => setIsEditModalOpen(false)}
                    title="Sunting Pengguna"
                    size="md"
                >
                    <form onSubmit={handleSubmitEdit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Nama Pengguna
                            </label>
                            <input
                                type="text"
                                name="nama"
                                value={formData.nama}
                                onChange={handleInputChange}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Masukkan nama pengguna"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Jenis Pengguna
                            </label>
                            <select
                                name="jenis"
                                value={formData.jenis}
                                onChange={handleInputChange}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="Super">Super</option>
                                <option value="Strategik">Strategik</option>
                                <option value="Pemilik Data">Pemilik Data</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Jabatan
                            </label>
                            <input
                                type="text"
                                name="jabatan"
                                value={formData.jabatan}
                                onChange={handleInputChange}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Masukkan jabatan"
                            />
                        </div>

                        <div className="flex justify-end gap-3 pt-4">
                            <Button
                                type="button"
                                variant="secondary"
                                size="md"
                                onClick={() => setIsEditModalOpen(false)}
                            >
                                Batal
                            </Button>
                            <Button
                                type="submit"
                                variant="primary"
                                size="md"
                            >
                                Simpan
                            </Button>
                        </div>
                    </form>
                </Modal>
            </div>
            </main>
        </div>
        <Footer />
        </div>
    )
}

export default SelenggaraPengguna;