import { makeStyles } from 'tss-react/mui';

export function Dots(): JSX.Element {
  const { classes } = useStyles();

  return (
    <span className={classes.container}>
      <span>.</span>
      <span>.</span>
      <span>.</span>
    </span>
  );
}

const useStyles = makeStyles()({
  container: {
    '& > span': {
      animationName: 'blink',
      animationDuration: '1.4s',
      animationIterationCount: 'infinite',
      animationFillMode: 'both',

      '&:nth-of-type(2)': {
        animationDelay: '.2s',
      },

      '&:nth-of-type(3)': {
        animationDelay: '.4s',
      },
    },

    '@keyframes blink': {
      '0%': {
        opacity: 0,
      },
      '20%': {
        opacity: 1,
      },
      '100%': {
        opacity: 0.2,
      },
    },
  },
});
