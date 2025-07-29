'use client';
import { formatMinutes } from '@/lib/utils/date';
import { pointer, select } from 'd3';
import { useEffect, useRef } from 'react';

export default function BarGraph({ walking }: { walking: DashboardWalking }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dataset = walking;
    const maxData = Math.max(...dataset.map((d) => d.time));
    const width = 175;
    const height = 535;
    const barHeight = 46;
    const barSpacing = 16;

    const svg = select(svgRef.current);
    svg.selectAll('*').remove();

    svg.attr('width', width).attr('height', height);

    const rect = svg
      .selectAll('rect')
      .data(dataset)
      .enter()
      .append('rect')
      .attr('x', 0)
      .attr('y', (_, i) => i * (barHeight + barSpacing))
      .attr('width', 0)
      .attr('height', barHeight)
      .attr('fill', 'var(--color-primary-300)')
      .attr('rx', 16);

    rect
      .on('mousemove', (evt, d) => {
        const [mx, my] = pointer(evt);
        const tooltip = tooltipRef.current;
        if (!tooltip) return;

        tooltip.style.display = 'block';
        tooltip.style.left = `${mx + 20}px`;
        tooltip.style.top = `${my}px`;
        tooltip.style.width = `${String(d).length * 7}px`;
        tooltip.innerHTML = `
          <div className="font-bold">${d.date}</div>
          <div>${formatMinutes(d.time)}</div>
        `;
      })
      .on('mouseleave', () => {
        const tooltip = tooltipRef.current;
        if (tooltip) tooltip.style.display = 'none';
      })
      .transition()
      .duration(1000)
      .attr('width', (d) => (d.time === 0 ? 2 : (d.time / maxData) * width));
  }, [walking]);

  return (
    <div className="relative">
      <svg className="select-none" ref={svgRef}></svg>
      <div
        className="absolute z-10 hidden rounded-[6px] bg-[var(--color-black)] px-[10px] py-[6px] text-center text-xs text-[var(--color-background)]"
        ref={tooltipRef}
      />
    </div>
  );
}
