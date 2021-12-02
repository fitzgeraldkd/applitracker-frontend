export type StateContainer<RecordType> = {
  records: RecordType[],
  add: Function,
  update: Function,
  delete: Function
};

export type EventRecordType = {
  id?: number,
  title: string,
  description: string,
  date: string | Date,
  status: string,
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