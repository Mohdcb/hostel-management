// Demo data for admin and user dashboards

// Admin Dashboard Data
export const monthlyData = [
  { month: "Jan", income: 45000, expenses: 12000 },
  { month: "Feb", income: 52000, expenses: 15000 },
  { month: "Mar", income: 48000, expenses: 11000 },
  { month: "Apr", income: 61000, expenses: 18000 },
  { month: "May", income: 55000, expenses: 14000 },
  { month: "Jun", income: 67000, expenses: 16000 },
];

export const occupancyData = [
  { month: "Jan", occupancy: 85 },
  { month: "Feb", occupancy: 92 },
  { month: "Mar", occupancy: 78 },
  { month: "Apr", occupancy: 95 },
  { month: "May", occupancy: 88 },
  { month: "Jun", occupancy: 96 },
];

export const paymentStatusData = [
  { name: "Paid", value: 18, color: "#a3e635" },
  { name: "Pending", value: 4, color: "#f59e0b" },
  { name: "Partial", value: 2, color: "#ef4444" },
];

export const recentPayments = [
  {
    id: 1,
    name: "John Doe",
    room: "A-101",
    amount: 5000,
    status: "paid",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: 2,
    name: "Sarah Wilson",
    room: "B-205",
    amount: 5500,
    status: "pending",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: 3,
    name: "Mike Johnson",
    room: "A-103",
    amount: 5000,
    status: "paid",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: 4,
    name: "Emily Davis",
    room: "C-301",
    amount: 6000,
    status: "partial",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
  },
];

export const initialTenants = [
  {
    id: 1,
    name: "John Doe",
    room: "A-101",
    status: "paid",
    phone: "+91 9876543210",
    email: "john.doe@email.com",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    checkIn: "Sep 2024",
    emergencyContact: "+91 9876543211",
  },
  {
    id: 2,
    name: "Sarah Wilson",
    room: "B-205",
    status: "pending",
    phone: "+91 9876543211",
    email: "sarah.wilson@email.com",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    checkIn: "Oct 2024",
    emergencyContact: "+91 9876543212",
  },
  {
    id: 3,
    name: "Mike Johnson",
    room: "A-103",
    status: "paid",
    phone: "+91 9876543212",
    email: "mike.johnson@email.com",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    checkIn: "Aug 2024",
    emergencyContact: "+91 9876543213",
  },
  {
    id: 4,
    name: "Emily Davis",
    room: "C-301",
    status: "partial",
    phone: "+91 9876543213",
    email: "emily.davis@email.com",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    checkIn: "Nov 2024",
    emergencyContact: "+91 9876543214",
  },
  {
    id: 5,
    name: "Alex Chen",
    room: "B-102",
    status: "paid",
    phone: "+91 9876543214",
    email: "alex.chen@email.com",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    checkIn: "Jul 2024",
    emergencyContact: "+91 9876543215",
  },
  {
    id: 6,
    name: "Lisa Park",
    room: "C-205",
    status: "paid",
    phone: "+91 9876543215",
    email: "lisa.park@email.com",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
    checkIn: "Dec 2024",
    emergencyContact: "+91 9876543216",
  },
];

export const initialRooms = [
  { id: 1, number: "A-101", capacity: 2, occupied: 1, rent: 5000 },
  { id: 2, number: "A-102", capacity: 3, occupied: 3, rent: 6000 },
  { id: 3, number: "B-205", capacity: 2, occupied: 1, rent: 5500 },
  { id: 4, number: "C-301", capacity: 4, occupied: 2, rent: 7000 },
];

export const hostels = [
  { id: 1, name: "Green Valley Hostel", location: "Downtown", tenants: 24, rooms: 12 },
  { id: 2, name: "Sunrise Residency", location: "University Area", tenants: 18, rooms: 8 },
  { id: 3, name: "Blue Mountain Lodge", location: "Tech Park", tenants: 32, rooms: 16 },
  { id: 4, name: "Golden Heights", location: "City Center", tenants: 28, rooms: 14 },
];

// User Dashboard Data
export const paymentHistory = [
  { month: "December 2024", amount: 5500, status: "paid", date: "2024-12-05", mode: "UPI" },
  { month: "November 2024", amount: 5500, status: "paid", date: "2024-11-05", mode: "Cash" },
  { month: "October 2024", amount: 5500, status: "paid", date: "2024-10-05", mode: "UPI" },
  { month: "September 2024", amount: 5500, status: "paid", date: "2024-09-05", mode: "Bank Transfer" },
]; 