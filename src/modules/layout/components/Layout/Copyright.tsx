import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import { makeStyles } from 'tss-react/mui';

import { BUGBOUNTY_LINK, DOCS_LINK, GITHUB_LINK } from 'modules/common';
import { t } from 'modules/i18n';

export function Copyright(): JSX.Element {
  const { classes } = useStyles();

  return (
    <div>
      <Typography variant="subtitle3" className={classes.copyright}>
        {t('menu.copyright', { value: new Date().getFullYear() })}
      </Typography>

      <Box mt="4px" width="100%">
        <Typography variant="subtitle3" className={classes.linksWrapper}>
          <a
            href={DOCS_LINK}
            target="_blank"
            className={classes.link}
            rel="noreferrer"
          >
            {t('menu.links.docs')}
          </a>
          &nbsp;&nbsp;|&nbsp;&nbsp;
          <a
            href={GITHUB_LINK}
            target="_blank"
            className={classes.link}
            rel="noreferrer"
          >
            {t('menu.links.github')}
          </a>
          &nbsp;&nbsp;|&nbsp;&nbsp;
          <a
            href={BUGBOUNTY_LINK}
            target="_blank"
            className={classes.link}
            rel="noreferrer"
          >
            {t('menu.links.bugbounty')}
          </a>
        </Typography>
      </Box>
    </div>
  );
}

const useStyles = makeStyles()(theme => ({
  copyright: {
    opacity: 0.5,
    whiteSpace: 'nowrap',

    '&&': {
      fontSize: 11,
    },

    [theme.breakpoints.down('xl')]: {
      whiteSpace: 'nowrap',
      marginLeft: -12,
    },
  },

  linksWrapper: {
    width: '100%',
    opacity: 0.5,
    color: '#000000',

    '&&': {
      fontSize: 11,
    },

    [theme.breakpoints.down('xl')]: {
      whiteSpace: 'nowrap',
      marginLeft: -12,
    },
  },

  link: {
    color: 'inherit',
    textDecoration: 'none',
  },
}));
