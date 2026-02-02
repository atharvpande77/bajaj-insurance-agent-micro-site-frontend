
import React from 'react';

export const AGENT_DETAILS = {
  name: "Rahul Verma",
  designation: "Authorized Insurance Advisor",
  agencyCode: "AG-12345",
  // Professional real person photo for a man in his 40s
  avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=128&h=128",
  largeAvatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=600&h=600",
  experience: "12+ Years",
  stats: [
    { label: "Policies Sold", value: "2,500+" },
    { label: "Total Sum Assured", value: "₹450 Cr+" },
    { label: "Claims Settled", value: "99.2%" }
  ],
  achievements: [
    { title: "Chairman's Club Member", icon: "fa-award", description: "Top 1% elite advisor tier" },
    { title: "MDRT Club Member 2025", icon: "fa-trophy", description: "Million Dollar Round Table" },
    { title: "Top Regional Performer", icon: "fa-star", description: "North India Zone 2023-24" }
  ]
};

export const PRIORITY_OPTIONS = [
  {
    id: 'retirement',
    label: 'Retirement Planning' as const,
    icon: <i className="fa-solid fa-umbrella text-3xl mb-2 text-blue-600"></i>,
    description: "Secure your lifestyle for the future."
  },
  {
    id: 'child',
    label: 'Child Education Planning' as const,
    icon: <i className="fa-solid fa-graduation-cap text-3xl mb-2 text-blue-600"></i>,
    description: "Guarantee their academic excellence."
  },
  {
    id: 'savings',
    label: 'Savings' as const,
    icon: <i className="fa-solid fa-piggy-bank text-3xl mb-2 text-blue-600"></i>,
    description: "Grow wealth with guaranteed returns."
  },
  {
    id: 'life',
    label: 'Human Life Value' as const,
    icon: <i className="fa-solid fa-heart-pulse text-3xl mb-2 text-blue-600"></i>,
    description: "Full financial protection for family."
  }
];

export const MOCK_RESPONSES: Record<string, string[]> = {
  default: [
    "That's a great question. We offer several plans tailored to that need. Would you like to know about the premiums or the benefits first?",
    "I've shared your interest with Rahul Verma. He can provide a detailed quote shortly. In the meantime, shall we look at the tax-saving components?",
    "Our plans are highly flexible. You can choose to pay monthly, quarterly, or annually. Which suits you best?"
  ],
  'Retirement Planning': [
    "Retirement planning is about maintaining your lifestyle. Our 'Pension Plus' plan offers guaranteed returns and life cover.",
    "Did you know that starting early can significantly reduce your monthly premiums for retirement?",
  ],
  'Child Education Planning': [
    "Education costs are rising by 10-12% annually. A dedicated education plan ensures your child's milestones are never compromised.",
    "The 'Young Star' plan includes a waiver of premium benefit in case of unforeseen events, ensuring the education goal is met."
  ],
  'Savings': [
    "Our savings plans provide a blend of insurance and investment. Would you like to see a growth projection?",
    "You can get up to 8% compounded annual growth with our top-rated savings instruments."
  ],
  'Human Life Value': [
    "Calculating your Human Life Value is the first step in protection. It ensures your family receives the right amount of coverage.",
    "Based on standard metrics, one should ideally have life cover equal to 10-15 times their annual income."
  ],
  'Tax Planning': [
    "Tax planning is an essential part of financial health. We can help you save up to ₹46,800* under Section 80C.",
    "Our ELSS funds offer a dual benefit of wealth creation and tax saving. Shall we explore those?"
  ]
};
