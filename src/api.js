const SO_API_URL = 'https://api.stackexchange.com/2.3/questions?order=desc&sort=activity&site=stackoverflow';

const CAMPUS_MOCK_POSTS = [
  {
    question_id: 'campus-1',
    title: "Anyone else struggling with the Data Structures midterm?",
    tags: ["DS", "Algorithms", "Midterms"],
    owner: {
      display_name: "Rahul S. (CS 2026)",
      profile_image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul"
    },
    is_answered: true,
    score: 45,
    view_count: 1200,
    answer_count: 12,
    creation_date: Math.floor(Date.now() / 1000) - 3600,
    is_campus: true
  },
  {
    question_id: 'campus-2',
    title: "Best place on campus for late-night coding sessions?",
    tags: ["CampusLife", "Coding", "StudySpots"],
    owner: {
      display_name: "Priya K. (IT 2025)",
      profile_image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya"
    },
    is_answered: false,
    score: 89,
    view_count: 500,
    answer_count: 24,
    creation_date: Math.floor(Date.now() / 1000) - 7200,
    is_campus: true
  },
  {
    question_id: 'campus-3',
    title: "[Hackathon] Looking for a React developer for our team!",
    tags: ["Hackathon2026", "React", "TeamUp"],
    owner: {
      display_name: "Admin @ DevClub",
      profile_image: "https://api.dicebear.com/7.x/avataaars/svg?seed=DevClub"
    },
    is_answered: false,
    score: 156,
    view_count: 2300,
    answer_count: 5,
    creation_date: Math.floor(Date.now() / 1000) - 10800,
    is_campus: true
  }
];

export const fetchPosts = async () => {
  try {
    const response = await fetch(SO_API_URL);
    if (!response.ok) throw new Error('Failed to fetch from StackOverflow');
    const data = await response.json();
    
    const soPosts = data.items.map(item => ({
      ...item,
      is_campus: false
    }));

    return [...CAMPUS_MOCK_POSTS, ...soPosts].sort((a, b) => b.creation_date - a.creation_date);
  } catch (error) {
    console.error("API Error:", error);
    return CAMPUS_MOCK_POSTS; 
  }
};
