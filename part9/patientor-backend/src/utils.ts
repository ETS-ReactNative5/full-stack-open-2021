import {
  NewPatient,
  Gender,
  Entry,
  NewEntry,
  BaseEntry,
  HealthCheckRating,
  Discharge,
  DateInterval,
} from './types';

const isString = (str: unknown): str is string => {
  return typeof str === 'string' || str instanceof String;
};

const parseString = (string: unknown): string => {
  if(!string || !isString(string)) {
    throw new Error(`Incorrect or missing string ${string}`);
  }

  return string;
}

const isGender = (str: any): str is Gender => {
  return Object.values(Gender).includes(str);
}

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error(`Incorrect or missing gender ${gender}`);
  }

  return gender;
}

const parseEntries = (entries: any): Entry[] => {
  if (entries && !Array.isArray(entries)) {
    throw new Error(`Incorrect or missing entries ${entries}`);
  }

  return entries;
}

export const toNewPatient = (object: any): NewPatient => {
  const newPatient: NewPatient = {
    name: parseString(object.name),
    dateOfBirth: parseString(object.dateOfBirth),
    ssn: parseString(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseString(object.occupation),
    entries: parseEntries(object.entries),
  };

  return newPatient;
}

const parseDiagnosisCodes = (diagnosisCodes: any): string[] => {
  if (diagnosisCodes && !Array.isArray(diagnosisCodes)) {
    throw new Error(`Incorrect or missing disgnosis codes ${diagnosisCodes}`);
  }

  return diagnosisCodes;
}

const parseHealthCheckRating = (healthCheckRating: any): HealthCheckRating => {
  if (!healthCheckRating || !Object.values(HealthCheckRating).includes(healthCheckRating)) {
    throw new Error(`Incorrect or missing health check rating ${healthCheckRating}`);
  }

  return healthCheckRating;
}

const parseDischarge = (discharge: any): Discharge => {
  if (
    (discharge || Object.keys(discharge).length > 0) &&
    (!discharge.date || !discharge.criteria || !isString(discharge.date) || !isString(discharge.criteria))
  ) {
    throw new Error(`Incorrect or missing discharge ${discharge}`);
  }

  return discharge;
}

const parseSickLeave = (sickLeave: any): DateInterval => {
  if (
    (sickLeave || Object.keys(sickLeave).length > 0) &&
    (!sickLeave.startDate || !sickLeave.endDate || !isString(sickLeave.startDate) || !isString(sickLeave.endDate))
  ) {
    throw new Error(`Incorrect or missing sick leave ${sickLeave}`);
  }

  return sickLeave;
}

const assertNever = (value: any): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};  

export const toNewEntry = (object: any): NewEntry => {
  const newEntry: Omit<BaseEntry, "id"> = {
    description: parseString(object.description),
    date: parseString(object.date),
    specialist: parseString(object.specialist),
    diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
  }

  switch (object.type) {
    case "HealthCheck":
      return {
        ...newEntry,
        type: object.type,
        healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
      };
    case "Hospital":
      return {
        ...newEntry,
        type: object.type,
        discharge: parseDischarge(object.discharge),
      };
    case "OccupationalHealthcare":
      return {
        ...newEntry,
        type: object.type,
        employerName: parseString(object.employerName),
        sickLeave: parseSickLeave(object.sickLeave),
      };
    default:
      return assertNever(object);
  }
}

