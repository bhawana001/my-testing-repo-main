// Listings for the stays clone. Emojis stand in for photos. Shared with the API.
export const LISTINGS = [
  { id: "ns1", title: "Home in Noida", city: "Noida", price: 11736, rating: 4.83, reviews: 61, beds: 2, baths: 1, type: "Entire home", emoji: "🏡", fav: true },
  { id: "ns2", title: "Guest suite in Noida", city: "Noida", price: 5044, rating: 4.9, reviews: 40, beds: 1, baths: 1, type: "Guest suite", emoji: "🛏️", fav: true },
  { id: "ns3", title: "Flat in Noida", city: "Noida", price: 12000, rating: 5.0, reviews: 12, beds: 2, baths: 2, type: "Entire flat", emoji: "🏢", fav: true },
  { id: "gg1", title: "Flat in Gurugram", city: "Gurgaon", price: 7103, rating: 4.91, reviews: 55, beds: 2, baths: 2, type: "Entire flat", emoji: "🏙️", fav: true },
  { id: "gg2", title: "Apartment in Gurugram", city: "Gurgaon", price: 13202, rating: 5.0, reviews: 22, beds: 3, baths: 2, type: "Entire apartment", emoji: "🌆", fav: true },
  { id: "gg3", title: "Flat in Sector 43", city: "Gurgaon", price: 16800, rating: 4.8, reviews: 30, beds: 3, baths: 3, type: "Entire flat", emoji: "🎱", fav: true },
  { id: "dd1", title: "Flat in Dehradun", city: "Dehradun", price: 15977, rating: 5.0, reviews: 8, beds: 2, baths: 2, type: "Entire flat", emoji: "🏔️", fav: true },
  { id: "dd2", title: "Apartment in Rajpur", city: "Dehradun", price: 12090, rating: 5.0, reviews: 14, beds: 2, baths: 2, type: "Entire apartment", emoji: "🌄", fav: true },
  { id: "dd3", title: "Tiny home in Dehradun", city: "Dehradun", price: 3880, rating: 4.89, reviews: 27, beds: 1, baths: 1, type: "Tiny home", emoji: "🛖", fav: true },
  { id: "go1", title: "Home in Calangute", city: "North Goa", price: 25829, rating: 5.0, reviews: 9, beds: 3, baths: 3, type: "Entire home", emoji: "🏝️", fav: true },
  { id: "go2", title: "Villa in Assagao", city: "North Goa", price: 32000, rating: 4.97, reviews: 33, beds: 4, baths: 4, type: "Entire villa", emoji: "🏖️", fav: true },
  { id: "rk1", title: "Deluxe Room with Balcony and Bath, Lakshaman Jhula", city: "Rishikesh", price: 7860, rating: 4.87, reviews: 61, beds: 1, baths: 1, type: "Room in hostel", emoji: "🧘", fav: true, host: "Pallavi Agarwal" },
  { id: "rk2", title: "Apartment in Rishikesh", city: "Rishikesh", price: 7368, rating: 4.68, reviews: 78, beds: 2, baths: 3, type: "Entire apartment", emoji: "🏞️", fav: false },
  { id: "rk3", title: "Flat in Rishikesh", city: "Rishikesh", price: 10043, rating: 5.0, reviews: 8, beds: 2, baths: 2, type: "Entire flat", emoji: "🌊", fav: true },
];

export const ROWS = [
  { title: "Popular homes in Noida", city: "Noida" },
  { title: "Available in Gurgaon District this weekend", city: "Gurgaon" },
  { title: "Stay in Dehradun", city: "Dehradun" },
  { title: "Available next month in North Goa", city: "North Goa" },
  { title: "Homes in Rishikesh", city: "Rishikesh" },
];

export function byCity(city) {
  return LISTINGS.filter((l) => l.city === city);
}
export function getListing(id) {
  return LISTINGS.find((l) => l.id === id);
}
