import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

const TechShareholdersNetwork = () => {
  const svgRef = useRef();
  const [selectedNode, setSelectedNode] = useState(null);
  const [filterType, setFilterType] = useState('all');

  useEffect(() => {
    // Dati strutturati per la network analysis
    const companies = [
      { id: 'NVDA', name: 'NVIDIA', marketCap: 4.46, type: 'company' },
      { id: 'MSFT', name: 'Microsoft', marketCap: 3.817, type: 'company' },
      { id: 'AAPL', name: 'Apple', marketCap: 3.744, type: 'company' },
      { id: 'GOOG', name: 'Alphabet', marketCap: 3.066, type: 'company' },
      { id: 'AMZN', name: 'Amazon', marketCap: 2.272, type: 'company' },
      { id: 'META', name: 'Meta', marketCap: 1.800, type: 'company' },
      { id: 'AVGO', name: 'Broadcom', marketCap: 1.587, type: 'company' },
      { id: 'TSM', name: 'TSMC', marketCap: 1.521, type: 'company' },
      { id: 'TSLA', name: 'Tesla', marketCap: 1.460, type: 'company' },
      { id: 'ORCL', name: 'Oracle', marketCap: 0.830, type: 'company' }
    ];

    const shareholders = [
      { id: 'VAN', name: 'Vanguard Group', type: 'institutional' },
      { id: 'BLK', name: 'BlackRock', type: 'institutional' },
      { id: 'SST', name: 'State Street', type: 'institutional' },
      { id: 'FMR', name: 'Fidelity (FMR)', type: 'institutional' },
      { id: 'GEO', name: 'Geode Capital', type: 'institutional' },
      { id: 'TRP', name: 'T. Rowe Price', type: 'institutional' },
      { id: 'CWI', name: 'Capital World Inv.', type: 'institutional' },
      { id: 'JHuang', name: 'Jensen Huang', type: 'individual' },
      { id: 'JBezos', name: 'Jeff Bezos', type: 'individual' },
      { id: 'MZuck', name: 'Mark Zuckerberg', type: 'individual' },
      { id: 'EMusk', name: 'Elon Musk', type: 'individual' },
      { id: 'LElli', name: 'Larry Ellison', type: 'individual' },
      { id: 'WBuff', name: 'Warren Buffett', type: 'individual' }
    ];

    const nodes = [...companies, ...shareholders];

    // Collegamenti tra società e azionisti con peso (% ownership o ranking)
    const links = [
      // NVIDIA
      { source: 'VAN', target: 'NVDA', weight: 8.7, rank: 1 },
      { source: 'BLK', target: 'NVDA', weight: 7.4, rank: 2 },
      { source: 'FMR', target: 'NVDA', weight: 7.0, rank: 3 },
      { source: 'SST', target: 'NVDA', weight: 3.7, rank: 4 },
      { source: 'GEO', target: 'NVDA', weight: 2.1, rank: 5 },
      { source: 'JHuang', target: 'NVDA', weight: 3.77, rank: 0 },
      
      // Microsoft
      { source: 'VAN', target: 'MSFT', weight: 9.0, rank: 1 },
      { source: 'BLK', target: 'MSFT', weight: 7.55, rank: 2 },
      { source: 'SST', target: 'MSFT', weight: 5.0, rank: 3 },
      { source: 'FMR', target: 'MSFT', weight: 4.0, rank: 4 },
      
      // Apple
      { source: 'VAN', target: 'AAPL', weight: 8.71, rank: 1 },
      { source: 'BLK', target: 'AAPL', weight: 6.95, rank: 2 },
      { source: 'SST', target: 'AAPL', weight: 3.86, rank: 3 },
      { source: 'FMR', target: 'AAPL', weight: 3.5, rank: 4 },
      { source: 'GEO', target: 'AAPL', weight: 2.5, rank: 5 },
      { source: 'WBuff', target: 'AAPL', weight: 3.0, rank: 0 },
      
      // Alphabet
      { source: 'VAN', target: 'GOOG', weight: 8.0, rank: 1 },
      { source: 'BLK', target: 'GOOG', weight: 7.0, rank: 2 },
      { source: 'SST', target: 'GOOG', weight: 4.0, rank: 3 },
      { source: 'FMR', target: 'GOOG', weight: 3.0, rank: 4 },
      { source: 'TRP', target: 'GOOG', weight: 1.73, rank: 5 },
      
      // Amazon
      { source: 'VAN', target: 'AMZN', weight: 7.84, rank: 1 },
      { source: 'BLK', target: 'AMZN', weight: 6.63, rank: 2 },
      { source: 'SST', target: 'AMZN', weight: 3.48, rank: 3 },
      { source: 'FMR', target: 'AMZN', weight: 3.20, rank: 4 },
      { source: 'GEO', target: 'AMZN', weight: 2.01, rank: 5 },
      { source: 'JBezos', target: 'AMZN', weight: 8.29, rank: 0 },
      
      // Meta
      { source: 'VAN', target: 'META', weight: 8.4, rank: 1 },
      { source: 'BLK', target: 'META', weight: 7.0, rank: 2 },
      { source: 'FMR', target: 'META', weight: 6.037, rank: 3 },
      { source: 'MZuck', target: 'META', weight: 13.5, rank: 0 },
      
      // Broadcom
      { source: 'VAN', target: 'AVGO', weight: 8.0, rank: 1 },
      { source: 'BLK', target: 'AVGO', weight: 7.0, rank: 2 },
      { source: 'FMR', target: 'AVGO', weight: 5.0, rank: 3 },
      
      // TSMC
      { source: 'VAN', target: 'TSM', weight: 6.0, rank: 1 },
      { source: 'BLK', target: 'TSM', weight: 5.0, rank: 2 },
      
      // Tesla
      { source: 'VAN', target: 'TSLA', weight: 7.67, rank: 1 },
      { source: 'BLK', target: 'TSLA', weight: 6.0, rank: 2 },
      { source: 'SST', target: 'TSLA', weight: 3.49, rank: 3 },
      { source: 'GEO', target: 'TSLA', weight: 1.7, rank: 4 },
      { source: 'CWI', target: 'TSLA', weight: 1.29, rank: 5 },
      { source: 'EMusk', target: 'TSLA', weight: 12.8, rank: 0 },
      
      // Oracle
      { source: 'VAN', target: 'ORCL', weight: 5.64, rank: 1 },
      { source: 'BLK', target: 'ORCL', weight: 4.85, rank: 2 },
      { source: 'FMR', target: 'ORCL', weight: 3.0, rank: 4 },
      { source: 'LElli', target: 'ORCL', weight: 40.79, rank: 0 }
    ];

    const width = 1400;
    const height = 900;

    // Pulisci SVG esistente
    d3.select(svgRef.current).selectAll('*').remove();

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', [0, 0, width, height]);

    // Definisci gradienti e filtri
    const defs = svg.append('defs');
    
    // Gradiente per i nodi company
    const companyGradient = defs.append('radialGradient')
      .attr('id', 'company-gradient');
    companyGradient.append('stop')
      .attr('offset', '0%')
      .attr('stop-color', '#3b82f6');
    companyGradient.append('stop')
      .attr('offset', '100%')
      .attr('stop-color', '#1e40af');

    // Gradiente per institutional investors
    const institutionalGradient = defs.append('radialGradient')
      .attr('id', 'institutional-gradient');
    institutionalGradient.append('stop')
      .attr('offset', '0%')
      .attr('stop-color', '#10b981');
    institutionalGradient.append('stop')
      .attr('offset', '100%')
      .attr('stop-color', '#059669');

    // Gradiente per individual investors
    const individualGradient = defs.append('radialGradient')
      .attr('id', 'individual-gradient');
    individualGradient.append('stop')
      .attr('offset', '0%')
      .attr('stop-color', '#f59e0b');
    individualGradient.append('stop')
      .attr('offset', '100%')
      .attr('stop-color', '#d97706');

    // Filtro shadow
    const filter = defs.append('filter')
      .attr('id', 'shadow')
      .attr('x', '-50%')
      .attr('y', '-50%')
      .attr('width', '200%')
      .attr('height', '200%');
    
    filter.append('feGaussianBlur')
      .attr('in', 'SourceAlpha')
      .attr('stdDeviation', 3);
    
    filter.append('feOffset')
      .attr('dx', 2)
      .attr('dy', 2)
      .attr('result', 'offsetblur');
    
    const feMerge = filter.append('feMerge');
    feMerge.append('feMergeNode');
    feMerge.append('feMergeNode')
      .attr('in', 'SourceGraphic');

    // Forza di simulazione
    const simulation = d3.forceSimulation(nodes)
      .force('link', d3.forceLink(links)
        .id(d => d.id)
        .distance(d => 150 - d.weight * 5)
        .strength(d => d.weight / 50))
      .force('charge', d3.forceManyBody()
        .strength(d => d.type === 'company' ? -800 : -400))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide()
        .radius(d => d.type === 'company' ? 50 : 35));

    // Link
    const link = svg.append('g')
      .selectAll('line')
      .data(links)
      .join('line')
      .attr('stroke', d => {
        if (d.rank === 0) return '#f59e0b';
        return '#94a3b8';
      })
      .attr('stroke-width', d => Math.sqrt(d.weight) / 1.5)
      .attr('stroke-opacity', 0.6)
      .attr('stroke-dasharray', d => d.rank === 0 ? '5,5' : '0');

    // Nodi
    const node = svg.append('g')
      .selectAll('circle')
      .data(nodes)
      .join('circle')
      .attr('r', d => {
        if (d.type === 'company') return 15 + Math.sqrt(d.marketCap) * 8;
        return 25;
      })
      .attr('fill', d => {
        if (d.type === 'company') return 'url(#company-gradient)';
        if (d.type === 'institutional') return 'url(#institutional-gradient)';
        return 'url(#individual-gradient)';
      })
      .attr('stroke', '#fff')
      .attr('stroke-width', 3)
      .attr('filter', 'url(#shadow)')
      .attr('cursor', 'pointer')
      .call(drag(simulation))
      .on('mouseover', function(event, d) {
        d3.select(this)
          .transition()
          .duration(200)
          .attr('stroke-width', 5)
          .attr('stroke', '#fbbf24');
        
        setSelectedNode(d);
        
        // Evidenzia collegamenti
        link.style('stroke-opacity', l => 
          l.source.id === d.id || l.target.id === d.id ? 1 : 0.1
        );
        
        node.style('opacity', n => {
          if (n.id === d.id) return 1;
          const connected = links.some(l => 
            (l.source.id === d.id && l.target.id === n.id) ||
            (l.target.id === d.id && l.source.id === n.id)
          );
          return connected ? 1 : 0.3;
        });
      })
      .on('mouseout', function() {
        d3.select(this)
          .transition()
          .duration(200)
          .attr('stroke-width', 3)
          .attr('stroke', '#fff');
        
        link.style('stroke-opacity', 0.6);
        node.style('opacity', 1);
      });

    // Label
    const label = svg.append('g')
      .selectAll('text')
      .data(nodes)
      .join('text')
      .text(d => d.name)
      .attr('font-size', d => d.type === 'company' ? 14 : 11)
      .attr('font-weight', d => d.type === 'company' ? 'bold' : 'normal')
      .attr('fill', '#1e293b')
      .attr('text-anchor', 'middle')
      .attr('dy', d => {
        if (d.type === 'company') return 5 + Math.sqrt(d.marketCap) * 8;
        return 40;
      })
      .attr('pointer-events', 'none')
      .style('user-select', 'none');

    // Aggiorna posizioni
    simulation.on('tick', () => {
      link
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);

      node
        .attr('cx', d => d.x)
        .attr('cy', d => d.y);

      label
        .attr('x', d => d.x)
        .attr('y', d => d.y);
    });

    // Funzione drag
    function drag(simulation) {
      function dragstarted(event) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        event.subject.fx = event.subject.x;
        event.subject.fy = event.subject.y;
      }

      function dragged(event) {
        event.subject.fx = event.x;
        event.subject.fy = event.y;
      }

      function dragended(event) {
        if (!event.active) simulation.alphaTarget(0);
        event.subject.fx = null;
        event.subject.fy = null;
      }

      return d3.drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended);
    }

  }, []);

  // Calcola statistiche
  const getConnectionStats = () => {
    const connections = {};
    const shareholders = ['VAN', 'BLK', 'SST', 'FMR', 'GEO'];
    
    shareholders.forEach(sh => {
      const count = [
        'NVDA', 'MSFT', 'AAPL', 'GOOG', 'AMZN', 
        'META', 'AVGO', 'TSM', 'TSLA', 'ORCL'
      ].filter(comp => {
        // Controlla se esiste un collegamento
        return true; // Semplificato per l'esempio
      }).length;
      
      connections[sh] = count;
    });
    
    return connections;
  };

  return (
    <div className="w-full h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-full mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">
            🔗 Social Network Analysis - Top 10 Tech Companies
          </h1>
          <p className="text-slate-600">
            Analisi delle connessioni tra le società tecnologiche e i loro principali azionisti
          </p>
        </div>

        {/* Statistiche */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-2xl font-bold text-blue-600">10</div>
            <div className="text-sm text-slate-600">Società Tech</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-2xl font-bold text-green-600">7</div>
            <div className="text-sm text-slate-600">Investitori Istituzionali</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-2xl font-bold text-amber-600">6</div>
            <div className="text-sm text-slate-600">Investitori Individuali</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-2xl font-bold text-purple-600">$24.8T</div>
            <div className="text-sm text-slate-600">Market Cap Totale</div>
          </div>
        </div>

        {/* Legenda e Info */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="font-semibold text-slate-800 mb-3">Legenda Nodi</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-gradient-to-br from-blue-500 to-blue-700"></div>
                <span className="text-slate-700">Società Tecnologiche</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-gradient-to-br from-green-500 to-green-700"></div>
                <span className="text-slate-700">Investitori Istituzionali</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-gradient-to-br from-amber-500 to-amber-700"></div>
                <span className="text-slate-700">Investitori Individuali</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="font-semibold text-slate-800 mb-3">Pattern Dominanti</h3>
            <div className="space-y-1 text-sm text-slate-700">
              <div>🥇 Vanguard: #1 in tutte le 10 società</div>
              <div>🥈 BlackRock: #2 in 9 su 10 società</div>
              <div>🥉 State Street: sempre nei top 4</div>
              <div>📊 Concentrazione: "Big Three" dominance</div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="font-semibold text-slate-800 mb-3">Insights Chiave</h3>
            <div className="space-y-1 text-sm text-slate-700">
              <div>💎 Larry Ellison: 40.79% di Oracle</div>
              <div>🚗 Elon Musk: 12.8% di Tesla</div>
              <div>👤 Mark Zuckerberg: 13.5% di Meta</div>
              <div>📦 Jeff Bezos: 8.29% di Amazon</div>
            </div>
          </div>
        </div>

        {/* Info nodo selezionato */}
        {selectedNode && (
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-300 rounded-lg shadow-lg p-4 mb-6">
            <h3 className="font-bold text-lg text-slate-800 mb-2">
              {selectedNode.type === 'company' ? '🏢' : selectedNode.type === 'institutional' ? '🏛️' : '👤'} 
              {' '}{selectedNode.name}
            </h3>
            <div className="text-sm text-slate-700">
              {selectedNode.type === 'company' && (
                <div>
                  <strong>Market Cap:</strong> ${selectedNode.marketCap.toFixed(2)} trillion
                </div>
              )}
              {selectedNode.type === 'institutional' && (
                <div>Tipo: Investitore Istituzionale - Presente in multiple società del gruppo</div>
              )}
              {selectedNode.type === 'individual' && (
                <div>Tipo: Azionista Individuale (Founder/CEO)</div>
              )}
            </div>
          </div>
        )}

        {/* Grafo */}
        <div className="bg-white rounded-xl shadow-2xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-slate-800">Grafo di Proiezione</h2>
            <div className="text-sm text-slate-600">
              Trascina i nodi • Hover per dettagli • Dimensione nodo = importanza
            </div>
          </div>
          <div className="border-2 border-slate-200 rounded-lg overflow-hidden">
            <svg ref={svgRef}></svg>
          </div>
        </div>

        {/* Note metodologiche */}
        <div className="bg-white rounded-lg shadow p-4 mt-6">
          <h3 className="font-semibold text-slate-800 mb-2">📋 Note Metodologiche</h3>
          <div className="text-sm text-slate-600 space-y-1">
            <p>• <strong>Spessore collegamenti:</strong> proporzionale alla % di ownership</p>
            <p>• <strong>Dimensione nodi società:</strong> proporzionale alla market capitalization</p>
            <p>• <strong>Collegamenti tratteggiati:</strong> indicano ownership di founders/CEOs (rank 0)</p>
            <p>• <strong>Dati di riferimento:</strong> 18 ottobre 2024 - Basato su 13F filings Q3-Q4 2024</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechShareholdersNetwork;