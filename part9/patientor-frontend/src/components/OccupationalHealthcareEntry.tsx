import { Box, Typography } from "@material-ui/core";
import WorkIcon from '@mui/icons-material/Work';
import { OccupationalHealthcareEntry } from "../types";

type EntryProps = {
  entry: OccupationalHealthcareEntry
  findDiagnose: (code: string) => string
};

const OccupationHealthcareEntry = ({ entry, findDiagnose }: EntryProps) => {
  return (
    <Box border="1px solid" borderRadius={8} mb={2}>
      <Typography variant="body1">
        {entry.date}
        <WorkIcon />
        <i>{entry.employerName}</i>
      </Typography>
      <Typography variant="body1">
        <i>{entry.description}</i>
      </Typography>
      {entry.diagnosisCodes && (
        <ul>
          {entry.diagnosisCodes.map((code) => (
            <li key={code}>
              <Typography variant="body1">
                {code} {findDiagnose(code)}
              </Typography>
            </li>
          ))}
        </ul>
      )}
      <Typography variant="body1">
        {`diagnose by ${entry.specialist}`}
      </Typography>
      {entry.sickLeave && (
        <Typography variant="body1">
          {`Sick leave: ${entry.sickLeave.startDate} - ${entry.sickLeave.endDate}`}
        </Typography>
      )}
    </Box>
  );
};

export default OccupationHealthcareEntry;
