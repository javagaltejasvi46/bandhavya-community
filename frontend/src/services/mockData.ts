export interface EventMedia {
  id: string;
  url: string;
  caption: string;
  aspectRatio: 'horizontal' | 'vertical' | 'square';
}

export interface EventItem {
  id: string;
  title: string;
  date: string;
  location: string;
  category: string;
  shortDescription: string;
  narrative: string;
  organizer: string;
  photos: EventMedia[];
}

export interface BlogPostItem {
  id: string;
  author: {
    name: string;
    avatar: string;
    role: string;
    handle: string;
  };
  timestamp: string;
  content: string;
  category: string;
  likes: number;
  commentsCount: number;
  isLiked?: boolean;
  isSaved?: boolean;
  eventMediaRef?: {
    eventId: string;
    mediaId: string;
    imageUrl: string;
    caption: string;
  };
  comments: {
    id: string;
    author: string;
    avatar: string;
    timestamp: string;
    text: string;
  }[];
}

export interface PhotoCloudItem {
  id: string;
  eventId: string;
  occasion: string;
  imageUrl: string;
  aspectRatio: 'horizontal' | 'vertical' | 'square';
  position: string; // e.g. 'top-center', 'left-mid', etc.
  caption: string;
}

export interface MemberItem {
  id: string;
  name: string;
  role: string;
  badge: string;
  avatar: string;
  memberSince: string;
  postsCount: number;
  eventsCount: number;
  location: string;
}

export const MOCK_EVENTS: EventItem[] = [
  {
    id: 'evt-1',
    title: 'Annual Maha Sammelan & Cultural Utsav 2026',
    date: 'October 15-17, 2026',
    location: 'Bhandhavya Heritage Bhavan, Bengaluru',
    category: 'Cultural Celebration',
    shortDescription: 'Gathering of over 1,200 Brahmin family members celebrating our sacred heritage, Veda chanting, and traditional art performances.',
    narrative: 'The Annual Maha Sammelan brought together generations of families under one roof. Highlights included morning Vedic chants led by esteemed scholars, traditional Sangeeth sandhya, youth talent forums, and honoring senior elders of our community.',
    organizer: 'Bhandhavya Central Executive Committee',
    photos: [
      {
        id: 'med-101',
        url: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?auto=format&fit=crop&q=80&w=800',
        caption: 'Sacred lamp lighting ceremony by community elders',
        aspectRatio: 'horizontal',
      },
      {
        id: 'med-102',
        url: 'https://images.unsplash.com/photo-1545232979-fbf34fe37b38?auto=format&fit=crop&q=80&w=600',
        caption: 'Classical Bharatanatyam recital by youth members',
        aspectRatio: 'vertical',
      },
      {
        id: 'med-103',
        url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=600',
        caption: 'Grand traditional feast (Mahaprasadam)',
        aspectRatio: 'square',
      },
      {
        id: 'med-104',
        url: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&q=80&w=800',
        caption: 'Family congregation in the main hall',
        aspectRatio: 'horizontal',
      },
    ],
  },
  {
    id: 'evt-2',
    title: 'Veda Pathashala Support & Vidya Sambhavana',
    date: 'August 12, 2026',
    location: 'Shri Sharada Mandiram, Mysore',
    category: 'Educational Service',
    shortDescription: 'Supporting young Vedic scholars with educational scholarships, textbook distribution, and hostel facility enhancements.',
    narrative: 'As part of our commitment to preserving ancient wisdom, Bhandhavya awarded Vidya Sambhavana scholarships to 45 deserving students pursuing Vedic studies.',
    organizer: 'Education & Seva Wing',
    photos: [
      {
        id: 'med-201',
        url: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=800',
        caption: 'Scholarship distribution ceremony',
        aspectRatio: 'horizontal',
      },
      {
        id: 'med-202',
        url: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=600',
        caption: 'Young students during morning parayana',
        aspectRatio: 'square',
      },
    ],
  },
  {
    id: 'evt-3',
    title: 'Sharad Navaratri Sangeetha & Heritage Exhibition',
    date: 'November 2-5, 2026',
    location: 'Gayathri Kalyana Mantapa, Hubballi',
    category: 'Heritage & Music',
    shortDescription: 'Four days of classical Carnatic vocal concerts, heritage handicraft displays, and Rangoli competitions.',
    narrative: 'A joyful evening filled with devotional melodies and traditional arts, celebrating the divine feminine during Navaratri.',
    organizer: 'Women & Cultural Committee',
    photos: [
      {
        id: 'med-301',
        url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=800',
        caption: 'Carnatic vocal performance by renowned artists',
        aspectRatio: 'horizontal',
      },
      {
        id: 'med-302',
        url: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?auto=format&fit=crop&q=80&w=600',
        caption: 'Traditional Golu idol display',
        aspectRatio: 'vertical',
      },
    ],
  },
];

