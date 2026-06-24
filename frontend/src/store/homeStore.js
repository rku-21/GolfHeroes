import {create} from "zustand"
import { axiosInstance } from "../lib/axios";


export const HomeStore=create((set,get)=>({
    dashboardData:null,
    ScoresHistroy:null,
    exploreCha:null,
    mycharity:null,
    drawHistory:null,
    



    getDashboard: async()=>{
        try {
            const res=await axiosInstance.get("/user/dashboard");
            set({
                dashboardData:res.data          
            })
        }
        catch(error){
            console.log(error);
        }
    },
    getScoreHistroy: async()=>{
        try {
            const res=await axiosInstance.get("/score");
            set({ScoresHistroy:res.data});
            console.log(res.data);
        }
        catch(error){
        console.log(error);
       }
    },

    getallExploreCha:async()=>{
        try {
            const res=await axiosInstance.get("/charities");
            set({exploreCha:res.data});
            console.log(res.data);
        }
        catch(error){
            console.log(error);
        }
    },
    getMycharity: async ()=>{
        try {
            const res=await axiosInstance.get("/charities/me");
            set({mycharity:res.data});
            console.log(res.data);
        }
        catch(error){
            console.log(error);
        }
    },

    getDrawHistory: async ()=>{
        try {
            const res=await axiosInstance.get("/draw/history");
            set({drawHistory:res.data});
            console.log(res.data);
        }
        catch(error){
            console.log(error);
        }

    }
    

}));