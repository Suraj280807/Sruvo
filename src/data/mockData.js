// ── Mock Data for Sruvo Admin Panel ──

export const mockUsers = [
  { id: 1, name: 'Rohan Sharma', email: 'rohan@email.com', phone: '+91 9876543210', pets: 3, joined: '12 Jan 2025', status: 'Active', avatar: 'RS', spent: '₹12,450', city: 'Mumbai' },
  { id: 2, name: 'Priya Singh', email: 'priya@email.com', phone: '+91 9123456789', pets: 1, joined: '20 Feb 2025', status: 'Active', avatar: 'PS', spent: '₹8,200', city: 'Delhi' },
  { id: 3, name: 'Amir Khan', email: 'amir@email.com', phone: '+91 9988776655', pets: 2, joined: '05 Mar 2025', status: 'Inactive', avatar: 'AK', spent: '₹3,100', city: 'Pune' },
  { id: 4, name: 'Sneha Patel', email: 'sneha@email.com', phone: '+91 9765432100', pets: 1, joined: '18 Apr 2025', status: 'Active', avatar: 'SP', spent: '₹6,780', city: 'Ahmedabad' },
  { id: 5, name: 'Vikram Nair', email: 'vikram@email.com', phone: '+91 9654321098', pets: 4, joined: '01 May 2025', status: 'Active', avatar: 'VN', spent: '₹22,100', city: 'Bangalore' },
  { id: 6, name: 'Anita Roy', email: 'anita@email.com', phone: '+91 9543210987', pets: 2, joined: '14 May 2025', status: 'Suspended', avatar: 'AR', spent: '₹1,500', city: 'Kolkata' },
  { id: 7, name: 'Raj Mehta', email: 'raj@email.com', phone: '+91 9432109876', pets: 1, joined: '22 May 2025', status: 'Active', avatar: 'RM', spent: '₹5,300', city: 'Chennai' },
];

export const mockPets = [
  { id: 1, name: 'Bruno', owner: 'Rohan Sharma', breed: 'Golden Retriever', age: '2 Years', gender: 'Male', weight: '28 kg', status: 'Healthy', emoji: '🐕', lastCheckup: '10 May 2025' },
  { id: 2, name: 'Luna', owner: 'Priya Singh', breed: 'Persian Cat', age: '1 Year', gender: 'Female', weight: '4 kg', status: 'Healthy', emoji: '🐈', lastCheckup: '05 May 2025' },
  { id: 3, name: 'Max', owner: 'Vikram Nair', breed: 'Labrador', age: '3 Years', gender: 'Male', weight: '32 kg', status: 'Under Treatment', emoji: '🐕', lastCheckup: '20 May 2025' },
  { id: 4, name: 'Bella', owner: 'Sneha Patel', breed: 'Beagle', age: '1.5 Years', gender: 'Female', weight: '12 kg', status: 'Healthy', emoji: '🐶', lastCheckup: '15 Apr 2025' },
  { id: 5, name: 'Tiger', owner: 'Raj Mehta', breed: 'German Shepherd', age: '4 Years', gender: 'Male', weight: '35 kg', status: 'Healthy', emoji: '🐕', lastCheckup: '02 May 2025' },
  { id: 6, name: 'Whiskers', owner: 'Anita Roy', breed: 'Siamese Cat', age: '2 Years', gender: 'Female', weight: '3.5 kg', status: 'Overdue Checkup', emoji: '🐱', lastCheckup: '10 Jan 2025' },
];

