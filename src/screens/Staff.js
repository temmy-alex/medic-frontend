import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import TextButton from "../components/Button/TextButton";
import LoadingModal from "../components/Loading";
import { fetchStaff } from "../config/api/services";
import ModifyProfileModal from "../components/Modal/ModifyProfile";
import AddStaffModal from "../components/Modal/AddStaff";

function StaffPage() {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const [openProfile, setOpenProfile] = useState(false);
    const [openAdd, setOpenAdd] = useState(false);
    const [userSelected, setUserSelected] = useState(null);

    async function getListStaff() {
        try {
            setLoading(true);
            
            const res = await fetchStaff();

            setData(res);

            setLoading(false);
        } catch (error) {
            toast(error.message);
            setLoading(false);
        }
    }

    useEffect(() => {
        getListStaff();
    }, [])

    return (
        <div className="py-5 px-5 md:p-[50px] md:py-10">
            <p className="text-lg md:text-2xl text-center font-bold">Database Karyawan</p>
            <div className="w-full ml-auto mt-10">
                <TextButton title={'Tambah Karyawan'} onClick={() => setOpenAdd(true)} />
            </div>
            <table className="mt-10 overflow-x-scroll max-w-fit">
                <thead>
                    <tr>
                        <th className="w-[600px] border">ID</th>
                        <th className="w-[300px] border">Nama</th>
                        <th className="w-[300px] border">Email</th>
                        <th className="w-[300px] border">Phone</th>
                        <th className="w-[300px] border"></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data?.map((data) => {
                            return(
                                <tr key={data.id} className="text-center h-[100px]">
                                    <td className="border">{data?.id}</td>
                                    <td className="border">{data?.information?.name}</td>
                                    <td className="border">{data?.email}</td>
                                    <td className="border">{data?.phone || '-'}</td>
                                    <td className="border px-4">
                                        <TextButton 
                                            title={'Edit'} 
                                            onClick={() => {
                                                setUserSelected(data);
                                                setOpenProfile(true);
                                            }}
                                        />
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>

            { openProfile && <ModifyProfileModal user={userSelected} open={openProfile} onClose={() => setOpenProfile(false)} onLoading={(e) => { 
                if(!e) getListStaff()
                
                setLoading(e)}
            } /> }

            { openAdd && <AddStaffModal open={openAdd} onClose={() => setOpenAdd(false)} onLoading={(e) => { 
                if(!e) getListStaff()
                
                setLoading(e)}
            } /> }
            <LoadingModal open={loading} />
        </div>
    );
}

export default StaffPage;
