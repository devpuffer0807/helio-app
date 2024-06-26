import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';

import { Modal, TxHashLink } from 'modules/common';
import { t } from 'modules/i18n';

interface Props {
  txHash?: string;
  onClose?(): void;
}

export function TransactionFailedModal({
  txHash,
  onClose,
}: Props): JSX.Element {
  return (
    <Modal title={t('modal.failed.title')} onClose={onClose}>
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
          {t('modal.failed.description')}
        </Typography>

        <List>
          {txHash && (
            <>
              <Divider />
              <ListItem secondaryAction={<TxHashLink txHash={txHash} />}>
                {t('modal.failed.hash')}
              </ListItem>
            </>
          )}
        </List>
      </Box>
    </Modal>
  );
}
