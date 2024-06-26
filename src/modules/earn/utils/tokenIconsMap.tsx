import { ReactNode } from 'react';

import { ReactComponent as ANKRBNBIcon } from '../assets/ankr-bnb.svg';
import { ReactComponent as BNBIcon } from '../assets/bnb.svg';
import { ReactComponent as BNBXIcon } from '../assets/bnb-x.svg';
import { ReactComponent as ETHIcon } from '../assets/eth.svg';
import { ReactComponent as HAYIcon } from '../assets/hay.svg';
import { ReactComponent as HAYBNBLPIcon } from '../assets/hay-bnb-lp.svg';
import { ReactComponent as HAYBTCBLPIcon } from '../assets/hay-btcb-lp.svg';
import { ReactComponent as HAYBUSDLPIcon } from '../assets/hay-busd-lp.svg';
import { ReactComponent as HAYETHLPIcon } from '../assets/hay-eth-lp.svg';
import { ReactComponent as HAYFRAXLPIcon } from '../assets/hay-frax-lp.svg';
import { ReactComponent as HAYFRAXETHNARROWIcon } from '../assets/hay-fraxeth-narrow.svg';
import { ReactComponent as HAYLPIcon } from '../assets/hay-lp.svg';
import { ReactComponent as HAYUSDTLPIcon } from '../assets/hay-usdt-lp.svg';
import { ReactComponent as SNBNBIcon } from '../assets/sn-bnb.svg';
import { ReactComponent as SNBNBBNBLPIcon } from '../assets/snbnb-bnb-lp.svg';
import { ReactComponent as STKNBIcon } from '../assets/stk-bnb.svg';
import { ReactComponent as WBETHIcon } from '../assets/wbeth.svg';

export const TOKEN_ICONS_MAP: Record<string, ReactNode> = {
  'HAY/BUSD LP': <HAYBUSDLPIcon />,
  'HAY/FRAX LP': <HAYFRAXLPIcon />,
  'HAY/frxETH Narrow': <HAYFRAXETHNARROWIcon />,
  'HAY LP': <HAYLPIcon />,
  'Smart HAY LP': <HAYLPIcon />,
  'HAY/BUSD Stable LP': <HAYBUSDLPIcon />,
  'HAY Isolated LP': <HAYIcon />,
  HAY: <HAYIcon />,
  'HAY/USDT LP': <HAYUSDTLPIcon />,
  'HAY/BNB LP': <HAYBNBLPIcon />,
  'HAY/BTCB LP': <HAYBTCBLPIcon />,
  'HAY/ETH LP': <HAYETHLPIcon />,
  'HAY/BNB Narrow': <HAYBNBLPIcon />,
  'SnBNB/BNB LP': <SNBNBBNBLPIcon />,
  'SnBNB LP': <SNBNBIcon />,
  ankrBNB: <ANKRBNBIcon />,
  SnBNB: <SNBNBIcon />,
  stkBNB: <STKNBIcon />,
  BNBx: <BNBXIcon />,
  BNB: <BNBIcon />,
  ETH: <ETHIcon />,
  wBETH: <WBETHIcon />,
};
