import { Box, Typography } from "@material-ui/core";
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { HealthCheckEntry } from "../types";

type EntryProps = {
  entry: HealthCheckEntry
  findDiagnose: (code: string) => string
};

const HealthCheck = ({ entry, findDiagnose }: EntryProps) => {
  const getColor = (data: Number) => {
    switch (data) {
      case 0:
        return 'green';
      case 1:
        return 'yellow';
      case 2:
        return 'orange';
      case 3:
        return 'red';
      default:
        return ''
    }
  }

  return (
    <Box border="1px solid" borderRadius={8} mb={2}>
      <Typography variant="body1">
        {entry.date}
        <MedicalServicesIcon />
      </Typography>
      <Typography variant="body1">
        <i>{entry.description}</i>
      </Typography>
      <FavoriteIcon sx={{ color: getColor(entry.healthCheckRating) }} />
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
    </Box>
  );
};

export default HealthCheck;