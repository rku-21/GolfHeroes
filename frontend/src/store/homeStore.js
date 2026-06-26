import { create } from "zustand"
import { axiosInstance } from "../lib/axios";


export const HomeStore = create((set, get) => ({
    dashboardData: null,
    ScoresHistroy: null,
    exploreCha: null,
    mycharity: null,
    drawHistory: null,
    allPlans: null,
    mySubscriptons:null,




    getDashboard: async () => {
        try {
            const res = await axiosInstance.get("/user/dashboard");
            set({
                dashboardData: res.data
            })
            console.log(res.data);
        }
        catch (error) {
            console.log(error);
        }
    },
    getScoreHistroy: async () => {
        try {
            const res = await axiosInstance.get("/score");
            set({ ScoresHistroy: res.data });
            console.log(res.data);
        }
        catch (error) {
            console.log(error);
        }
    },

    getallExploreCha: async () => {
        try {
            const res = await axiosInstance.get("/charities");
            set({ exploreCha: res.data.charities });
            console.log(res.data);
        }
        catch (error) {
            console.log(error);
        }
    },
    getMycharity: async () => {
        try {
            const res = await axiosInstance.get("/charities/me");
            set({ mycharity: res.data.mycharity });
            console.log(res.data);
        }
        catch (error) {
            console.log(error);
        }
    },

    getDrawHistory: async () => {
        try {
            const res = await axiosInstance.get("/draw/history");
            set({ drawHistory: res.data });
            console.log(res.data);
        }
        catch (error) {
            console.log(error);
        }

    },

    uploadNewScore: async (formData) => {
        try {
            await axiosInstance.post("/score", formData);
            console.log("score uploaded");
        }
        catch (error) {
            console.log(error);
        }
    },

    // move this to other store later (landing page things)

    getAllPlans: async () => {
        try {
            const res = await axiosInstance.get("/plans");
            set({ allPlans: res.data.plans });
            console.log(res.data);


        }
        catch (err) {
            console.log(err);
        }
    },

    updateCharity: async (charityId) => {
        try {
            const res = await axiosInstance.put("/charities", { charityId });
            console.log("charity updated");
            set({ mycharity: res.data.mycharity })
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }

    },

    Subscribe: async (plan) => {
    try {
        console.log("STEP 1: Subscribe clicked");

        const { data } = await axiosInstance.post(
            "/payments/create-order",
            { plan }
        );

        console.log("STEP 2: Order created");
        console.log(data);

        const options = {
            key: import.meta.env.VITE_RAZORPAY_API_KEY,

            amount: data.amount,
            currency: data.currency,
            order_id: data.id,

            name: "Golf Heroes",
            description: `${plan} subscription`,

            handler: async (response) => {
                try {
                    console.log("STEP 3: Payment Success");
                    console.log(response);

                    const res = await axiosInstance.post(
                        "/subscriptions",
                        {
                            plan,
                            paymentId:
                                response.razorpay_payment_id,
                        }
                    );

                    console.log("STEP 4: Subscription Created");
                    console.log(res.data);

                    alert("Subscription Activated");

                } catch (error) {
                    console.log(
                        "STEP 4 FAILED"
                    );
                    console.log(error);
                }
            },
        };

        console.log("STEP 2.5: Opening Razorpay");

        const rzp = new window.Razorpay(options);

        rzp.on("payment.failed", function (response) {
            console.log(
                "PAYMENT FAILED"
            );
            console.log(response);
        });

        rzp.open();

    } catch (error) {
        console.log("SUBSCRIBE ERROR");
        console.log(error);
    }
},
    getMySubscriptons:async()=>{
        try {
            const res=await axiosInstance.get("/subscriptions"); 
            set({mySubscriptons:res.data});
            console.log(res.data);
        }
        catch(error){
            console.log(error);
        }
    }

   


}));