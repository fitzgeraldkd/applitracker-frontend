export type StateContainer<RecordType> = {
  records: (RecordType & ValidRecordType)[],
  add: Function,
  update: Function,
  delete: Function
};

export type ValidRecordType = {
  id: number
};

export type CommunicationRecordType = {
  id?: number
};

export type EventRecordType = {
  id?: number,
  title: string,
  description: string,
  date: string | Date,
  job_id: number
};

export type JobRecordType = {
  id?: number,
  company: string,
  position: string,
  status: string,
  favorite: boolean,
  user_id: number
};