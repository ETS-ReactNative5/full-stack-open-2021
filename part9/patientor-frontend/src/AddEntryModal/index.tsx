import {
  Dialog,
  DialogTitle,
  DialogContent,
  Divider,
  FormControl,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import AddHealthCheckEntryForm, { EntryFormValues } from "./AddHealthCheckEntryForm";
import AddHospitalEntryForm from "./AddHospitalEntryForm";
import AddOccupationalHealthcareEntryForm from "./AddOccupationalHealthcareEntryForm";

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: EntryFormValues) => void;
  error?: string;
  selectedType: string;
  onChangeType: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const AddEntryModal = ({
  modalOpen,
  onClose,
  onSubmit,
  error,
  selectedType,
  onChangeType
}: Props) => (
  <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
    <DialogTitle>Add a new entry</DialogTitle>
    <Divider />
    <DialogContent>
      {error && <Alert severity="error">{`Error: ${error}`}</Alert>}

      <FormControl>
        <FormLabel>Type</FormLabel>
        <RadioGroup
          row
          value={selectedType}
          onChange={onChangeType}
        >
          <FormControlLabel value="HealthCheck" control={<Radio />} label="Health Check" />
          <FormControlLabel value="Hospital" control={<Radio />} label="Hospital" />
          <FormControlLabel value="OccupationalHealthcare" control={<Radio />} label="Occupational Healthcare" />
        </RadioGroup>
      </FormControl>

      {selectedType === "HealthCheck" && <AddHealthCheckEntryForm onSubmit={onSubmit} onCancel={onClose} />}
      {selectedType === "Hospital" && <AddHospitalEntryForm onSubmit={onSubmit} onCancel={onClose} />}
      {selectedType === "OccupationalHealthcare" && <AddOccupationalHealthcareEntryForm onSubmit={onSubmit} onCancel={onClose} />}
    </DialogContent>
  </Dialog>
);

export default AddEntryModal;
