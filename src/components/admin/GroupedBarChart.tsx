'use client';
import { useEffect, useRef } from 'react';
import { scaleBand, scaleLinear, select } from 'd3';

export default function GroupedBarChart({
  data,
}: {
  data?: { label: string; value1: number; value2: number }[];
}) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!data || data.length === 0) {
      select(svgRef.current).selectAll('*').remove();
      return;
    }

    const maxData = data.reduce((max, d) => {
      return Math.max(max, d.value1, d.value2);
    }, 0);

    const width = 620;
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

    // 그룹별 위치
    const fx = scaleBand()
      .domain(data.map((d) => d.label))
      .rangeRound([0, width])
      .paddingInner(0.29) // 그룹간 간격(%)
      .paddingOuter(0); // 그룹 양끝 여백

    // 그룹안에서 value1, value2 위치
    const x = scaleBand()
      .domain(['value1', 'value2'])
      .rangeRound([0, fx.bandwidth()])
      .padding(0); // 막대 사이 간격

    const y = scaleLinear()
      .domain([0, maxData])
      .range([height - margin.bottom, margin.top]);

    const group = svg
      .selectAll('g.bar-group')
      .data(data)
      .enter()
      .append('g')
      .attr('class', 'bar-group')
      .attr('transform', (d) => `translate(${fx(d.label)}, 0)`);

    // 신규 가입
    group
      .append('rect')
      .attr('x', x('value1')!)
      .attr('y', y(0))
      .attr('width', x.bandwidth())
      .attr('height', 0)
      .attr('fill', 'var(--color-blue-300)')
      .attr('rx', 16)
      .on('mouseover', handleMouseOver)
      .on('mousemove', (event, d) => {
        tooltip
          .html(`신규 가입: ${d.value1}명`)
          .style('left', `${event.pageX + 15}px`)
          .style('top', `${event.pageY - 28}px`);
      })
      .on('mouseout', handleMouseOut)
      .transition()
      .duration(1000)
      .attr('y', (d) => {
        const barHeight = Math.max(2, y(0) - y(d.value1));
        return y(0) - barHeight;
      })
      .attr('height', (d) => Math.max(2, y(0) - y(d.value1)));

    // 탈퇴
    group
      .append('rect')
      .attr('x', x('value2')!)
      .attr('y', y(0))
      .attr('width', x.bandwidth())
      .attr('height', 0)
      .attr('fill', 'var(--color-red-300)')
      .attr('rx', 16)
      .on('mouseover', handleMouseOver)
      .on('mousemove', (event, d) => {
        tooltip
          .html(`탈퇴: ${d.value2}명`)
          .style('left', `${event.pageX + 15}px`)
          .style('top', `${event.pageY - 28}px`);
      })
      .on('mouseout', handleMouseOut)
      .transition()
      .duration(1000)
      .attr('y', (d) => {
        const barHeight = Math.max(2, y(0) - y(d.value2));
        return y(0) - barHeight;
      })
      .attr('height', (d) => Math.max(2, y(0) - y(d.value2)));

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
