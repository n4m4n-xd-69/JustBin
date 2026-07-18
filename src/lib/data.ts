/**
 * Static site content + seed data. Scrap rates are also seeded into the
 * database (see prisma/seed.ts); the rates section reads from the DB and
 * falls back to these values if the database is unreachable.
 */

export const WHATSAPP_NUMBER = "918081594764";
export const CONTACT_EMAIL = "pstiwari2468@gmail.com";
export const INSTAGRAM_HANDLE = "@justbin.info";

export type RateCategory = {
  slug: string;
  name: string;
  icon: string;
  description: string;
  items: { name: string; price: string; icon: string }[];
};

export const RATE_CATEGORIES: RateCategory[] = [
  {
    slug: "paper",
    name: "Paper & Books",
    icon: "📚",
    description: "Newspapers, notebooks, magazines and more",
    items: [
      { name: "Newspapers", price: "₹14-16/kg", icon: "📰" },
      { name: "Cardboard/Carton", price: "₹8-12/kg", icon: "📦" },
      { name: "Books & Copies", price: "₹12-14/kg", icon: "📚" },
      { name: "Office Paper", price: "₹10-12/kg", icon: "📄" },
    ],
  },
  {
    slug: "plastic",
    name: "Plastic",
    icon: "🧴",
    description: "Bottles, containers, packaging and more",
    items: [
      { name: "PET Bottles (Clear)", price: "₹18-22/kg", icon: "🍼" },
      { name: "Mixed Plastic", price: "₹8-12/kg", icon: "♻️" },
      { name: "Plastic Containers", price: "₹10-14/kg", icon: "🥡" },
      { name: "Plastic Bags", price: "₹6-8/kg", icon: "🛍️" },
    ],
  },
  {
    slug: "metal",
    name: "Metal",
    icon: "⚙️",
    description: "Iron, copper, aluminum, brass and more",
    items: [
      { name: "Iron/Steel", price: "₹25-30/kg", icon: "🔩" },
      { name: "Aluminum", price: "₹80-100/kg", icon: "🥫" },
      { name: "Copper", price: "₹400-450/kg", icon: "🔌" },
      { name: "Brass", price: "₹280-320/kg", icon: "⚙️" },
    ],
  },
  {
    slug: "electronics",
    name: "Electronics",
    icon: "💻",
    description: "Old gadgets, devices, cables and more",
    items: [
      { name: "Old Mobile Phones", price: "₹50-500/piece", icon: "📱" },
      { name: "Computer Parts", price: "₹20-100/kg", icon: "💻" },
      { name: "Cables & Wires", price: "₹30-50/kg", icon: "🔌" },
      { name: "Circuit Boards", price: "₹100-200/kg", icon: "🖥️" },
    ],
  },
  {
    slug: "others",
    name: "Glass & Others",
    icon: "🫙",
    description: "Bottles, jars, textiles and mixed scrap",
    items: [
      { name: "Glass Bottles", price: "₹2-4/kg", icon: "🍾" },
      { name: "Mixed Scrap", price: "₹5-8/kg", icon: "🗑️" },
      { name: "Rubber", price: "₹8-12/kg", icon: "⚫" },
      { name: "Textiles/Clothes", price: "₹6-10/kg", icon: "👕" },
    ],
  },
];

export const SELL_CATEGORIES = [
  {
    icon: "📚",
    name: "Paper & Books",
    description: "Newspapers, notebooks, magazines and more",
  },
  {
    icon: "🧴",
    name: "Plastic",
    description: "Bottles, containers, packaging and more",
  },
  {
    icon: "⚙️",
    name: "Metal",
    description: "Iron, copper, aluminum, brass and more",
  },
  {
    icon: "💻",
    name: "Electronics",
    description: "Old gadgets, devices, cables and more",
  },
  {
    icon: "📦",
    name: "Cardboard",
    description: "Boxes, cartons and packaging",
  },
  {
    icon: "🫙",
    name: "Glass",
    description: "Bottles, jars, and glass items",
  },
  {
    icon: "🗑️",
    name: "Household Scrap",
    description: "Miscellaneous scrap items",
  },
];

export const SCRAP_TYPE_OPTIONS = [
  "Paper & Books",
  "Plastic",
  "Metal",
  "Electronics",
  "Cardboard",
  "Glass",
  "Household / Mixed Scrap",
];

export const TIME_SLOTS = [
  "9:00 AM – 12:00 PM",
  "12:00 PM – 3:00 PM",
  "3:00 PM – 6:00 PM",
  "6:00 PM – 8:00 PM",
];

