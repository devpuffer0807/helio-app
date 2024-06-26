import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';

import { t } from 'modules/i18n';

import { Dots } from './Dots';
import { Modal } from './Modal';
import { TxHashLink } from './TxHashLink';

interface Props {
  txHash?: string;
}

export function InProgressModal({ txHash }: Props): JSX.Element {
  return (
    <Modal
      title={
        <>
          {t('modal.in-progress.title')}
          <Dots />
        </>
      }
      spinner
    >
      <Box display="flex" flexDirection="column">
        <Typography
          variant="body2"
          align="center"
          sx={{
            alignSelf: 'center',
            mt: '24px',
            mb: '60px',
            maxWidth: 500,
          }}
        >
          {t('modal.in-progress.description')}
        </Typography>

        <List>
          {txHash && (
            <>
              <Divider />
              <ListItem secondaryAction={<TxHashLink txHash={txHash} />}>
                {t('modal.in-progress.hash')}
              </ListItem>
            </>
          )}
        </List>
      </Box>
    </Modal>
  );
}
