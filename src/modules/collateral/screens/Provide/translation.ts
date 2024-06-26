import { Locale } from 'modules/i18n';

export const translation = {
  [Locale.en]: {
    title: 'Provide Collateral',
    depositAmount: 'Deposit Amount',
    max: 'Max: {value} {unit}',
    borrowLimit: 'New Borrow Limit',
    borrowUtilization: 'Borrowing Utilization',
    approve: 'Approve',
    proceed: 'Proceed',
    caution: 'Caution:',
    cautionInfo:
      'Borrowing starts from 50 HAY. Make a bigger deposit to be able to borrow HAY',
    info: 'If you want to withdraw your BNB collateral, it will take 7-15 days. \nAlternatively, you can withdraw in liquid staking BNB for instant processing.',
    warning:
      'If you want to withdraw your BNB collateral, it will take 7-15 days. \nAlternatively, you can withdraw in liquid staking BNB for instant processing.',
    relayerFee: 'Relayer Fee',
    relayerFeeTooltip:
      'Fee for staking your BNB for liquid staking BNB tokens. It is part of the colleteralization process and requires a fee due to cross-chain transfer of assets.',
  },
};
