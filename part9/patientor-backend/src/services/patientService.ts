import { v1 as uuid } from 'uuid';
import patients from '../../data/patients';
import { Patient, NewPatient, NewEntry } from '../types';

const getPatients = (): Patient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries,
  }));
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...patient
  }

  patients.push(newPatient);
  return newPatient;
};

const getPatientById = (id: string): Patient | undefined => {
  const patient = patients.find((p) => p.id === id);
  return patient;
};

const addEntry = (entry: NewEntry, patient: Patient): Patient => {
  const newEntry = {
    id: uuid(),
    ...entry
  }

  patient.entries.push(newEntry);
  return patient;
};

export default {
  getPatients,
  addPatient,
  getPatientById,
  addEntry
};