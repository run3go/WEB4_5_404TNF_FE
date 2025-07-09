'use client';
import { select } from 'd3';
import { useEffect, useRef } from 'react';

export default function BarGraph() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const dataset = [100, 80, 90, 30, 20, 70, 50, 60];
    const maxData = Math.max(...dataset);
    const width = 192;
    const height = 580;
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
  }, []);

  return (
    <div className="mt-8">
      <svg ref={svgRef}></svg>
    </div>
  );
}
