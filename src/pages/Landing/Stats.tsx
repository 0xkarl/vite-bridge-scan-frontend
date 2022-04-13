import React, { FC, useLayoutEffect, useRef, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import moment from 'moment';
import Chartist, {
  IChartistData,
  IChartOptions,
  IResponsiveOptionTuple,
  ILineChartOptions,
} from 'chartist';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faRightLeft as transactionsIcon,
  faUser as addressesIcon,
  faCoins as assetsIcon,
  faLink as chainsIcon,
  faCircle as dotIcon,
} from '@fortawesome/free-solid-svg-icons';
import { formatNumber } from '@utils/big-number';
import * as request from '@utils/request';
import { poll } from '@utils/hooks';

const useStyles = makeStyles((theme) => {
  return {
    container: {},
  };
});

type IStats = {
  chart: IChartistData;
  noOfAddresses: number;
  noOfTransactions: number;
};

const VOLUME_CHART_OPTIONS: ILineChartOptions = {
  low: 0,
  showArea: true,
  showLine: true,
  showPoint: false,
  fullWidth: true,
  axisX: {
    type: Chartist.FixedScaleAxis,
    divisor: 4,
    labelInterpolationFnc: function (value: any) {
      return moment.unix(value).format('MMM D');
    },
  },
};

const Stats: FC = () => {
  const classes = useStyles();
  const [stats, setStats] = useState<IStats | null>(null);

  useEffect(() => {
    return poll(async (isMounted) => {
      const stats = await request.get('/stats');
      if (isMounted) {
        setStats(stats);
      }
      return false;
    }, 3_000);
  }, []);

  return !stats ? null : (
    <div
      className={clsx(classes.container, 'grid grid-cols-3 gap-4 flex-grow')}
    >
      <div className='border rounded shadow-sm flex flex-col pt-8 pr-8 pb-8'>
        <div className='font-bold mb-2 text-primary pl-8'>
          7-Day Volume History
        </div>
        <div>
          <ChartistGraph
            data={stats.chart}
            options={VOLUME_CHART_OPTIONS}
            type={'Line'}
          />
        </div>
      </div>

      <div className='border rounded shadow-sm flex flex-col p-8'>
        <div className='grid grid-cols-2'>
          <div>
            <div className='font-bold mb-2 flex items-center text-primary'>
              <FontAwesomeIcon icon={transactionsIcon} className='mr-1 ' />
              Transactions
            </div>
            <div className='flex items-center'>
              {formatNumber(stats.noOfTransactions, 0)}
            </div>
          </div>
          <div>
            <div className='font-bold mb-2 flex items-center text-primary'>
              <FontAwesomeIcon icon={addressesIcon} className='mr-1 ' />
              Addresses
            </div>
            <div className='flex items-center'>
              {formatNumber(stats?.noOfAddresses, 0)}
            </div>
          </div>
        </div>

        <div className='grid grid-cols-2 mt-8'>
          <div>
            <div className='font-bold mb-2 flex items-center text-primary'>
              <FontAwesomeIcon icon={assetsIcon} className='mr-1 ' /> Assets
            </div>
            <div className='flex items-center'>VITE</div>
            <div className='flex items-center'>USDV</div>
          </div>
          <div>
            <div className='font-bold mb-2 flex items-center text-primary'>
              <FontAwesomeIcon icon={chainsIcon} className='mr-1 ' /> Chains
            </div>
            <div className='flex items-center'>
              <img
                src={'/vite.svg'}
                alt={'vite'}
                width={14}
                height={14}
                className='mr-2'
              />
              VITE
            </div>
            <div className='flex items-center'>
              <img
                src={'/bsc.svg'}
                alt={'bsc'}
                width={14}
                height={14}
                className='mr-2'
              />
              BSC
            </div>
          </div>
        </div>
      </div>

      <div className='border rounded shadow-sm flex flex-col p-8'>
        <div className='font-bold mb-2 text-primary'>Bridges</div>
        <div className='flex items-center mb-1'>
          <FontAwesomeIcon icon={dotIcon} className='mr-1 text-xs text-red' />
          <a
            href='https://bridge.vite.net/'
            target='_blank'
            rel='noreferrer'
            className='hover:underline'
          >
            Mainnet
          </a>
        </div>
        <div className='flex items-center'>
          <FontAwesomeIcon icon={dotIcon} className='mr-1 text-xs text-green' />
          <a
            href='https://bridge-buidl.vite.net/'
            target='_blank'
            rel='noreferrer'
            className='hover:underline'
          >
            Testnet
          </a>
        </div>
      </div>
    </div>
  );
};

export default Stats;

const ChartistGraph: FC<{
  type: 'Line' | 'Bar' | 'Pie';
  data: IChartistData;
  options: IChartOptions;
  responsiveOptions?: IResponsiveOptionTuple<ILineChartOptions>[];
}> = ({ type, data, options, responsiveOptions }) => {
  const el = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (el.current) {
      const chart = new Chartist[type](
        el.current,
        data,
        options,
        responsiveOptions
      );
      chart.on('draw', function (data: any) {
        if (data.type === 'line') {
          data.element.attr({
            style: 'stroke: #006fe9; stroke-width: 2px;',
          });
        }
        if (data.type === 'area') {
          data.element.attr({
            style: 'fill: #006fe9;',
          });
        }
      });
    }
  }, [type, data, options, responsiveOptions]);

  return <div className='ct-chart' ref={el} />;
};
