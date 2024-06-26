import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { getChainIcon } from 'modules/auth/utils/getChainIcon';
import { Modal } from 'modules/common';
import { useTranslation } from 'modules/i18n';
import { EEthereumNetworkId } from 'modules/provider';

import { ConnectWalletsModal } from './components/ConnectWalletsModal';
import { translation } from './translation';

interface IConnectProps {
  requiredChainId: EEthereumNetworkId;
}

export function Connect({ requiredChainId }: IConnectProps): JSX.Element {
  const [open, setOpen] = useState(false);
  const { t, keys } = useTranslation(translation);

  return (
    <Modal title={t(keys.pleaseConnect)}>
      <Box pt={3}>
        <Typography align="center" component="div">
          {t(keys.requiredNetwork)}
          <Box
            ml={1.5}
            mr={0.5}
            display="inline"
            sx={{ verticalAlign: 'middle' }}
          >
            {getChainIcon(requiredChainId)}
          </Box>
          {t(`chain.${requiredChainId}`)}
        </Typography>

        <Typography sx={{ marginBottom: 4.5 }} variant="body1" align="center" />
        <Box display="flex" justifyContent="center">
          <Button
            sx={{ maxWidth: 270 }}
            fullWidth
            onClick={() => setOpen(true)}
          >
            {t(keys.connectWallet)}
          </Button>
        </Box>
      </Box>

      <ConnectWalletsModal onClose={() => setOpen(false)} open={open} />
    </Modal>
  );
}
