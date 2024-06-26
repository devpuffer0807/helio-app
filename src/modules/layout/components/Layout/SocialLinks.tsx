import { makeStyles } from 'tss-react/mui';

import {
  DISCORD_LINK,
  MEDIUM_LINK,
  TELEGRAM_LINK,
  TWITTER_LINK,
} from 'modules/common';
import { rgba } from 'modules/theme';

import { ReactComponent as DiscordIcon } from './assets/discord.svg';
import { ReactComponent as MediumIcon } from './assets/medium.svg';
import { ReactComponent as TelegramIcon } from './assets/telegrm.svg';
import { ReactComponent as TwitterIcon } from './assets/twitter.svg';

export function SocialLinks(): JSX.Element {
  const { classes } = useStyles();

  return (
    <div className={classes.container}>
      <a
        href={TWITTER_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className={classes.link}
      >
        <TwitterIcon />
      </a>

      <a
        href={TELEGRAM_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className={classes.link}
      >
        <TelegramIcon />
      </a>

      <a
        href={DISCORD_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className={classes.link}
      >
        <DiscordIcon />
      </a>

      <a
        href={MEDIUM_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className={classes.link}
      >
        <MediumIcon />
      </a>
    </div>
  );
}

const useStyles = makeStyles()(theme => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: 142,
    marginBottom: '3px',
  },

  link: {
    textDecoration: 'none',
    transition: '0.3s',

    '&, &:active:visited': {
      color: rgba(theme.colors.black, 0.4),
    },

    '&:hover': {
      color: theme.colors.black,
    },
  },
}));
