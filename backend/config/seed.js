import bcrypt from 'bcryptjs';

export const seedUsers = [
  {
    name: 'David Reynolds (Acquisitions Director)',
    email: 'buyer@resalehub.com',
    password: 'password123',
    role: 'buyer',
    company: 'Apex Capital Partners LLC',
    phone: '+1 (303) 555-0192',
    netWorth: 2500000,
    liquidCapital: 750000,
    isVerified: true,
  },
  {
    name: 'Marcus Sterling (Franchise Principal)',
    email: 'seller@resalehub.com',
    password: 'password123',
    role: 'seller',
    company: 'Frontier Hospitality Group',
    phone: '+1 (303) 555-0144',
    netWorth: 4200000,
    liquidCapital: 1100000,
    isVerified: true,
  },
  {
    name: 'Elena Rostova (Corporate Brand VP)',
    email: 'franchisor@resalehub.com',
    password: 'password123',
    role: 'franchisor',
    company: 'Global Brands Franchise Council',
    phone: '+1 (212) 555-0188',
    netWorth: 5000000,
    liquidCapital: 2000000,
    isVerified: true,
  },
  {
    name: 'Arthur Pendelton (Senior M&A Broker)',
    email: 'consultant@resalehub.com',
    password: 'password123',
    role: 'consultant',
    company: 'Pinnacle Franchise Advisory',
    phone: '+1 (415) 555-0177',
    netWorth: 1800000,
    liquidCapital: 450000,
    isVerified: true,
  },
];