export const MOCK_POSTS: BlogPostItem[] = [
  {
    id: 'post-1',
    author: {
      name: 'Dr. R. K. Sharma',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
      role: 'Admin / Cultural Chair',
      handle: '@rksharma_admin',
    },
    timestamp: '2 hours ago',
    category: 'Announcement',
    content: 'Warm greetings to all Bhandhavya family members! We are thrilled to announce that registration for the Maha Sammelan 2026 is officially open. Swipe below to see beautiful highlights from last year’s lamp lighting ceremony!',
    likes: 48,
    commentsCount: 12,
    isLiked: true,
    eventMediaRef: {
      eventId: 'evt-1',
      mediaId: 'med-101',
      imageUrl: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?auto=format&fit=crop&q=80&w=800',
      caption: 'Sacred lamp lighting ceremony at Maha Sammelan',
    },
    comments: [
      {
        id: 'c-1',
        author: 'Ananya Shastri',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=300',
        timestamp: '1 hour ago',
        text: 'Looking forward to attending with my grandparents! Wonderful initiative.',
      },
      {
        id: 'c-2',
        author: 'Venkatesh Rao',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300',
        timestamp: '45 mins ago',
        text: 'Can we volunteer for the Mahaprasadam distribution team?',
      },
    ],
  },
  {
    id: 'post-2',
    author: {
      name: 'Bhandhavya Seva Trust',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=300',
      role: 'Admin / Official',
      handle: '@bhandhavya_official',
    },
    timestamp: 'Yesterday',
    category: 'Community Seva',
    content: 'Thanks to your generous donations, 45 young Vedic students received education sponsorships this month. Click the photo to view the full photo gallery from the Sharada Mandiram visit!',
    likes: 96,
    commentsCount: 18,
    eventMediaRef: {
      eventId: 'evt-2',
      mediaId: 'med-201',
      imageUrl: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=800',
      caption: 'Scholarship distribution ceremony at Mysore',
    },
    comments: [
      {
        id: 'c-3',
        author: 'Lakshmi Narayan',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=300',
        timestamp: 'Yesterday',
        text: 'Pavitra karya! Blessings to all the organizers.',
      },
    ],
  },
];

export const MOCK_PHOTO_CLOUD: PhotoCloudItem[] = [
  {
    id: 'cloud-1',
    eventId: 'evt-1',
    occasion: 'Maha Sammelan 2026',
    imageUrl: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?auto=format&fit=crop&q=80&w=800',
    aspectRatio: 'horizontal',
    position: 'top-center',
    caption: 'Inaugural Lamp Lighting',
  },
  {
    id: 'cloud-2',
    eventId: 'evt-1',
    occasion: 'Maha Sammelan 2026',
    imageUrl: 'https://images.unsplash.com/photo-1545232979-fbf34fe37b38?auto=format&fit=crop&q=80&w=600',
    aspectRatio: 'vertical',
    position: 'left-mid',
    caption: 'Bharatanatyam Recital',
  },
  {
    id: 'cloud-3',
    eventId: 'evt-2',
    occasion: 'Vidya Sambhavana',
    imageUrl: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=800',
    aspectRatio: 'horizontal',
    position: 'right-mid',
    caption: 'Scholarship Felicitation',
  },
  {
    id: 'cloud-4',
    eventId: 'evt-1',
    occasion: 'Maha Sammelan 2026',
    imageUrl: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=600',
    aspectRatio: 'square',
    position: 'bottom-left',
    caption: 'Mahaprasadam Seva',
  },
  {
    id: 'cloud-5',
    eventId: 'evt-3',
    occasion: 'Sharad Navaratri',
    imageUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=800',
    aspectRatio: 'horizontal',
    position: 'bottom-right',
    caption: 'Sangeetha Aradhana',
  },
];

export const MOCK_MEMBERS: MemberItem[] = [
  {
    id: 'm-1',
    name: 'Dr. R. K. Sharma',
    role: 'Admin / President',
    badge: 'Trustee',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
    memberSince: 'Jan 2020',
    postsCount: 24,
    eventsCount: 14,
    location: 'Bengaluru, Karnataka',
  },
  {
    id: 'm-2',
    name: 'Smt. Ananya Shastri',
    role: 'Member / Cultural Secretary',
    badge: 'Patron Member',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=300',
    memberSince: 'Mar 2021',
    postsCount: 8,
    eventsCount: 9,
    location: 'Mysore, Karnataka',
  },
  {
    id: 'm-3',
    name: 'Shri Venkatesh Rao',
    role: 'Member / Seva Coordinator',
    badge: 'Active Volunteer',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300',
    memberSince: 'Jun 2022',
    postsCount: 15,
    eventsCount: 11,
    location: 'Hubballi, Karnataka',
  },
  {
    id: 'm-4',
    name: 'Smt. Lakshmi Narayan',
    role: 'Member',
    badge: 'Life Member',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=300',
    memberSince: 'Nov 2023',
    postsCount: 3,
    eventsCount: 5,
    location: 'Mangaluru, Karnataka',
  },
];
