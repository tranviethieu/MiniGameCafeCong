export interface ITaskUser {
  id: number;
  name: string;
  link: string;
  status: number; // 1: chưa hoàn thành, 2: đã hoàn thành
  timeStart: string; // "DD/MM/YYYY HH:mm:ss"
  timeEnd: string; // "DD/MM/YYYY HH:mm:ss"
}

export interface IUser {
  id: string;
  name: string;
  phone: string;
  level: number;
  location: number; //0: home, 1: nv 1, 2: nv 2, 3: nv 3, 4: nv 4, 5: nv 5
  task: ITaskUser[];
  role: string; // "admin" | "user"
  createdAt: string; // "DD/MM/YYYY HH:mm:ss"
  updatedAt: string | null; // "DD/MM/YYYY HH:mm:ss" | null
}
