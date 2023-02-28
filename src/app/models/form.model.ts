export interface FormAllInfo {
  name: string;
  surname: string;
  team_id: number;
  position_id: number;
  phone_number: string;
  email: string;
  token: string;
  laptop_name: string;
  laptop_image: any;
  laptop_brand_id: number;
  laptop_cpu: string;
  laptop_cpu_cores: number;
  laptop_cpu_threads: number;
  laptop_ram: number;
  laptop_hard_drive_type: string;
  laptop_state: string;
  laptop_purchase_date: string;
  laptop_price: number;
}

export interface ownerInfo {
  firstName: string;
  lastName: string;
  team: number;
  position: number;
  phoneNum: string;
  email: string;
}

export interface Response {
  data: Data[];
}

export interface Data {
  laptop: {
    image: string;
    name: string;
    id: number;
  };
  user: {
    name: string;
    surname: string;
  };
}