export const mockProducts = [
  { id: 1, name: 'Royal Canin Adult', category: 'Food', price: 1899, oldPrice: 3500, stock: 142, sales: 312, rating: 4.6, status: 'Active', emoji: '🥘' },
  { id: 2, name: 'Pedigree 3kg', category: 'Food', price: 799, oldPrice: null, stock: 88, sales: 186, rating: 4.3, status: 'Active', emoji: '🦴' },
  { id: 3, name: 'Pet Shampoo', category: 'Grooming', price: 299, oldPrice: 450, stock: 64, sales: 74, rating: 4.2, status: 'Active', emoji: '🧴' },
  { id: 4, name: 'Rubber Chew Toy', category: 'Toys', price: 249, oldPrice: null, stock: 0, sales: 201, rating: 4.7, status: 'Out of Stock', emoji: '🦷' },
  { id: 5, name: 'Stainless Bowl', category: 'Accessories', price: 349, oldPrice: null, stock: 37, sales: 133, rating: 4.4, status: 'Active', emoji: '🥣' },
  { id: 6, name: 'Calcium Treats', category: 'Health', price: 199, oldPrice: null, stock: 22, sales: 88, rating: 4.3, status: 'Low Stock', emoji: '🍬' },
  { id: 7, name: 'Cat Litter 5kg', category: 'Accessories', price: 599, oldPrice: 750, stock: 53, sales: 98, rating: 4.5, status: 'Active', emoji: '🧺' },
  { id: 8, name: 'Pet Nail Clipper', category: 'Grooming', price: 179, oldPrice: 250, stock: 0, sales: 55, rating: 4.1, status: 'Out of Stock', emoji: '✂️' },
];

export const mockServices = [
  { id: 1, name: 'Dog Grooming', category: 'Grooming', price: 499, provider: 'Paws & Claws', rating: 4.8, bookings: 124, status: 'Active', emoji: '✂️' },
  { id: 2, name: 'Dog Walking', category: 'Walking', price: 199, provider: 'Happy Tails', rating: 4.7, bookings: 89, status: 'Active', emoji: '🚶' },
  { id: 3, name: 'Pet Boarding', category: 'Boarding', price: 599, provider: 'Pet Stay Inn', rating: 4.6, bookings: 43, status: 'Active', emoji: '🏠' },
  { id: 4, name: 'Obedience Training', category: 'Training', price: 799, provider: 'PawFect Training', rating: 4.9, bookings: 62, status: 'Active', emoji: '🎓' },
  { id: 5, name: 'Cat Sitting', category: 'Sitting', price: 299, provider: 'Kitty Care', rating: 4.5, bookings: 37, status: 'Paused', emoji: '🛋️' },
];

export const mockBookings = [
  { id: 'BK001', user: 'Rohan Sharma', pet: 'Bruno', service: 'Dog Grooming', provider: 'Paws & Claws', date: '18 May 2025', time: '11:00 AM', amount: '₹499', status: 'Confirmed' },
  { id: 'BK002', user: 'Priya Singh', pet: 'Luna', service: 'Pet Boarding', provider: 'Pet Stay Inn', date: '20 May 2025', time: '09:00 AM', amount: '₹599', status: 'Pending' },
  { id: 'BK003', user: 'Vikram Nair', pet: 'Max', service: 'Dog Walking', provider: 'Happy Tails', date: '19 May 2025', time: '07:00 AM', amount: '₹199', status: 'Completed' },
  { id: 'BK004', user: 'Sneha Patel', pet: 'Bella', service: 'Obedience Training', provider: 'PawFect Training', date: '22 May 2025', time: '04:00 PM', amount: '₹799', status: 'Confirmed' },
  { id: 'BK005', user: 'Raj Mehta', pet: 'Tiger', service: 'Dog Grooming', provider: 'Paws & Claws', date: '23 May 2025', time: '02:00 PM', amount: '₹499', status: 'Pending' },
  { id: 'BK006', user: 'Anita Roy', pet: 'Whiskers', service: 'Cat Sitting', provider: 'Kitty Care', date: '15 May 2025', time: '10:00 AM', amount: '₹299', status: 'Cancelled' },
];

export const mockVets = [
  { id: 1, name: 'Dr. Anjali Sharma', specialty: 'General Veterinarian', exp: '8 Years', rating: 4.8, consultations: 280, status: 'Available', fee: '₹500', emoji: '👩‍⚕️', location: 'Mumbai' },
  { id: 2, name: 'Dr. Rohan Verma', specialty: 'Canine Specialist', exp: '6 Years', rating: 4.7, consultations: 192, status: 'Available', fee: '₹450', emoji: '👨‍⚕️', location: 'Delhi' },
  { id: 3, name: 'Dr. Priya Patel', specialty: 'Feline Specialist', exp: '9 Years', rating: 4.7, consultations: 155, status: 'Unavailable', fee: '₹550', emoji: '👩‍⚕️', location: 'Bangalore' },
  { id: 4, name: 'Dr. Suresh Kumar', specialty: 'Exotic Animals', exp: '12 Years', rating: 4.9, consultations: 330, status: 'Available', fee: '₹700', emoji: '👨‍⚕️', location: 'Chennai' },
];