export const FAQS = [
  {
    question: "How does JustBin work?",
    answer:
      "Book a pickup on justbin.info in about 30 seconds — choose your scrap type, address and a convenient time slot. A verified local collector arrives at your doorstep, weighs your scrap, and pays you instantly at live market rates.",
  },
  {
    question: "Is there any pickup fee?",
    answer:
      "No. Doorstep pickup is completely free. You get paid for your scrap — you never pay us anything.",
  },
  {
    question: "How will I get paid?",
    answer:
      "Your scrap is weighed in front of you and you're paid on the spot — cash or UPI, whichever you prefer — at transparent market rates.",
  },
  {
    question: "What types of scrap can I sell?",
    answer:
      "Paper, cardboard, plastic, metal (iron, aluminum, copper, brass), electronics, glass, textiles and mixed household scrap. Check the live rate list for current prices per category.",
  },
  {
    question: "Can I reschedule my pickup?",
    answer:
      "Yes — message us on WhatsApp any time before your slot and we'll move your pickup to a date and time that works better for you, at no charge.",
  },
];

export const BOOKING_STEPS = [
  {
    step: 1,
    title: "Visit JustBin",
    description:
      "Open justbin.info on your mobile or computer and click 'Book Pickup' on the homepage.",
  },
  {
    step: 2,
    title: "Add Your Address",
    description:
      "Fill in your complete address with pincode so our collector can find you easily.",
  },
  {
    step: 3,
    title: "Select Scrap Type & Details",
    description:
      "Choose what you want to sell — plastic, paper, metal, electronics, glass. Select multiple types if needed.",
  },
  {
    step: 4,
    title: "Schedule Pickup Date",
    description:
      "Pick a convenient date and time slot. Same-day or future pickups available.",
  },
  {
    step: 5,
    title: "Submit Order to WhatsApp",
    description:
      "Review your order and submit. It's sent directly to our WhatsApp for instant confirmation.",
  },
  {
    step: 6,
    title: "Collector Arrives & Payment",
    description:
      "Our verified collector arrives at your doorstep. Scrap is weighed, and you get paid instantly at market rates.",
  },
];

export const PROBLEM_STATS = [
  {
    value: "150M Tons",
    title: "Waste Generated Annually",
    description:
      "India generates over 150 million tons of waste every year, and the number is growing rapidly with urbanization.",
  },
  {
    value: "Only 30%",
    title: "Actually Recycled",
    description:
      "Despite having recyclable materials, only 30% is actually recycled. The rest pollutes our environment.",
  },
  {
    value: "70%",
    title: "Goes to Landfills",
    description:
      "Millions of tons of recyclable waste go unmanaged every year, ending up in landfills and waterways.",
  },
];

export const ENVIRONMENTAL_IMPACTS = [
  {
    title: "Air Pollution",
    description:
      "Burning waste releases toxic gases and particulate matter, causing respiratory diseases.",
  },
  {
    title: "Water Pollution",
    description:
      "Leachate from landfills contaminates groundwater, affecting drinking water quality for millions.",
  },
  {
    title: "Climate Change",
    description:
      "Decomposing organic waste produces methane, a greenhouse gas 25x more potent than CO2.",
  },
];

export const MISSION_POINTS = [
  {
    title: "Our Mission",
    description:
      "Make recycling accessible to every Indian household through technology.",
  },
  {
    title: "Our Goal",
    description: "Process 10 million tons of recyclable waste by 2027.",
  },
  {
    title: "Our Vision",
    description:
      "Become India's next green-tech unicorn by transforming waste into opportunity.",
  },
];

export const IMPACT_AREAS = [
  {
    title: "Waste Reduction",
    description:
      "Diverting recyclables from landfills and promoting a circular economy.",
  },
  {
    title: "Cleaner Environment",
    description:
      "Reducing carbon emissions and air pollution through smart waste management.",
  },
  {
    title: "Resource Conservation",
    description:
      "Saving natural resources by recycling and reusing materials.",
  },
  {
    title: "Community Empowerment",
    description:
      "Empowering 100,000+ waste collectors with digital tools and steady income.",
  },
];

export const HOW_IT_WORKS_STEPS = [
  {
    step: 1,
    title: "Choose Scrap",
    description: "Select the type and approx weight of scrap you want to sell.",
  },
  {
    step: 2,
    title: "Book Pickup",
    description: "Pick a date and time that suits you.",
  },
  {
    step: 3,
    title: "Pickup Assigned",
    description: "A nearby kabadiwala will accept your request.",
  },
  {
    step: 4,
    title: "Pickup Completed",
    description: "Scrap is collected and you get paid instantly.",
  },
];
