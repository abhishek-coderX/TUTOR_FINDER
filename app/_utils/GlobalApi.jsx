const axios = require('axios');

const API_KEY = process.env.NEXT_PUBLIC_STRAPI_API_KEY;

console.log('API Key:', API_KEY); // Debugging line

const axiosClient = axios.create({
  baseURL: 'http://localhost:1337/api',
  headers: {
    'Authorization': `Bearer ${API_KEY}`,
  },
});

const getCategory = () => axiosClient.get('categories?populate=*');
const getTutorList = () => axiosClient.get('tutors?populate=*');
const getSuggestedTutors = () => axiosClient.get('tutors?populate=*');
const getTutorByCategory = (category) => axiosClient.get(`/tutors?filters[categories][name][$in]=${category}&populate=*`);
const getTutorById = (id) => axiosClient.get(`/tutors/${id}?populate=*`);

const booking = async (data) => {
  console.log('Booking data:', data); // Log the booking data
  try {
    const response = await axiosClient.post('/bookings', data);
    return response.data; // Return response data
  } catch (error) {
    console.error('Error during booking:', error.response || error.message); // Log error details
    throw error; // Re-throw for further handling
  }
};

module.exports = {
  getCategory,
  getTutorList,
  getTutorByCategory,
  getTutorById,
  getSuggestedTutors,
  booking,
};
