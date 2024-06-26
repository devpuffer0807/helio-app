import React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { makeStyles } from 'tss-react/mui';

import { CAMPAIGN_CMC_LINK, Modal } from 'modules/common';
import { useTranslation } from 'modules/i18n';
import { FONTS } from 'modules/theme';

import { ReactComponent as ExternalLinkIcon } from '../assets/external-link.svg';
import { translation } from '../translation';

export function CampaignForm(): JSX.Element {
  const { classes } = useStyles();
  const { t, keys } = useTranslation(translation);

  return (
    <Modal>
      <div className={classes.title}>
        <Typography
          sx={{
            fontSize: 20,
            fontWeight: 500,
            fontFamily: FONTS.accent,
          }}
        >
          {t(keys.cmcTitle)}
        </Typography>
      </div>

      <Typography
        variant="body2"
        sx={{
          opacity: 0.7,
          marginBottom: '22px',
        }}
      >
        {t(keys.cmcDescription, {}, true)}
      </Typography>

      <a
        href={CAMPAIGN_CMC_LINK}
        rel="noopener noreferrer"
        target="_blank"
        className={classes.link}
      >
        <Button variant="contained" className={classes.action}>
          {t(keys.action)} <ExternalLinkIcon />
        </Button>
      </a>
    </Modal>
  );
}

const useStyles = makeStyles()(theme => ({
  title: {
    color: theme.colors.silver,
    marginBottom: '14px',
  },
  link: {
    textDecoration: 'none',
  },
  action: {
    width: '140px',
    fontFamily: FONTS.default,
    fontWeight: 500,
    '& > svg': {
      marginLeft: '6px',
    },
  },
}));
