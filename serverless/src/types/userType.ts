type User = {
  _id: string;
  userEmail: string;
  firstName: string;
  lastName: string;
  address: string;
  gender: Gender;
  birthday: Date;
  password: string;
  admin: boolean;
  volunteer: VolunteerType;
  hours?: number[];
  events?: User[];
};

enum Gender {
  male = "male",
  female = "female",
}

enum VolunteerType {
  true = "true",
  apply = "apply",
  false = "false",
}

export { User, Gender };
