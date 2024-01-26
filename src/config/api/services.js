import { HttpGet, HttpPost, HttpPut } from ".";

const login = async ({
    email,
    password
}) => {
    try {
        return await HttpPost(`api/auths/login`, {
            email,
            password,
        }, null);
    } catch (error) {
        throw error
    }
}

const fetchAttendance = async ({ from, to, page, limit }) => {
    try {
        return await HttpGet(`dashboard/attendances?from=${from}&to=${to}&page=${page}&limit=${limit}`, null);
    } catch (error) {
        throw error
    }
}

const fetchStaff = async () => {
    try {
        return await HttpGet(`dashboard/accounts`, null);
    } catch (error) {
        throw error
    }
}
const fetchUserProfile = async () => {
    try {
        return await HttpGet(`api/accounts`, null);
    } catch (error) {
        throw error
    }
}

const updatePassword = async ({
    oldPassword,
    newPassword,
    confirmPassword,
}) => {
    try {
        return await HttpPut(`api/accounts/security`, {
            oldPassword,
            password: newPassword,
            confirmPassword,
        }, null);
    } catch (error) {
        throw error
    }
}

const updateProfile = async ({
    phone,
    profile,
    userId
}) => {
    try {
        return await HttpPut(`dashboard/accounts/information/${userId}`, {
            profile,
            phone
        }, null);
    } catch (error) {
        throw error
    }
}

const uploadDocument = async (data) => {
    try {
        return await HttpPost(`api/uploads`, data, null);
    } catch (error) {
        throw error
    }
}

const createStaff = async (data) => {
    try {
        return await HttpPost(`dashboard/accounts/`, data, null);
    } catch (error) {
        throw error
    }
}

export {
    login,
    fetchAttendance,
    fetchUserProfile,
    updatePassword,
    updateProfile,
    uploadDocument,
    fetchStaff,
    createStaff
}