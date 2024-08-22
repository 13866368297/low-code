import { Line } from '@ant-design/charts';

export default function LineChart({ startTime, endTime, visible = true }) {
  let data = [];

  const start = 1990;
  const end = 2100;
  for (let i = start; i < end; i++) {
    data.push({ year: String(i), value: Math.ceil(Math.random() * 10) });
  }

  if (startTime && endTime) {
    data = data.filter(
      ({ year }) =>
        Number(year) >= Number(startTime) && Number(year) <= Number(endTime)
    );
  }

  const config = {
    data,
    height: 400,
    xField: 'year',
    yField: 'value',
  };
  if (!visible) return;
  return <Line {...config} />;
}
