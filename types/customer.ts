export interface Customer {
  login: {
    uuid: string;
  };
  name: {
    first: string;
    last: string;
  };
  email: string;
  phone: string;
  location: {
    city: string;
    country: string;
  };
  picture: {
    thumbnail: string;
  };
}

export interface CustomerWithStatus extends Customer {
  status: "Active" | "Pending";
}