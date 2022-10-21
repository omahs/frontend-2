import { Flex, Link, Icon } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';

import type { RoutedTab } from 'ui/shared/RoutedTabs/types';

import eastArrowIcon from 'icons/arrows/east.svg';
import link from 'lib/link/link';
import networkExplorers from 'lib/networks/networkExplorers';
import ExternalLink from 'ui/shared/ExternalLink';
import Page from 'ui/shared/Page/Page';
import PageTitle from 'ui/shared/Page/PageTitle';
import RoutedTabs from 'ui/shared/RoutedTabs/RoutedTabs';
import TxDetails from 'ui/tx/TxDetails';
import TxInternals from 'ui/tx/TxInternals';
import TxLogs from 'ui/tx/TxLogs';
import TxRawTrace from 'ui/tx/TxRawTrace';
// import TxState from 'ui/tx/TxState';

const TABS: Array<RoutedTab> = [
  { id: 'index', title: 'Details', component: <TxDetails/> },
  { id: 'internal', title: 'Internal txn', component: <TxInternals/> },
  { id: 'logs', title: 'Logs', component: <TxLogs/> },
  // will be implemented later, api is not ready
  // { id: 'state', title: 'State', component: <TxState/> },
  { id: 'raw_trace', title: 'Raw trace', component: <TxRawTrace/> },
];

const TransactionPageContent = () => {
  const router = useRouter();

  const explorersLinks = networkExplorers
    .filter((explorer) => explorer.paths.tx)
    .map((explorer) => {
      const url = new URL(explorer.paths.tx + '/' + router.query.id, explorer.baseUrl);
      return <ExternalLink key={ explorer.baseUrl } title={ `Open in ${ explorer.title }` } href={ url.toString() }/>;
    });

  return (
    <Page>
      { /* TODO should be shown only when navigating from txs list */ }
      <Link mb={ 6 } display="inline-flex" href={ link('txs') }>
        <Icon as={ eastArrowIcon } boxSize={ 6 } mr={ 2 } transform="rotate(180deg)"/>
        Transactions
      </Link>
      <Flex alignItems="flex-start" flexDir={{ base: 'column', lg: 'row' }}>
        <PageTitle text="Transaction details"/>
        { explorersLinks.length > 0 && (
          <Flex
            alignItems="center"
            flexWrap="wrap"
            columnGap={ 6 }
            rowGap={ 3 }
            ml={{ base: 'initial', lg: 'auto' }}
            mb={{ base: 6, lg: 'initial' }}
            py={ 2.5 }
          >
            { explorersLinks }
          </Flex>
        ) }
      </Flex>
      <RoutedTabs
        tabs={ TABS }
      />
    </Page>
  );
};

export default TransactionPageContent;
