import { Layout } from 'modules/layout';

import { Table } from './Table';

export function Liquidation(): JSX.Element {
  return (
    <Layout>
      <ProvideContent />
    </Layout>
  );
}

function ProvideContent(): JSX.Element {
  return <Table />;
}
