export interface Iuser {
  userName: string;
  userId: string;
  userRole: string;
  profileImage: string;
  profileDescription: string;
  skills: string[];
  experienceYears: string;
  isActive: boolean;
  address: {
    current: {
      city: string;
      state: string;
      country: string;
      zipCode: string;
    };
    permanent: {
      city: string;
      state: string;
      country: string;
      zipCode: string;
    };
  };
  isAddSame: boolean;
}
