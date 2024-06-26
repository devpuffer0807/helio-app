import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import BigNumber from 'bignumber.js';

import { Tooltip, truncateNumber, ZERO } from 'modules/common';
import { ReactComponent as MainTokenIcon } from 'modules/core/assets/mainToken.svg';
import { useTranslation } from 'modules/i18n';

import background from '../../assets/background.png';
import { translation } from './translation';

interface Props {
  executed: boolean;
  reward: BigNumber | null;
  onSubmit(claimValue: BigNumber): void;
}

const MIN_CLAIMABLE_AMOUNT = 0.00001;

export function Reward({ executed, reward, onSubmit }: Props): JSX.Element {
  const { t, keys } = useTranslation(translation);
  const currentReward = reward ?? ZERO;
  const isRewardEqualZero = currentReward.isGreaterThan(MIN_CLAIMABLE_AMOUNT);
  const formattedReward = isRewardEqualZero
    ? truncateNumber(currentReward, 5)
    : ZERO.toFormat(2);

  return (
    <Paper
      sx={theme => ({
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '32px 30px',
        background: `url("${background}") no-repeat, ${theme.colors.secondary}`,
        backgroundPosition: 'top right',
        [theme.breakpoints.down('md')]: {
          padding: '32px 28px 24px',
          backgroundSize: '300px',
          minHeight: '360px',
        },
      })}
    >
      <Box display="flex" flexDirection="column" justifyContent="space-between">
        <Box display="flex" alignItems="center">
          <Typography
            variant="body1"
            sx={theme => ({
              fontWeight: 500,
              mr: '5px',
              [theme.breakpoints.down('md')]: {
                fontSize: '15px',
              },
            })}
          >
            {t(keys.helioRewards)}
          </Typography>
          <Tooltip title={t(keys.tooltip)} />
        </Box>
      </Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        sx={theme => ({
          [theme.breakpoints.down('md')]: {
            flexDirection: 'column',
            alignItems: 'initial',
          },
        })}
      >
        <Box display="flex" alignItems="center">
          <MainTokenIcon />
          <Typography
            variant="h2"
            component="span"
            sx={() => ({
              fontWeight: 500,
              marginLeft: '6px',
              fontSize: '32px',
            })}
          >
            {formattedReward}
            <Box display="inline" sx={{ fontSize: '18px', marginLeft: '7px' }}>
              {t('units.MAIN_TOKEN')}
            </Box>
          </Typography>
        </Box>
        {isRewardEqualZero && (
          <Button
            onClick={() => onSubmit(currentReward)}
            disabled={executed}
            sx={theme => ({
              minWidth: '180px',
              [theme.breakpoints.down('md')]: {
                marginTop: '22px',
              },
            })}
          >
            {t(keys.claim)}
          </Button>
        )}
      </Box>
    </Paper>
  );
}