export const mockAppointments = [
  { id: 'AP001', user: 'Rohan Sharma', pet: 'Bruno', vet: 'Dr. Anjali Sharma', date: '22 May 2025', time: '10:00 AM', type: 'Checkup', status: 'Confirmed' },
  { id: 'AP002', user: 'Vikram Nair', pet: 'Max', vet: 'Dr. Rohan Verma', date: '23 May 2025', time: '02:00 PM', type: 'Treatment', status: 'Pending' },
  { id: 'AP003', user: 'Sneha Patel', pet: 'Bella', vet: 'Dr. Priya Patel', date: '20 May 2025', time: '11:30 AM', type: 'Vaccination', status: 'Completed' },
];

export const mockPosts = [
  { id: 1, user: 'Rohan Sharma', content: 'Bruno had his first grooming session today! He looks adorable 🐕✨', likes: 48, comments: 12, status: 'Published', time: '2 hours ago', reported: false },
  { id: 2, user: 'Priya Singh', content: 'Tips for introducing a new cat to your home 🐈 — Go slow!', likes: 92, comments: 24, status: 'Published', time: '5 hours ago', reported: false },
  { id: 3, user: 'Unknown User', content: 'Spam promotional content xxxxxxx click here...', likes: 0, comments: 0, status: 'Flagged', time: '1 day ago', reported: true },
  { id: 4, user: 'Anika T.', content: 'Luna just got her vaccination done! Proud pet mom moment 💉🐾', likes: 31, comments: 8, status: 'Published', time: '1 day ago', reported: false },
  { id: 5, user: 'Vikram Nair', content: 'What\'s the best dog food for Labradors? Need recommendations!', likes: 14, comments: 19, status: 'Published', time: '2 days ago', reported: false },
];

export const revenueData = [
  { month: 'Jan', revenue: 42000, orders: 120 },
  { month: 'Feb', revenue: 58000, orders: 145 },
  { month: 'Mar', revenue: 51000, orders: 138 },
  { month: 'Apr', revenue: 67000, orders: 172 },
  { month: 'May', revenue: 89000, orders: 198 },
  { month: 'Jun', revenue: 74000, orders: 185 },
];

export const categoryData = [
  { name: 'Food', value: 38, color: '#1B8B3B' },
  { name: 'Services', value: 28, color: '#4CAF72' },
  { name: 'Grooming', value: 18, color: '#3B82F6' },
  { name: 'Accessories', value: 10, color: '#F59E0B' },
  { name: 'Health', value: 6, color: '#8B5CF6' },
];

export const recentActivity = [
  { id: 1, type: 'user', icon: '👤', title: 'New user registered', sub: 'Raj Mehta joined from Chennai', time: '5 min ago', color: '#E8F5EE' },
  { id: 2, type: 'booking', icon: '📅', title: 'New booking created', sub: 'Grooming session for Bruno - BK007', time: '12 min ago', color: '#DBEAFE' },
  { id: 3, type: 'order', icon: '🛒', title: 'Order placed', sub: 'Royal Canin 3kg × 2 by Priya Singh', time: '28 min ago', color: '#FEF3C7' },
  { id: 4, type: 'vet', icon: '🩺', title: 'Appointment booked', sub: 'Dr. Anjali Sharma - Checkup for Max', time: '1 hr ago', color: '#FCE4EC' },
  { id: 5, type: 'report', icon: '🚩', title: 'Post reported', sub: 'Spam content flagged by 3 users', time: '2 hr ago', color: '#FEE2E2' },
  { id: 6, type: 'product', icon: '📦', title: 'Low stock alert', sub: 'Calcium Treats - only 22 remaining', time: '3 hr ago', color: '#FFEDD5' },
];
