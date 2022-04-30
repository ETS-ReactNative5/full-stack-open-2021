import { Box, Typography } from "@material-ui/core";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import { HospitalEntry } from "../types";

type EntryProps = {
  entry: HospitalEntry
  findDiagnose: (code: string) => string
};

const Hospital = ({ entry, findDiagnose }: EntryProps) => {
  return (
    <Box border="1px solid" borderRadius={8} mb={2}>
      <Typography variant="body1">
        {entry.date}
        <LocalHospitalIcon />
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
      {entry.discharge && (
        <Typography variant="body1">
          {`Medical discharge: ${entry.discharge.date} ${entry.discharge.criteria}`}
        </Typography>
      )}
    </Box>
  );
};

export default Hospital;