import React, { FC, useEffect, useLayoutEffect, useMemo, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Chartist, {
  IChartistData,
  IChartOptions,
  IResponsiveOptionTuple,
  ILineChartOptions,
} from 'chartist';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faClock as transactionsIcon,
  faUser as addressesIcon,
} from '@fortawesome/free-solid-svg-icons';

const useStyles = makeStyles((theme) => {
  return {
    container: {},
  };
});

const Stats: FC<{}> = () => {
  const classes = useStyles();

  const volumeChartData: IChartistData = {
    labels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8', 'W9', 'W10'],
    series: [[1, 2, 4, 8, 6, -2, -1, -4, -6, -2]],
  };

  const volumeChartOptions: IChartOptions = {
    high: 10,
    low: -10,
    axisX: {
      labelInterpolationFnc: function (value: any, index: any) {
        return index % 2 === 0 ? value : null;
      },
    },
  };

  return (
    <div
      className={clsx(classes.container, 'grid grid-cols-3 gap-4 flex-grow')}
    >
      <div className='border rounded shadow-sm flex flex-col p-8'>
        <div className='font-bold mb-2 text-primary'>Daily Volume</div>
        <div>
          <ChartistGraph
            data={volumeChartData}
            options={volumeChartOptions}
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
            <div className='flex items-center'>4,000</div>
          </div>
          <div>
            <div className='font-bold mb-2 flex items-center text-primary'>
              <FontAwesomeIcon icon={addressesIcon} className='mr-1 ' />
              Addresses
            </div>
            <div className='flex items-center'>34,222</div>
          </div>
        </div>
      </div>

      <div className='border rounded shadow-sm flex flex-col p-8'>
        <div className='grid grid-cols-2'>
          <div>
            <div className='font-bold mb-2 text-primary'>Assets</div>
            <div className='flex items-center'>VITE</div>
            <div className='flex items-center'>USDV</div>
          </div>
          <div>
            <div className='font-bold mb-2 text-primary'>Chains</div>
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
      new Chartist[type](el.current, data, options, responsiveOptions);
    }
  }, [type, data, options, responsiveOptions]);

  return <div className='ct-chart' ref={el} />;
};
