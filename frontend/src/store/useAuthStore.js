import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";

export const useAuthStore = create((set, get) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,

    signup: async (signupData) => {
        set({ isSigningUp: true });

        try {
            const res = await axiosInstance.post("/auth/signup", signupData);

            set({
                authUser: res.data,
            });
            console.log(get().authUser);

            return res.data;
        } catch (error) {
            console.log(error);
            throw error;
        } finally {
            set({ isSigningUp: false });
        }
    },

    login: async ({email,password}) => {
        set({ isLoggingIn: true });

        try {
            console.log(email,password);
            const res = await axiosInstance.post("/auth/login",{email,password});
            console.log("login successfully");

            set({
                authUser: res.data,
            });
            console.log(get().authUser);

            return res.data;
        } catch (error) {
            console.log(error);
            throw error;
        } finally {
            set({ isLoggingIn: false });
        }
    },

    logout: async () => {
        try {
            await axiosInstance.post("/auth/logout");

            set({
                authUser: null,
            });
        } catch (error) {
            console.log(error);
        }
    },

    checkAuth: async () => {
        set({ isCheckingAuth: true });

        try {
            const res = await axiosInstance.get("/auth/check");

            set({
                authUser: res.data,
            });
        } catch (error) {
            set({
                authUser: null,
            });
        } finally {
            set({ isCheckingAuth: false });
        }
    },
    logout : async ()=>{
        try {
            await axiosInstance.post("/auth/logout");
            console.log("logout successfully");
            set({authUser:null});;
        }
        catch(error){
            console.log(error);

        }
    }
}));