import { useState } from "react";
import BaseModal from "./BaseModal";
import TextButton from "../Button/TextButton";
import { toast } from "react-toastify";
import { InputSingleField } from "../Field/InputField";
import { createStaff } from "../../config/api/services";


function AddStaffModal({ open, onClose, onLoading, }) {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [dob, setDob] = useState('');
    const [position, setPosition] = useState('');

    async function addUser() {
        try {
            onLoading(true);

            await createStaff({
                name,
                email,
                phone: phoneNumber,
                position,
                dob
            });

            toast(`Berhasil menambahkan karyawan ${name}`);
            onLoading(false);
            onClose();
        } catch (error) {
            onLoading(false);
            toast(error?.message)
        }
    }

    return (
      <BaseModal open={open}>
        <p className="text-center text-xl font-bold mb-5">Penambahan Karyawan</p>
        <div className="flex flex-col gap-5 px-10">
            <InputSingleField value={name} onChange={(e) => setName(e.target.value)} type={'text'} label={'Nama'} labelColor={'text-black'} labelWeight={'font-medium'} />
            <InputSingleField value={email} onChange={(e) => setEmail(e.target.value)} type={'email'} label={'Email'} labelColor={'text-black'} labelWeight={'font-medium'} />
            <InputSingleField value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} type={'phone'} label={'No. Telepon'} labelColor={'text-black'} labelWeight={'font-medium'} />
            <InputSingleField value={dob} onChange={(e) => setDob(e.target.value)} type={'date'} label={'Tanggal Lahir'} labelColor={'text-black'} labelWeight={'font-medium'} />
            <InputSingleField value={position} onChange={(e) => setPosition(e.target.value)} type={'text'} label={'Posisi'} labelColor={'text-black'} labelWeight={'font-medium'} />
            <div className="mt-6 flex flex-col gap-5">
                <TextButton title={'Tambah'} onClick={() => addUser()} />
                <TextButton title={'Tutup'} bgColor={'bg-black'} onClick={() => onClose()} />
            </div>
        </div>
      </BaseModal>
    );
  }
  
  export default AddStaffModal;
  