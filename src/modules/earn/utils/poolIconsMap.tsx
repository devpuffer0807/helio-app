import React, { ReactNode } from 'react';

import { ReactComponent as EllipsisFinanceIcon } from '../assets/ellipsis-finance.svg';
import { ReactComponent as HelioIcon } from '../assets/helio.svg';
import { ReactComponent as KinzaIcon } from '../assets/kinza.svg';
import { ReactComponent as MagpieIcon } from '../assets/magpie.svg';
import { ReactComponent as PancakeSwapIcon } from '../assets/pancake-swap.svg';
import { ReactComponent as PlanetFinanceIcon } from '../assets/planet-finance.svg';
import { ReactComponent as QuollIcon } from '../assets/quoll.svg';
import ThenaIcon from '../assets/thena.png';
import { ReactComponent as UniswapIcon } from '../assets/uniswap.svg';
import { ReactComponent as VenusIcon } from '../assets/venus.svg';
import { ReactComponent as WombatIcon } from '../assets/wombat-exchange.svg';
import { ReactComponent as WombexIcon } from '../assets/wombex.svg';

export const POOL_ICONS_MAP: Record<string, ReactNode> = {
  EllipsisFinance: <EllipsisFinanceIcon />,
  PancakeSwap: <PancakeSwapIcon />,
  Wombat: <WombatIcon />,
  Wombex: <WombexIcon />,
  Magpie: <MagpieIcon />,
  Thena: <img src={ThenaIcon} alt="" />,
  Quoll: <QuollIcon />,
  Uniswap: <UniswapIcon />,
  Venus: <VenusIcon />,
  Kinza: <KinzaIcon />,
  'Planet Finance': <PlanetFinanceIcon />,
  HELIO: <HelioIcon />,
};
