import Charity from "../models/charity.model.js";
import { connectDB } from "../lib/db.js";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

export const charities = [
  {
    name: "World Wildlife Fund",
    description: "Protecting endangered species and wildlife habitats worldwide.",
    image: "https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=800",
    website: "https://www.worldwildlife.org",
    category: "Wildlife"
  },
  {
    name: "Ocean Conservation",
    description: "Protecting marine ecosystems and ocean biodiversity.",
    image: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800",
    website: "https://oceanconservancy.org",
    category: "Environment"
  },
  {
    name: "Forest Protection Initiative",
    description: "Fighting deforestation and restoring forests.",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800",
    website: "https://www.rainforest-alliance.org",
    category: "Environment"
  },
  {
    name: "Medical Research Foundation",
    description: "Supporting breakthrough treatments and medical innovation.",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800",
    website: "https://www.cancerresearch.org",
    category: "Health"
  },
  {
    name: "Youth Sports Program",
    description: "Helping children access sports and education opportunities.",
    image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800",
    website: "https://www.righttoplay.com",
    category: "Youth"
  },
  {
    name: "Clean Water Project",
    description: "Providing safe drinking water to underserved communities.",
    image: "https://images.unsplash.com/photo-1541544741938-0af808871cc0?w=800",
    website: "https://water.org",
    category: "Humanitarian"
  },
  {
    name: "Education For All",
    description: "Making quality education accessible worldwide.",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800",
    website: "https://www.unicef.org",
    category: "Education"
  },
  {
    name: "Animal Rescue Network",
    description: "Rescuing and rehabilitating abandoned animals.",
    image: "https://images.unsplash.com/photo-1517849845537-4d257902454a?w=800",
    website: "https://www.aspca.org",
    category: "Animals"
  },
  {
    name: "Disaster Relief Fund",
    description: "Providing emergency assistance during disasters.",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800",
    website: "https://www.redcross.org",
    category: "Relief"
  },
  {
    name: "Food Security Alliance",
    description: "Combating hunger and food insecurity worldwide.",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800",
    website: "https://www.feedingamerica.org",
    category: "Food"
  },
  {
    name: "Mental Health Support",
    description: "Promoting mental health awareness and support services.",
    image: "https://images.unsplash.com/photo-1516302752625-fcc3c50ae61f?w=800",
    website: "https://www.nami.org",
    category: "Health"
  },
  {
    name: "Community Development Fund",
    description: "Supporting local communities through sustainable projects.",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800",
    website: "https://www.un.org",
    category: "Community"
  }
];

const seedCharities = async () => {
  try {
    await connectDB();
    await Charity.deleteMany();
    await Charity.insertMany(charities);

    console.log("✅ Charities Seeded Successfully");
  } catch (error) {
    console.log(error);
  }
};
seedCharities();