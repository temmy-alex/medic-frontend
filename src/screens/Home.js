import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import TextButton from "../components/Button/TextButton";
import LoadingModal from "../components/Loading";
import moment from "moment/moment";
import { InputSingleField } from "../components/Field/InputField";
import { fetchAttendance } from "../config/api/services";
import { getToken } from "firebase/messaging";
import { messaging } from "../config/third_party/firebase";

function HomePage() {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');

    async function getAttendanceStaff() {
        try {
            setLoading(true);
            
            const res = await fetchAttendance({ from: start, to: end, page: 1, limit: 100 });

            console.log(res);

            setData(res);

            setLoading(false);
        } catch (error) {
            toast(error.message);
            setLoading(false);
        }
    }

    async function requestPermission() {
        //requesting permission using Notification API
        const permission = await Notification.requestPermission();
    
        if (permission === "granted") {
          const token = await getToken(messaging, {
            vapidKey: process.env.REACT_APP_SECRET_PAIR_KEY,
          });
    
          //We can send token to server
          console.log("Token generated : ", token, '==');
        } else if (permission === "denied") {
          //notifications are blocked
          alert("You denied for the notification");
        }
      }
    
      useEffect(() => {
        requestPermission();
      }, []);

    useEffect(() => {
        setStart(moment(
            `${moment().startOf('month').format('YYYY-MM-DD')} ${'00:00'}`,
            'YYYY-MM-DD HH:mm'
        ).format('YYYY-MM-DD'))
        setEnd(moment().format('YYYY-MM-DD'));

        getAttendanceStaff();
    }, [])

    return (
        <div className="py-5 px-5 md:p-[50px] md:py-10">
            <p className="text-lg md:text-2xl text-center font-bold">Riwayat Absensi</p>
            <div className="flex flex-col md:flex-row w-full md:w-[75%] mx-auto items-end justify-between gap-4 md:gap-10 mt-10">
                <InputSingleField label={'From'} labelColor={'text-black'} value={start} onChange={(e) => setStart(e.target.value)} type={'date'}  />
                <InputSingleField label={'To'} labelColor={'text-black'} value={end} onChange={(e) => setEnd(e.target.value)} type={'date'}  />
                <TextButton title={'Cari'} onClick={() => getAttendanceStaff()} />
            </div>
            <div className="mt-10 grid grid-cols-1  md:grid-cols-2 gap-5">
                {
                    data && data?.map((data) => {
                        return(
                            <div key={data.id} className="px-6 py-10 border rounded-lg">
                                <div className="grid grid-cols-2 items-center">
                                    <div>
                                        <div className="mb-4">
                                            <p className="font-medium">Nama</p>
                                            <p className="font-bold text-xl">{data?.account?.information?.name}</p>
                                        </div>
                                        <div className="mb-4">
                                            <p className="font-medium">Email</p>
                                            <p className="font-bold text-xl">{data?.account?.email}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-xl text-green-500 font-black">{data?.attendance === 'IN' ? 'Masuk' : 'Pulang'}</p>
                                        <p className="font-bold text-lg">{moment(data?.clockDate).format('DD MMM YYYY')} {moment(data?.clockTime).format('hh:mm')}</p>
                                    </div>
                                </div>
                                
                            </div>
                        )
                    })
                }
            </div>
            <LoadingModal open={loading} />
        </div>
    );
}

export default HomePage;
