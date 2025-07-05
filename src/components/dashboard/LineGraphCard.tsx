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
import { useEffect } from 'react';
import Card from '../common/Card';

export default function LineGraphCard({
  title,
  dataset,
}: {
  title: string;
  dataset: { date: string; value: number }[];
}) {
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
    <Card className="h-[210px] w-[558px]">
      <h2 className="mb-13 font-medium">{title}</h2>
      <div className={`line-graph-${title}`}></div>
    </Card>
  );
}
