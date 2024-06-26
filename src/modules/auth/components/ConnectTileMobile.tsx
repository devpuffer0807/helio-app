import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { makeStyles } from 'tss-react/mui';

import { LIGHT_COLORS } from 'modules/theme';

interface IConnectTileProps {
  title: string;
  icon: string;
  mobileDeepLink: string;
  onClick?: () => void;
}

export function ConnectTileMobile({
  title,
  icon,
  mobileDeepLink,
  onClick,
}: IConnectTileProps): JSX.Element {
  const { classes } = useStyles();

  const mobileLinkProps = {
    href: mobileDeepLink,
    rel: 'noreferrer',
    target: '_blank',
    component: 'a',
  };

  return (
    <Button
      variant="outlined"
      size="large"
      type="button"
      className={classes.button}
      {...(onClick ? { onClick } : mobileLinkProps)}
    >
      <img src={icon} alt="" />

      <Typography variant="h6" marginLeft="10px">
        {title}
      </Typography>
    </Button>
  );
}

const useStyles = makeStyles()(theme => ({
  button: {
    '&&': {
      justifyContent: 'flex-start',
      height: 70,
      width: '100%',
      minHeight: 70,
      borderRadius: 32,
      padding: '0 28px 0 22px',

      '& > img': {
        width: 42,
      },

      '&:not(:last-child)': {
        marginBottom: 16,
      },

      '&:hover': {
        color: LIGHT_COLORS.black,
        backgroundColor: theme.colors.primary,
        border: `1px solid ${theme.colors.primary}`,
      },
    },
  },
}));
