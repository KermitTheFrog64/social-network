import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "3d48ad22-877f-4fc1-be8e-2aea9970c2a9"
    }
});

export const userAPI = {

    getUsers (currentPage, pageSize) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`).then(response => response.data)
    },

    unfollowUser (id) {
        return instance.delete(`follow/${id}`).then(response => response.data)
    },

    followUser (id) {
        return instance.post(`follow/${id}`, {}).then(response => response.data)
    }
    
}

export const profileAPI = {

    getProfile (userId) {
        return instance.get(`profile/` + userId)
    },

    getStatus (userId) {
        return instance.get(`profile/status/` + userId)
    },
    updateStatus (status) {
        return instance.put(`profile/status`, {status: status})
    },
    savePhoto(photoFile) {
        const formData = new FormData();
        formData.append("image", photoFile);

        return instance.put(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },
    saveProfile(profile) {
        return instance.put(`profile`, profile)
    }
}

export const authAPI = {

    getMe () {
        return instance.get(`auth/me`)
    },

    login (email, password, rememberMe = false, captcha = null) {
        return instance.post(`auth/login`, {email, password, rememberMe, captcha})
    },

    logout () {
        return instance.delete(`auth/login`)
    }
}

export const securityAPI = {
    getCaptchaURL () {
        return instance.get(`security/get-captcha-url`)
    }
}