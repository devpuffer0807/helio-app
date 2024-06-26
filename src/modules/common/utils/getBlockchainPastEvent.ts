import flatten from 'lodash/flatten';
import { Contract, EventData, Filter } from 'web3-eth-contract';

export interface IGetPastEvents {
  contract: Contract;
  eventName: string;
  startBlock: number;
  latestBlockNumber: number;
  rangeStep: number;
  filter?: Filter;
}

export async function getBlockchainPastEvents({
  contract,
  eventName,
  startBlock,
  latestBlockNumber,
  rangeStep,
  filter,
}: IGetPastEvents): Promise<EventData[]> {
  const eventsPromises: Promise<EventData[]>[] = [];

  for (let i = startBlock; i < latestBlockNumber; i += rangeStep) {
    const fromBlock = i;
    const toBlock = fromBlock + rangeStep;

    eventsPromises.push(
      contract.getPastEvents(eventName, { fromBlock, toBlock, filter }),
    );
  }

  const pastEvents = await Promise.all(eventsPromises);

  return flatten(pastEvents);
}
