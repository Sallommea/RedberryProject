export interface LaptopData {
  data: {
    user: {
      name: string;
      surname: string;
      team_id: number;
      position_id: number;
      email: string;
      phone_number: string;
    };
    laptop: {
      name: string;
      image: string;
      brand_id: number;
      cpu: {
        name: string;
        cores: number;
        threads: number;
      };
      ram: number;
      hard_drive_type: string;
      state: string;
      purchase_date?: string;
      price: number;
    };
  };
}
export interface LaptopInfo {}
