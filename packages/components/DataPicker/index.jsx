import { DatePicker } from 'antd';
import Position from '../Position';
import './index.scss';

const { RangePicker } = DatePicker;

export default function DataPicker({ relation, updateComponentStore }) {
  const onChange = (_, dateStringList) => {
    updateComponentStore(relation, {
      startTime: dateStringList[0],
      endTime: dateStringList[1],
    });
  };

  return (
    <RangePicker
      picker="year"
      id={{
        start: 'startInput',
        end: 'endInput',
      }}
      onFocus={(_, info) => {
        console.log('Focus:', info.range);
      }}
      onBlur={(_, info) => {
        console.log('Blur:', info.range);
      }}
      onChange={onChange}
      className="dataPicker"
    />
  );
}
