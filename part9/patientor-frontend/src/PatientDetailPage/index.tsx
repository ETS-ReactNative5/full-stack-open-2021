import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Button, Typography } from "@material-ui/core";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import { useParams } from "react-router-dom";
import { Patient, Entry } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue, setPatientDetail, addEntry } from "../state";
import HealthCheckEntry from "../components/HealthCheckEntry";
import HospitalEntry from "../components/HospitalEntry";
import OccupationalHealthcareEntry from "../components/OccupationalHealthcareEntry";
import AddEntryModal from "../AddEntryModal";
import { EntryFormValues } from "../AddEntryModal/AddHealthCheckEntryForm";

const PatientDetailPage = () => {
  const [{ patient, diagnoses }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const [selectedType, setSelectedType] = useState("HealthCheck");

  const handleChangeType = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedType((e.target as HTMLInputElement).value);
  };

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/patients/${id}`);

    const fetchPatientDetail = async () => {
      try {
        const { data: patientDetailFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );

        dispatch(setPatientDetail(patientDetailFromApi));
      } catch (e) {
        console.error(e);
      }
    };
    void fetchPatientDetail();
  }, [dispatch]);

  const findDiagnose = (code: string) => {    
    const key = Object.keys(diagnoses).filter(item => item === code)[0];
    return diagnoses[key].name;
  };

  const entryDetails = (entry: Entry) => {
    const assertNever = (value: never): never => {
      throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
      );
    };  

    switch (entry.type) {
      case "HealthCheck":
        return <HealthCheckEntry key={entry.id} entry={entry} findDiagnose={findDiagnose} />
      case "Hospital":
        return <HospitalEntry key={entry.id} entry={entry} findDiagnose={findDiagnose} />
      case "OccupationalHealthcare":
        return <OccupationalHealthcareEntry key={entry.id} entry={entry} findDiagnose={findDiagnose} />
      default:
        return assertNever(entry)
    }
  };

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    const values_ready = Object.assign(values, { type: selectedType });

    try {
      const { data: newEntry } = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values_ready
      );
      dispatch(addEntry(newEntry));
      closeModal();
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.error(e?.response?.data || "Unrecognized axios error");
        setError(String(e?.response?.data?.error) || "Unrecognized axios error");
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

  return (
    <div className="App">
      <Box mt={2}>
        <Typography variant="h5">
          <span>{patient?.name}</span>
          {patient?.gender === "female" ? <FemaleIcon/> : patient?.gender === "male" ? <MaleIcon /> : ""}
        </Typography>
      </Box>
      <Box mt={2}>
        <Typography variant="body1">
          {`ssn: ${patient?.ssn}`}
        </Typography>
        <Typography variant="body1">
          {`occupation: ${patient?.occupation}`}
        </Typography>
      </Box>
      <Box mt={2}>
        <Typography variant="h6">
          Entries
        </Typography>
        {patient?.entries && (
          patient?.entries.map((entry) => entryDetails(entry))
        )}
        <AddEntryModal
          modalOpen={modalOpen}
          onSubmit={submitNewEntry}
          error={error}
          onClose={closeModal}
          selectedType={selectedType}
          onChangeType={handleChangeType}
        />
        <Button variant="contained" onClick={() => openModal()}>
          Add New Entry
        </Button>
      </Box>
    </div>
  );
};

export default PatientDetailPage;
