'use client';
import { formatMinutes } from '@/lib/utils/date';
import { pointer, select } from 'd3';
import { useEffect, useRef, useState } from 'react';

export default function BarGraph({ walking }: { walking: DashboardWalking }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isVertical, setIsVertical] = useState(true);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleResize = () => {
      setIsVertical(window.innerWidth >= 1536);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        setDimensions({ width, height });
      }
    });
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const dataset = walking.slice(0, 9);
    const maxData = Math.max(...dataset.map((d) => d.time));
    const width = dimensions.width;
    const height = dimensions.height;
    const barHeight = isVertical ? 46 : dimensions.width / 13;
    const barSpacing = isVertical ? 16 : dimensions.width / 26;

    const svg = select(svgRef.current);
    svg.selectAll('*').remove();

    svg.attr('width', width).attr('height', height);

    const rect = svg
      .selectAll('rect')
      .data(dataset)
      .enter()
      .append('rect')
      .attr('fill', 'var(--color-primary-300)')
      .attr('rx', 16);

    if (isVertical) {
      rect
        .attr('y', (_, i) => i * (barHeight + barSpacing))
        .attr('x', 0)
        .attr('height', barHeight)
        .attr('width', 0);
    } else {
      rect
        .attr('x', (_, i) => i * (barHeight + barSpacing))
        .attr('y', height)
        .attr('width', barHeight)
        .attr('height', 0);
    }

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
      .attr('x', (d, i) => (isVertical ? 0 : i * (barHeight + barSpacing)))
      .attr('y', (d, i) =>
        isVertical
          ? i * (barHeight + barSpacing)
          : height - (d.time / maxData) * height,
      )
      .attr('height', (d) =>
        isVertical ? barHeight : (d.time / maxData) * height,
      )
      .attr('width', (d) =>
        isVertical ? (d.time / maxData) * width : barHeight,
      );
  }, [walking, isVertical, dimensions]);

  return (
    <div ref={containerRef} className="relative h-[calc(100%-50px)]">
      <svg className="select-none" ref={svgRef}></svg>
      <div
        className="absolute z-10 hidden rounded-[6px] bg-[var(--color-black)] px-[10px] py-[6px] text-center text-xs text-[var(--color-background)]"
        ref={tooltipRef}
      />
    </div>
  );
}
