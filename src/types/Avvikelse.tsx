// Använder ? för fält som kan saknas i vissa avvikelser

export type AvvikelseStatus = "rejected" | "resolved";
export type AvvikelsePriority = "low" | "medium" | "high";

export type ObjectIcon = {
  id: number;
  url: string;
  name: string;
};

export type Avvikelse = {
  id: number;
  name: string;
  status: AvvikelseStatus;
  statusName: string;
  createdAtUtc: string;
  updatedAtUtc: string;
  updatedByUser: string;
  priority: AvvikelsePriority;
  responsibleUser?: string;
  isDeleted: boolean;
  roomName: string;
  levelName: string;
  buildingName: string;
  propertyName: string;
  inspectionType: string;
  objectName: string;
  objectType: string;
  objectIcon?: ObjectIcon;
};
