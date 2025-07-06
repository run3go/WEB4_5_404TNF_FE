'use client';
import {
  curveBasis,
  extent,
  line,
  max,
  min,
  scaleLinear,
  scaleTime,
  select,
} from 'd3';
import { formatDate } from 'date-fns';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Card from '../common/Card';

export default function LineGraphCard({
  title,
  dataset,
}: {
  title: string;
  dataset: { date: string; value: number }[];
}) {
  const [flip, setFlip] = useState(true);
  useEffect(() => {
    //마진, 가로 길이, 세로 길이 설정
    const margin = { right: 50, bottom: 30 };
    const width = 558 - margin.right;
    const height = 100 - margin.bottom;

    //x축(날짜)과 y축(선형)의 범위 설정
    const x = scaleTime().range([0, width]);
    const y = scaleLinear().range([height, 0]);

    //그래프 크기 설정
    const svg = select(`.line-graph-${title}`)
      .append('svg')
      .attr('width', width)
      .attr('height', height + margin.bottom);

    //x축, y축 도메인값 정의
    const domainX = extent(dataset, (d) => new Date(d.date));
    const domainY = [
      (min(dataset, (d) => d.value) as number) - 0.2,
      (max(dataset, (d) => d.value) as number) + 0.2,
    ];
    x.domain(domainX as [Date, Date]);
    y.domain(domainY as number[]);

    const lineGenerator = line<{ date: string; value: number }>()
      .x((d) => x(new Date(d.date)))
      .y((d) => y(d.value))
      .curve(curveBasis);

    svg
      .append('path')
      .datum(dataset)
      .attr('fill', 'none')
      .attr('stroke', title === '몸무게' ? '#FCC389' : '#6EBCED')
      .attr('stroke-width', 6)
      .attr('d', lineGenerator);
  }, [title, dataset]);

  return (
    <motion.div
      className="relative h-[210px] w-[558px]"
      animate={{ rotateY: flip ? 0 : 180 }}
      transition={{ duration: 0.7 }}
      onClick={() => setFlip(!flip)}
    >
      <motion.div
        className="absolute backface-hidden"
        animate={{ rotateY: flip ? 0 : 180 }}
        transition={{ duration: 0.7 }}
      >
        {/* 앞면 */}
        <Card className="card__hover h-[210px] w-[558px]">
          <h2 className="mb-13 font-medium">{title}</h2>
          <div className={`line-graph-${title}`}></div>
        </Card>
      </motion.div>
      <motion.div
        className="absolute -scale-x-100 backface-hidden"
        initial={{ rotateY: 180 }}
        animate={{ rotateY: flip ? 180 : 0 }}
        transition={{ duration: 0.7 }}
      >
        {/* 뒷면 */}
        <Card className="card__hover h-[210px] w-[558px] overflow-hidden py-4">
          <table className="w-full">
            <thead>
              <tr className="flex w-full border-b border-[#fcc389] pb-2">
                <th className="basis-2/5 font-medium">날짜</th>
                <th className="basis-2/5 font-medium">{title}</th>
              </tr>
            </thead>
            <tbody className="scrollbar-hidden block h-[150px] overflow-y-scroll">
              {dataset.map((data, index) => (
                <tr
                  key={index}
                  className="flex w-full border-b border-[#FFECD2] py-[6px] text-center last:border-0"
                >
                  <td className="basis-2/5">
                    {formatDate(data.date, 'yyyy. M. d')}
                  </td>
                  <td className="basis-2/5">{`${data.value} ${title === '몸무게' ? 'kg' : '시간'}`}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </motion.div>
    </motion.div>
  );
}
