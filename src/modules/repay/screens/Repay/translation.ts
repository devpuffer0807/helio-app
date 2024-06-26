import { Locale } from 'modules/i18n';

export const translation = {
  [Locale.en]: {
    approve: 'Approve',
    title: 'Repay HAY',
    repayAmount: 'Repay Amount',
    maxAmount: 'Wallet balance: {value}',
    invalidAmount: 'Invalid amount.',
    makeIt: 'Make it',
    or: 'or',
    repayInFull: 'repay in full.',
    total: 'Total Outstanding Loan',
    proceed: 'Proceed',
    utilization: 'Borrowing Utilization',
    dept: 'Your debt: {value} {unit}',
    caution: 'Caution',
    cautionInfo:
      'You are above a 75% borrowing usage. It is recommended that you decrease this by repaying loans or providing more collateral to lower the risk of a liquidation event',
    outstandingLoanInfo:
      'Loan cannot go under 50 HAY. Repay in full or make the remaining part 50 HAY or more',
    outstandingLoanError:
      'Invalid amount. Make it {number} HAY or repay in full.',
  },
};
