'use client';
import { arc, interpolate, select } from 'd3';
import { useEffect, useRef } from 'react';

export default function DonutGraph() {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const width = 105;
    const height = 105;
    const outerRadius = height / 2;
    const innerRadius = outerRadius * 0.75;
    const tau = 2 * Math.PI;
    const percent = 0.75;

    const svg = select(svgRef.current);
    svg.selectAll('*').remove();

    const g = svg
      .append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);

    const arcGenerator = arc<d3.DefaultArcObject>()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius)
      .cornerRadius((outerRadius - innerRadius) / 2)
      .startAngle(0);

    g.append('path')
      .datum({ endAngle: tau } as d3.DefaultArcObject)
      .style('fill', 'var( --color-red-100)')
      .attr('d', arcGenerator);

    const foreground = g
      .append('path')
      .datum({ endAngle: 0 } as d3.DefaultArcObject)
      .style('fill', 'var(--color-red-300)')
      .attr('d', arcGenerator);

    foreground
      .transition()
      .duration(1000)
      .attrTween('d', (d) => {
        const interPolateAngle = interpolate(0, percent * tau);
        return (t) => {
          d.endAngle = interPolateAngle(t);
          return arcGenerator(d)!;
        };
      });
  }, []);

  return (
    <div className="relative self-center">
      <svg width={105} height={105} ref={svgRef}></svg>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-0 pr-1 text-sm tracking-tighter text-[var(--color-red)]">
        ▾ 25 %
      </div>
    </div>
  );
}
