'use client';
import { select } from 'd3';
import { useEffect, useRef } from 'react';

export default function BarGraph({ walking }: { walking: DashboardWalking }) {
  const svgRef = useRef<SVGSVGElement>(null);
  useEffect(() => {
    const dataset = walking.map((item) => item.time);
    const maxData = Math.max(...dataset);
    const width = 192;
    const height = 560;
    const barHeight = 46;
    const barSpacing = 16;

    const svg = select(svgRef.current);
    svg.selectAll('*').remove();

    svg.attr('width', width).attr('height', height);

    svg
      .selectAll('rect')
      .data(dataset)
      .enter()
      .append('rect')
      .attr('x', 0)
      .attr('y', (_, i) => i * (barHeight + barSpacing))
      .attr('width', 0)
      .attr('height', barHeight)
      .attr('fill', 'var(--color-primary-300)')
      .attr('rx', 16)
      .transition()
      .duration(1000)
      .attr('width', (d) => (d / maxData) * width);
  }, [walking]);

  return (
    <div>
      <svg ref={svgRef}></svg>
    </div>
  );
}
