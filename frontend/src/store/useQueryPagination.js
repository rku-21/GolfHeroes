import {create} from "zustand"
import { axiosInstance } from "../lib/axios"

export const useQueryPagination=create((set,get)=>({
    isCharityLoading:null,
    charities:[],
    charityPagination:{
        nextCursor:null,
        isLoading:false,
        hasMore:false,
    },

    getCharity : async(reset=true)=>{
        const currentState=get();
        if(currentState.charityPagination.isLoading) return;

        set({
            isCharityLoading:reset,
            ...currentState.charityPagination,
            isLoading:true,
        });

        try {
            const cursor=reset?null:currentState.charityPagination.nextCursor;
            const params = cursor ? `?cursor=${cursor}&limit=20` : '?limit=20';

            const res=await axiosInstance.get(`/charities${params}`);

            set(state=>({
                charities:reset?res.data.charities:[...state.charities,...res.data.charities],
                charityPagination:{
                    nextCursor:res.data.nextCursor,
                    hasMore:res.data.hasMore,
                    isLoading:false,
                }
            }))
        }
        catch(error){
            console.log(error);
            set({
            charityPagination:{
                ...currentState.charityPagination,
                isLoading:false,
            }
        })

        }
        finally{
            set({isCharityLoading:false})
        }
    },

    loadMoreCharity:async()=>{
        try {
            await get().getCharity(false);
        }
        catch(error){
            console.log(error);
        }

    }





}))