export const seedListings = [
  {
    _id: '663f10111111111111111101',
    publicTitle: 'High-Volume QSR Franchise - North Denver Metro',
    category: 'Food & Beverage',
    region: 'Denver Metro, CO',
    state: 'CO',
    askingPrice: 1450000,
    cashFlow: 385000,
    grossRevenue: 2180000,
    inventory: 35000,
    establishedYear: 2016,
    employeeCount: 16,
    status: 'active',
    teaserSummary:
      'Premier drive-thru Quick Service Restaurant located in an affluent, rapid-growth northern Denver submarket. Consistent 14% year-over-year revenue gains with a tenured management team handling daily shift operations.',
    imageUrl:
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
    highlights: [
      'High-traffic pad site with double-lane drive-thru',
      'Fully remodeled in 2023 to meet latest brand standards',
      'Over 90% customer retention with automated digital app orders',
      'General Manager and shift supervisors willing to transition',
    ],
    territory: {
      type: 'Polygon',
      coordinates: [
        [
          [-105.08, 39.85],
          [-104.98, 39.85],
          [-104.98, 39.95],
          [-105.08, 39.95],
          [-105.08, 39.85],
        ],
      ],
    },
    privateData: {
      brandName: "Jersey Mike's Subs - Westminster Flagship #14022",
      legalEntity: 'Mile High Subs Operating Co. LLC',
      exactAddress: '10440 Federal Blvd, Suite A',
      city: 'Westminster',
      zipCode: '80031',
      pnlBreakdown: {
        annualGrossRevenue: 2180000,
        costOfGoodsSold: 610000,
        grossProfit: 1570000,
        operatingExpenses: 540000,
        payroll: 420000,
        royalties: 141700, // 6.5%
        marketingFund: 43600, // 2.0%
        rentAndLease: 84000,
        ebitda: 340700,
        netDiscretionaryEarnings: 385000,
      },
      franchisorApprovalDetails: {
        franchiseFee: 45000,
        transferFee: 12500,
        minimumNetWorthRequirement: 500000,
        minimumLiquidCapitalRequirement: 175000,
        trainingDurationWeeks: 4,
        transferApprovalStages: [
          'Step 1: Background & Financial Qualification Review (Days 1-7)',
          'Step 2: Corporate Brand Discovery Interview & Culture Screen (Days 8-14)',
          'Step 3: Formal Franchisor Executive Approval Committee (Days 15-21)',
          'Step 4: Franchise Agreement Signing & Lease Assignment (Days 22-30)',
          'Step 5: 4-Week Certified Managerial Onboarding (Days 31-58)',
          'Step 6: Escrow Settlement & Store Ownership Handoff (Day 60)',
        ],
      },
      leaseDetails: {
        monthlyRent: 7000,
        squareFootage: 2200,
        expirationDate: '2031-12-31',
        renewalOptions: 'Two 5-Year Extensions Available at Market Rent',
      },
      documents: [
        {
          title: 'Audited 3-Year Profit & Loss Statements (2023-2025)',
          type: 'P&L Statement',
          fileUrl: '/mock-vdr/pl-statement-denver-qsr.pdf',
          fileSize: '3.4 MB',
        },
        {
          title: 'Federal Tax Returns Form 1120-S (Past 3 Years)',
          type: 'Tax Return',
          fileUrl: '/mock-vdr/tax-returns-2023-2025.pdf',
          fileSize: '4.8 MB',
        },
        {
          title: 'Franchisor FDD Item 19 & Resale Disclosure Package',
          type: 'Franchise Agreement',
          fileUrl: '/mock-vdr/franchise-disclosure-document.pdf',
          fileSize: '8.2 MB',
        },
        {
          title: 'Prime Commercial Real Estate Lease & Triple Net Summary',
          type: 'Lease Agreement',
          fileUrl: '/mock-vdr/lease-assignment-federal-blvd.pdf',
          fileSize: '2.1 MB',
        },
        {
          title: 'Equipment Depreciation Schedule & Fixed Asset Registry',
          type: 'Equipment Asset List',
          fileUrl: '/mock-vdr/equipment-fixed-assets.pdf',
          fileSize: '1.5 MB',
        },
      ],
    },
  },
  {
    _id: '663f10111111111111111102',
    publicTitle: 'Turnkey 24/7 Boutique Fitness Studio - North Austin',
    category: 'Fitness & Wellness',
    region: 'Austin Metro, TX',
    state: 'TX',
    askingPrice: 895000,
    cashFlow: 265000,
    grossRevenue: 840000,
    inventory: 12000,
    establishedYear: 2018,
    employeeCount: 6,
    status: 'active',
    teaserSummary:
      'High-margin, recurring monthly subscription fitness facility in a booming tech corridor. Boasts 1,150 active recurring members with automated biometric keycard access and minimal staff overhead.',
    imageUrl:
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80',
    highlights: [
      '1,150+ monthly auto-renewing memberships producing steady ARR',
      'Cutting-edge Matrix strength & cardio equipment fully unencumbered',
      'Low owner involvement: run semi-absentee with 2 full-time staff',
      'Protected 5-mile exclusive franchise territory agreement',
    ],
    territory: {
      type: 'Polygon',
      coordinates: [
        [
          [-97.74, 30.38],
          [-97.64, 30.38],
          [-97.64, 30.48],
          [-97.74, 30.48],
          [-97.74, 30.38],
        ],
      ],
    },
    privateData: {
      brandName: 'Anytime Fitness - Tech Ridge Center',
      legalEntity: 'Lone Star Wellness Ventures LLC',
      exactAddress: '12901 N IH-35 Suite 1200',
      city: 'Austin',
      zipCode: '78753',
      pnlBreakdown: {
        annualGrossRevenue: 840000,
        costOfGoodsSold: 42000,
        grossProfit: 798000,
        operatingExpenses: 215000,
        payroll: 168000,
        royalties: 50400, // 6%
        marketingFund: 16800, // 2%
        rentAndLease: 82800,
        ebitda: 265000,
        netDiscretionaryEarnings: 265000,
      },
      franchisorApprovalDetails: {
        franchiseFee: 40000,
        transferFee: 10000,
        minimumNetWorthRequirement: 400000,
        minimumLiquidCapitalRequirement: 120000,
        trainingDurationWeeks: 3,
        transferApprovalStages: [
          'Step 1: Financial & Background Verification',
          'Step 2: Franchisor Discovery Call with Brand Development VP',
          'Step 3: Transfer Approval Committee Review',
          'Step 4: Franchise Agreement & Territory License Signing',
          'Step 5: Corporate Fitness Operator Training Academy',
          'Step 6: Member Database & Billing System Migration',
        ],
      },
      leaseDetails: {
        monthlyRent: 6900,
        squareFootage: 4800,
        expirationDate: '2030-08-31',
        renewalOptions: 'One 5-Year Option at fixed 2.5% annual escalation',
      },
      documents: [
        {
          title: '3-Year Certified P&L and Monthly Recurring Revenue Report',
          type: 'P&L Statement',
          fileUrl: '/mock-vdr/pl-statement-austin-fitness.pdf',
          fileSize: '2.8 MB',
        },
        {
          title: 'Member Retention & Churn Cohort Analytics (2022-2025)',
          type: 'VDR Dossier',
          fileUrl: '/mock-vdr/member-retention-analytics.pdf',
          fileSize: '3.1 MB',
        },
        {
          title: 'Franchise Disclosure Document (FDD) & Territorial Grant',
          type: 'Franchise Agreement',
          fileUrl: '/mock-vdr/fdd-austin-territory.pdf',
          fileSize: '7.9 MB',
        },
        {
          title: 'Commercial Lease Agreement & Landlord Consent Form',
          type: 'Lease Agreement',
          fileUrl: '/mock-vdr/commercial-lease-austin.pdf',
          fileSize: '1.9 MB',
        },
      ],
    },
  },
  {
    _id: '663f10111111111111111103',
    publicTitle: 'Premier Multi-Bay Transmission & Auto Repair Center',
    category: 'Automotive Services',
    region: 'Phoenix East Valley, AZ',
    state: 'AZ',
    askingPrice: 1150000,
    cashFlow: 340000,
    grossRevenue: 1720000,
    inventory: 48000,
    establishedYear: 2014,
    employeeCount: 9,
    status: 'active',
    teaserSummary:
      'Established 8-bay automotive service shop backed by a national household automotive brand. Strong fleet maintenance recurring contracts with municipal and corporate accounts.',
    imageUrl:
      'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=1200&q=80',
    highlights: [
      '8 modern service bays, 6 hydraulic lifts, and Hunter alignment machine',
      '14 corporate fleet service contracts providing guaranteed baseline work',
      'ASE-certified lead technician and service writers with 7+ years tenure',
      'Seller willing to offer 20% seller financing for qualified buyer',
    ],
    territory: {
      type: 'Polygon',
      coordinates: [
        [
          [-111.88, 33.36],
          [-111.75, 33.36],
          [-111.75, 33.45],
          [-111.88, 33.45],
          [-111.88, 33.36],
        ],
      ],
    },
    privateData: {
      brandName: 'AAMCO Total Car Care #519 - Mesa East',
      legalEntity: 'Valley Transmission Dynamics Inc.',
      exactAddress: '725 E Baseline Rd',
      city: 'Mesa',
      zipCode: '85204',
      pnlBreakdown: {
        annualGrossRevenue: 1720000,
        costOfGoodsSold: 460000,
        grossProfit: 1260000,
        operatingExpenses: 410000,
        payroll: 380000,
        royalties: 120400, // 7%
        marketingFund: 34400, // 2%
        rentAndLease: 72000,
        ebitda: 315200,
        netDiscretionaryEarnings: 340000,
      },
      franchisorApprovalDetails: {
        franchiseFee: 42000,
        transferFee: 15000,
        minimumNetWorthRequirement: 350000,
        minimumLiquidCapitalRequirement: 110000,
        trainingDurationWeeks: 3,
        transferApprovalStages: [
          'Stage 1: Application Screening & Credit Background Check',
          'Stage 2: Regional Franchise Director Interview',
          'Stage 3: Corporate Approval & Transfer Authorization',
          'Stage 4: Fleet Contract Assignment & Lease Transfer',
          'Stage 5: 3-Week Executive Management Academy',
          'Stage 6: Final Closing & Shop Turnkey Handover',
        ],
      },
      leaseDetails: {
        monthlyRent: 6000,
        squareFootage: 5200,
        expirationDate: '2032-04-30',
        renewalOptions: 'Two 5-Year Options Remaining',
      },
      documents: [
        {
          title: '3-Year Tax Returns & Accountant Reconciled Financials',
          type: 'P&L Statement',
          fileUrl: '/mock-vdr/pl-statement-phoenix-auto.pdf',
          fileSize: '3.9 MB',
        },
        {
          title: 'Fleet Accounts Master Services Agreement (MSA) List',
          type: 'VDR Dossier',
          fileUrl: '/mock-vdr/fleet-contracts-summary.pdf',
          fileSize: '1.7 MB',
        },
        {
          title: 'Facility Lease, Environmental Clearance, & Phase I ESA',
          type: 'Lease Agreement',
          fileUrl: '/mock-vdr/environmental-phase1-report.pdf',
          fileSize: '5.2 MB',
        },
      ],
    },
  },
  {
    _id: '663f10111111111111111104',
    publicTitle: 'Essential Commercial Cleaning & Disinfection Franchise',
    category: 'Commercial & Home Services',
    region: 'Tampa Bay Area, FL',
    state: 'FL',
    askingPrice: 625000,
    cashFlow: 198000,
    grossRevenue: 780000,
    inventory: 15000,
    establishedYear: 2019,
    employeeCount: 18,
    status: 'active',
    teaserSummary:
      'High-margin, recurring B2B cleaning and facility disinfection enterprise. Highly scalable operational model with 42 long-term commercial contracts with medical clinics, law firms, and schools.',
    imageUrl:
      'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80',
    highlights: [
      '42 ongoing multi-year commercial cleaning contracts',
      'No physical retail footprint needed: low overhead home/flex warehouse base',
      'Automated time tracking & client quality inspection software in place',
      'Clean books and SBA pre-qualified financing with 15% cash down',
    ],
    territory: {
      type: 'Polygon',
      coordinates: [
        [
          [-82.55, 27.9],
          [-82.38, 27.9],
          [-82.38, 28.05],
          [-82.55, 28.05],
          [-82.55, 27.9],
        ],
      ],
    },
    privateData: {
      brandName: 'JAN-PRO Commercial Cleaning of Tampa Bay Metro',
      legalEntity: 'Suncoast Facility Care LLC',
      exactAddress: '4010 Boy Scout Blvd Suite 350',
      city: 'Tampa',
      zipCode: '33607',
      pnlBreakdown: {
        annualGrossRevenue: 780000,
        costOfGoodsSold: 95000,
        grossProfit: 685000,
        operatingExpenses: 182000,
        payroll: 220000,
        royalties: 54600, // 7%
        marketingFund: 15600, // 2%
        rentAndLease: 24000,
        ebitda: 188800,
        netDiscretionaryEarnings: 198000,
      },
      franchisorApprovalDetails: {
        franchiseFee: 32000,
        transferFee: 8500,
        minimumNetWorthRequirement: 250000,
        minimumLiquidCapitalRequirement: 80000,
        trainingDurationWeeks: 2,
        transferApprovalStages: [
          'Background & Liquidity Verification',
          'Corporate Discovery & Video Interview',
          'Regional Franchisor Transfer Authorization',
          'Master Franchise Account Assignment',
          'Online & Onsite Operational Master Training',
          'Client Transition Meetings & Contract Assignment',
        ],
      },
      leaseDetails: {
        monthlyRent: 2000,
        squareFootage: 1200,
        expirationDate: '2026-11-30',
        renewalOptions: 'Annual Flex Lease or Relocatable',
      },
      documents: [
        {
          title: 'Financial Statements & Recurring Billing Audit',
          type: 'P&L Statement',
          fileUrl: '/mock-vdr/pl-statement-tampa-cleaning.pdf',
          fileSize: '2.4 MB',
        },
        {
          title: 'Commercial Contract Terms & Schedule Summary',
          type: 'VDR Dossier',
          fileUrl: '/mock-vdr/client-contracts-schedule.pdf',
          fileSize: '3.0 MB',
        },
      ],
    },
  },
  {
    _id: '663f10111111111111111105',
    publicTitle: 'Accredited In-Home Senior Care & Companion Agency',
    category: 'Health & Medical',
    region: 'Charlotte Metro, NC',
    state: 'NC',
    askingPrice: 1850000,
    cashFlow: 520000,
    grossRevenue: 3450000,
    inventory: 5000,
    establishedYear: 2015,
    employeeCount: 32,
    status: 'active',
    teaserSummary:
      'Recession-proof, high-reputation private pay in-home care agency serving wealthy residential enclaves in south Charlotte. 94% private pay revenue model with strong hospital and rehab discharge referrals.',
    imageUrl:
      'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=1200&q=80',
    highlights: [
      'Over $520K verified annual cash flow with 94% private pay mix',
      'Exclusive franchise rights covering two high-income zip code clusters',
      'Director of Nursing (RN) and scheduling coordinator running daily dispatch',
      'State licensed with 100% compliance inspection record',
    ],
    territory: {
      type: 'Polygon',
      coordinates: [
        [
          [-80.9, 35.1],
          [-80.75, 35.1],
          [-80.75, 35.25],
          [-80.9, 35.25],
          [-80.9, 35.1],
        ],
      ],
    },
    privateData: {
      brandName: 'Visiting Angels Senior Care - South Charlotte',
      legalEntity: 'Carolina Compassion Senior Services LLC',
      exactAddress: '6135 Park S Dr Suite 510',
      city: 'Charlotte',
      zipCode: '28210',
      pnlBreakdown: {
        annualGrossRevenue: 3450000,
        costOfGoodsSold: 1800000, // Caregiver wages & payroll tax
        grossProfit: 1650000,
        operatingExpenses: 520000,
        payroll: 320000, // Administrative & nursing staff
        royalties: 172500, // 5%
        marketingFund: 69000, // 2%
        rentAndLease: 48000,
        ebitda: 490500,
        netDiscretionaryEarnings: 520000,
      },
      franchisorApprovalDetails: {
        franchiseFee: 49500,
        transferFee: 15000,
        minimumNetWorthRequirement: 600000,
        minimumLiquidCapitalRequirement: 200000,
        trainingDurationWeeks: 3,
        transferApprovalStages: [
          'Candidate Bio & Financial Review by Executive Committee',
          'Franchisor Leadership Video Assessment',
          'Territory Re-assignment Approval',
          'State Healthcare Licensure Change of Ownership Filing',
          'Comprehensive National Franchisor Director Training',
          'Staff Retention Handoff & Escrow Disbursement',
        ],
      },
      leaseDetails: {
        monthlyRent: 4000,
        squareFootage: 2100,
        expirationDate: '2028-09-30',
        renewalOptions: 'One 3-Year Option',
      },
      documents: [
        {
          title: 'Complete 3-Year P&L, Balance Sheets, and CPA Audit',
          type: 'P&L Statement',
          fileUrl: '/mock-vdr/pl-statement-charlotte-senior.pdf',
          fileSize: '4.2 MB',
        },
        {
          title: 'NC DHHS State Licensure Compliance & Inspection Record',
          type: 'VDR Dossier',
          fileUrl: '/mock-vdr/nc-dhhs-license-compliance.pdf',
          fileSize: '2.1 MB',
        },
        {
          title: 'Franchise Disclosure Document (FDD) & Transfer Agreement',
          type: 'Franchise Agreement',
          fileUrl: '/mock-vdr/visiting-angels-transfer-fdd.pdf',
          fileSize: '9.4 MB',
        },
      ],
    },
  },
];

export async function runSeed(mongooseInstance) {
  try {
    const User = mongooseInstance.models.User;
    const Listing = mongooseInstance.models.Listing;

    console.log('[Seed] Clearing existing collections...');
    await User.deleteMany({});
    await Listing.deleteMany({});

    console.log('[Seed] Inserting users...');
    const createdUsers = [];
    for (const u of seedUsers) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(u.password, salt);
      const user = await User.create({
        ...u,
        password: hashedPassword,
      });
      createdUsers.push(user);
    }
    console.log(`[Seed] ${createdUsers.length} users created successfully.`);

    console.log('[Seed] Inserting franchise listings...');
    const seller = createdUsers.find((u) => u.role === 'seller') || createdUsers[0];
    
    for (const listing of seedListings) {
      await Listing.create({
        ...listing,
        seller: seller._id,
      });
    }
    console.log(`[Seed] ${seedListings.length} franchise listings created successfully.`);
    return true;
  } catch (err) {
    console.error('[Seed] Error during seeding:', err);
    throw err;
  }
}

