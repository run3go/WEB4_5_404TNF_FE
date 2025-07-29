'use client';
import { scaleBand, scaleLinear, select } from 'd3';
import { useEffect, useRef } from 'react';

export default function BarChart({
  data,
}: {
  data?: { label: string; value: number }[];
}) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!data || data.length === 0) {
      select(svgRef.current).selectAll('*').remove();
      return;
    }

    const maxData = Math.max(...data.map((d) => d.value));

    const width = 574;
    const height = 180;
    const margin = { top: 0, right: 0, bottom: 0, left: 0 };

    const svg = select(svgRef.current);
    svg.selectAll('*').remove();

    svg.attr('width', width).attr('height', height);

    // 툴팁
    const tooltip = select('body')
      .append('div')
      .attr('class', 'tooltip')
      .style('position', 'absolute')
      .style('background', '#fff')
      .style('border', '1px solid #ccc')
      .style('padding', '6px 8px')
      .style('border-radius', '4px')
      .style('box-shadow', '0 2px 6px rgba(0,0,0,0.15)')
      .style('font-size', '14px')
      .style('pointer-events', 'none')
      .style('opacity', 0);

    // 툴팁 이벤트 핸들러
    const handleMouseOver = () => {
      tooltip.transition().duration(200).style('opacity', 1);
    };

    const handleMouseOut = () => {
      tooltip.transition().duration(500).style('opacity', 0);
    };

    // 위치
    const x = scaleBand()
      .domain(data.map((d) => d.label))
      .rangeRound([0, width])
      .paddingInner(0.6) // bar간 간격(%)
      .paddingOuter(0); // bar 양끝 여백

    const y = scaleLinear()
      .domain([0, maxData])
      .range([height - margin.bottom, margin.top]);

    svg
      .selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (d) => x(d.label)!)
      .attr('y', y(0))
      .attr('width', x.bandwidth())
      .attr('height', 0)
      .attr('fill', 'var(--color-blue-300)')
      .attr('rx', 16)
      .on('mouseover', handleMouseOver)
      .on('mousemove', (event, d) => {
        tooltip
          .html(`${d.value}개`)
          .style('left', `${event.pageX + 15}px`)
          .style('top', `${event.pageY - 28}px`);
      })
      .on('mouseout', handleMouseOut)
      .transition()
      .duration(1000)
      .attr('y', (d) => {
        const barHeight = Math.max(2, y(0) - y(d.value));
        return y(0) - barHeight;
      })
      .attr('height', (d) => Math.max(2, y(0) - y(d.value)));

    return () => {
      tooltip.remove();
    };
  }, [data]);

  return (
    <div>
      <svg ref={svgRef}></svg>
    </div>
  );
}
