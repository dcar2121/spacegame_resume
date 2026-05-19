import React, { useState, useEffect } from 'react';
import { Shield, Database, Server, Radio, Lock, Unlock, AlertTriangle, CheckCircle, Navigation, Target, Cpu } from 'lucide-react';

const SpaceResumeGame = () => {
  const [activeStation, setActiveStation] = useState('bridge');
  const [completedMissions, setCompletedMissions] = useState(new Set());
  const [dmzProgress, setDmzProgress] = useState(0);
  const [threatLevel, setThreatLevel] = useState(3);
  const [scanning, setScanning] = useState(false);
  const [missionActive, setMissionActive] = useState(null);
  const [selectedScenario, setSelectedScenario] = useState(null);

  const missions = {
    cybersecurity: {
      id: 'cybersecurity',
      name: 'Cybersecurity Protocols',
      icon: Shield,
      color: '#00ff88',
      station: 'Security Command',
      scenarios: [
        {
          id: 'firewall',
          title: 'Firewall Configuration',
          threat: 'Zero-day exploit detected',
          description: 'Configure multi-layer firewall architecture with deep packet inspection and anomaly detection. Implemented stateful inspection rules across DMZ, trusted, and untrusted zones.',
          protocols: ['IDS/IPS', 'WAF', 'Network Segmentation', 'Rate Limiting'],
          mitigation: 'Successfully blocked 10K+ malicious packets/sec'
        },
        {
          id: 'incident',
          title: 'Incident Response',
          threat: 'Advanced Persistent Threat',
          description: 'Led incident response team through APT detection and containment. Developed playbooks for threat hunting, forensics, and recovery procedures.',
          protocols: ['SIEM Analysis', 'Threat Intelligence', 'Chain of Custody', 'Root Cause Analysis'],
          mitigation: 'Reduced MTTD from 200+ days to <24 hours'
        },
        {
          id: 'compliance',
          title: 'Compliance Framework',
          threat: 'Regulatory exposure',
          description: 'Architected security controls meeting SOC 2, ISO 27001, and NIST standards. Established continuous monitoring and audit trail systems.',
          protocols: ['Access Control', 'Encryption', 'Audit Logging', 'Risk Assessment'],
          mitigation: 'Achieved 100% compliance across 300+ controls'
        }
      ]
    },
    database: {
      id: 'database',
      name: 'Database Architecture',
      icon: Database,
      color: '#00d4ff',
      station: 'Data Command',
      scenarios: [
        {
          id: 'scaling',
          title: 'Petabyte-Scale Systems',
          threat: 'Data overflow imminent',
          description: 'Designed distributed database architecture handling 10PB+ data with sub-second query performance. Implemented sharding, replication, and auto-scaling strategies.',
          protocols: ['Horizontal Sharding', 'Read Replicas', 'Caching Layers', 'Query Optimization'],
          mitigation: '99.99% uptime with 10M+ queries/day'
        },
        {
          id: 'security',
          title: 'Data Security',
          threat: 'Unauthorized access attempt',
          description: 'Implemented end-to-end encryption, field-level security, and zero-trust data access. Designed secure key management with HSM integration.',
          protocols: ['AES-256', 'TDE', 'Column Encryption', 'Key Rotation'],
          mitigation: 'Zero data breaches across 5B+ records'
        },
        {
          id: 'disaster',
          title: 'Disaster Recovery',
          threat: 'Primary datacenter failure',
          description: 'Architected multi-region backup strategy with automated failover and point-in-time recovery. Tested RTO/RPO under 15 minutes.',
          protocols: ['Cross-Region Replication', 'Automated Backups', 'Failover Testing', 'Data Validation'],
          mitigation: 'Sub-15 minute recovery time objective'
        }
      ]
    },
    datacenter: {
      id: 'datacenter',
      name: 'Datacenter Operations',
      icon: Server,
      color: '#ff3366',
      station: 'Infrastructure Command',
      scenarios: [
        {
          id: 'deployment',
          title: 'Global Deployment',
          threat: 'Capacity constraints',
          description: 'Deployed enterprise datacenter infrastructure across 12 regions. Managed rack design, power distribution, cooling systems, and network topology.',
          protocols: ['Redundant Power', 'Hot/Cold Aisle', 'DCIM', 'Capacity Planning'],
          mitigation: 'Deployed 50K+ servers with 99.999% SLA'
        },
        {
          id: 'physical',
          title: 'Physical Security',
          threat: 'Unauthorized entry detected',
          description: 'Designed layered physical security with biometric access, mantrap systems, 24/7 monitoring, and security operations center integration.',
          protocols: ['Biometric Access', 'Video Surveillance', 'Intrusion Detection', 'Asset Tracking'],
          mitigation: 'Zero physical security incidents'
        },
        {
          id: 'automation',
          title: 'Infrastructure Automation',
          threat: 'Manual process bottleneck',
          description: 'Built infrastructure-as-code pipeline with automated provisioning, configuration management, and self-healing systems.',
          protocols: ['IaC', 'Configuration Management', 'Auto-remediation', 'GitOps'],
          mitigation: '95% reduction in deployment time'
        }
      ]
    },
    network: {
      id: 'network',
      name: 'Network Engineering',
      icon: Radio,
      color: '#ffaa00',
      station: 'Network Command',
      scenarios: [
        {
          id: 'architecture',
          title: 'Network Architecture',
          threat: 'Bandwidth saturation',
          description: 'Designed multi-tier network with spine-leaf topology, SDN controllers, and traffic engineering. Implemented BGP routing with automated failover.',
          protocols: ['BGP', 'OSPF', 'MPLS', 'SDN', 'QoS'],
          mitigation: '400Gbps sustained throughput'
        },
        {
          id: 'dmz',
          title: 'DMZ Segmentation',
          threat: 'Lateral movement risk',
          description: 'Architected secure DMZ with multi-zone isolation, proxy services, and micro-segmentation. Implemented zero-trust network access controls.',
          protocols: ['Network Segmentation', 'Proxy Servers', 'NAT', 'ACLs', 'Microsegmentation'],
          mitigation: 'Isolated 500+ services across zones'
        },
        {
          id: 'monitoring',
          title: 'Network Monitoring',
          threat: 'Anomaly detection failure',
          description: 'Deployed comprehensive network monitoring with flow analysis, packet capture, and ML-based anomaly detection.',
          protocols: ['NetFlow', 'SNMP', 'Packet Analysis', 'Baseline Modeling'],
          mitigation: 'Real-time visibility across 10K+ devices'
        }
      ]
    }
  };

  useEffect(() => {
    const completed = completedMissions.size;
    const total = Object.values(missions).reduce((sum, m) => sum + m.scenarios.length, 0);
    const progress = (completed / total) * 100;
    setDmzProgress(progress);
    setThreatLevel(Math.max(1, 5 - Math.floor(progress / 20)));
  }, [completedMissions]);

  const startMission = (mission, scenario) => {
    setMissionActive(mission.id);
    setSelectedScenario(scenario);
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
    }, 2000);
  };

  const completeMission = (missionId, scenarioId) => {
    const key = `${missionId}-${scenarioId}`;
    setCompletedMissions(new Set([...completedMissions, key]));
    setMissionActive(null);
    setSelectedScenario(null);
  };

  const isCompleted = (missionId, scenarioId) => {
    return completedMissions.has(`${missionId}-${scenarioId}`);
  };

  const renderBridge = () => (
    <div className="bridge-view">
      <div className="starfield"></div>
      
      <div className="hud-overlay">
        <div className="hud-corner top-left"></div>
        <div className="hud-corner top-right"></div>
        <div className="hud-corner bottom-left"></div>
        <div className="hud-corner bottom-right"></div>
      </div>

      <div className="command-center">
        <div className="header-section">
          <div className="title-container">
            <h1 className="main-title">
              <span className="title-prefix">USS</span>
              <span className="title-main">CYBERDEFENDER</span>
            </h1>
            <div className="subtitle">Security Operations Command Interface</div>
          </div>
          
          <div className="status-grid">
            <div className="status-item">
              <div className="status-label">THREAT LEVEL</div>
              <div className="status-value" style={{ color: threatLevel > 3 ? '#ff3366' : '#00ff88' }}>
                {threatLevel}/5
              </div>
            </div>
            <div className="status-item">
              <div className="status-label">DMZ PROGRESS</div>
              <div className="status-value">{Math.round(dmzProgress)}%</div>
            </div>
            <div className="status-item">
              <div className="status-label">MISSIONS</div>
              <div className="status-value">
                {completedMissions.size}/{Object.values(missions).reduce((sum, m) => sum + m.scenarios.length, 0)}
              </div>
            </div>
          </div>
        </div>

        <div className="dmz-progress-container">
          <div className="progress-label">
            <Target size={16} />
            <span>ROUTE TO DMZ (SAFE ZONE)</span>
          </div>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${dmzProgress}%` }}>
              <div className="progress-pulse"></div>
            </div>
            <div className="progress-markers">
              {[0, 25, 50, 75, 100].map(mark => (
                <div 
                  key={mark} 
                  className={`marker ${dmzProgress >= mark ? 'active' : ''}`}
                  style={{ left: `${mark}%` }}
                >
                  {mark === 100 ? <Lock size={14} /> : <Unlock size={14} />}
                </div>
              ))}
            </div>
          </div>
          {dmzProgress === 100 && (
            <div className="dmz-achieved">
              <CheckCircle size={20} />
              DMZ SECURED - ALL SYSTEMS OPERATIONAL
            </div>
          )}
        </div>

        <div className="mission-stations">
          {Object.values(missions).map(mission => {
            const Icon = mission.icon;
            const completed = mission.scenarios.filter(s => isCompleted(mission.id, s.id)).length;
            const total = mission.scenarios.length;
            const stationComplete = completed === total;
            
            return (
              <div 
                key={mission.id}
                className={`station-card ${activeStation === mission.id ? 'active' : ''} ${stationComplete ? 'complete' : ''}`}
                onClick={() => setActiveStation(mission.id)}
                style={{ '--station-color': mission.color }}
              >
                <div className="station-icon">
                  <Icon size={32} />
                  {stationComplete && (
                    <div className="complete-badge">
                      <CheckCircle size={16} />
                    </div>
                  )}
                </div>
                <div className="station-info">
                  <div className="station-name">{mission.station}</div>
                  <div className="station-category">{mission.name}</div>
                  <div className="station-progress">
                    {completed}/{total} Scenarios Complete
                  </div>
                </div>
                <div className="station-chevron">›</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const renderStation = () => {
    const mission = missions[activeStation];
    if (!mission) return null;

    const Icon = mission.icon;

    return (
      <div className="station-view">
        <div className="starfield"></div>
        
        <div className="station-header">
          <button className="back-button" onClick={() => setActiveStation('bridge')}>
            ← RETURN TO BRIDGE
          </button>
          <div className="station-title">
            <Icon size={40} style={{ color: mission.color }} />
            <div>
              <h2>{mission.station}</h2>
              <div className="station-subtitle">{mission.name}</div>
            </div>
          </div>
        </div>

        <div className="scenarios-grid">
          {mission.scenarios.map(scenario => {
            const completed = isCompleted(mission.id, scenario.id);
            const active = selectedScenario?.id === scenario.id;

            return (
              <div 
                key={scenario.id}
                className={`scenario-card ${completed ? 'completed' : ''} ${active ? 'active' : ''}`}
                onClick={() => !completed && startMission(mission, scenario)}
              >
                <div className="scenario-header">
                  <div className="scenario-title">{scenario.title}</div>
                  {completed ? (
                    <CheckCircle size={20} className="complete-icon" />
                  ) : (
                    <AlertTriangle size={20} className="threat-icon" />
                  )}
                </div>
                
                <div className="threat-banner" style={{ borderColor: mission.color }}>
                  <AlertTriangle size={14} />
                  {scenario.threat}
                </div>

                <div className="scenario-description">
                  {scenario.description}
                </div>

                <div className="protocols-list">
                  <div className="protocols-label">PROTOCOLS DEPLOYED:</div>
                  {scenario.protocols.map(protocol => (
                    <span key={protocol} className="protocol-tag">
                      {protocol}
                    </span>
                  ))}
                </div>

                <div className="mitigation-result" style={{ borderColor: mission.color }}>
                  <CheckCircle size={14} />
                  {scenario.mitigation}
                </div>

                {!completed && (
                  <button 
                    className="engage-button"
                    style={{ background: mission.color }}
                    onClick={(e) => {
                      e.stopPropagation();
                      completeMission(mission.id, scenario.id);
                    }}
                  >
                    COMPLETE MISSION
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {scanning && (
          <div className="scanning-overlay">
            <div className="scan-content">
              <Cpu size={48} className="scan-icon" />
              <div className="scan-text">SCANNING THREAT VECTORS...</div>
              <div className="scan-bar">
                <div className="scan-progress"></div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-resume-container">
      {activeStation === 'bridge' ? renderBridge() : renderStation()}
      
      <style jsx>{`
        .space-resume-container {
          min-height: 100vh;
          background: #0a0e1a;
          color: #e0e6f0;
          font-family: 'Courier New', monospace;
          overflow-x: hidden;
          position: relative;
        }

        .starfield {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: 
            radial-gradient(2px 2px at 20% 30%, white, transparent),
            radial-gradient(2px 2px at 60% 70%, white, transparent),
            radial-gradient(1px 1px at 50% 50%, white, transparent),
            radial-gradient(1px 1px at 80% 10%, white, transparent),
            radial-gradient(2px 2px at 90% 60%, white, transparent),
            radial-gradient(1px 1px at 33% 80%, white, transparent),
            radial-gradient(1px 1px at 75% 25%, white, transparent);
          background-size: 200% 200%;
          animation: starMove 100s linear infinite;
          opacity: 0.4;
          z-index: 0;
        }

        @keyframes starMove {
          from { background-position: 0 0; }
          to { background-position: 200% 200%; }
        }

        .bridge-view, .station-view {
          position: relative;
          z-index: 1;
          padding: 2rem;
          min-height: 100vh;
        }

        .hud-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
          z-index: 2;
        }

        .hud-corner {
          position: absolute;
          width: 60px;
          height: 60px;
          border: 2px solid rgba(0, 255, 136, 0.3);
        }

        .hud-corner.top-left {
          top: 1rem;
          left: 1rem;
          border-right: none;
          border-bottom: none;
        }

        .hud-corner.top-right {
          top: 1rem;
          right: 1rem;
          border-left: none;
          border-bottom: none;
        }

        .hud-corner.bottom-left {
          bottom: 1rem;
          left: 1rem;
          border-right: none;
          border-top: none;
        }

        .hud-corner.bottom-right {
          bottom: 1rem;
          right: 1rem;
          border-left: none;
          border-top: none;
        }

        .command-center {
          max-width: 1400px;
          margin: 0 auto;
          position: relative;
        }

        .header-section {
          background: rgba(10, 14, 26, 0.9);
          border: 1px solid rgba(0, 255, 136, 0.3);
          border-radius: 8px;
          padding: 2rem;
          margin-bottom: 2rem;
          box-shadow: 0 0 30px rgba(0, 255, 136, 0.1);
          backdrop-filter: blur(10px);
        }

        .title-container {
          text-align: center;
          margin-bottom: 2rem;
        }

        .main-title {
          font-size: 3.5rem;
          font-weight: 700;
          letter-spacing: 0.5rem;
          margin: 0;
          text-shadow: 0 0 20px rgba(0, 255, 136, 0.5);
          animation: titleGlow 3s ease-in-out infinite;
        }

        .title-prefix {
          color: #00ff88;
          display: block;
          font-size: 1.5rem;
          letter-spacing: 1rem;
        }

        .title-main {
          background: linear-gradient(135deg, #00ff88, #00d4ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          display: block;
        }

        @keyframes titleGlow {
          0%, 100% { text-shadow: 0 0 20px rgba(0, 255, 136, 0.5); }
          50% { text-shadow: 0 0 40px rgba(0, 255, 136, 0.8); }
        }

        .subtitle {
          color: #7a8fa0;
          font-size: 0.9rem;
          letter-spacing: 0.3rem;
          text-transform: uppercase;
          margin-top: 0.5rem;
        }

        .status-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 1rem;
          margin-top: 2rem;
        }

        .status-item {
          background: rgba(0, 255, 136, 0.05);
          border: 1px solid rgba(0, 255, 136, 0.2);
          border-radius: 4px;
          padding: 1rem;
          text-align: center;
        }

        .status-label {
          font-size: 0.7rem;
          color: #7a8fa0;
          letter-spacing: 0.1rem;
          margin-bottom: 0.5rem;
        }

        .status-value {
          font-size: 1.8rem;
          font-weight: 700;
          color: #00ff88;
          text-shadow: 0 0 10px currentColor;
        }

        .dmz-progress-container {
          background: rgba(10, 14, 26, 0.9);
          border: 1px solid rgba(0, 212, 255, 0.3);
          border-radius: 8px;
          padding: 1.5rem;
          margin-bottom: 2rem;
          backdrop-filter: blur(10px);
        }

        .progress-label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #00d4ff;
          font-size: 0.9rem;
          font-weight: 600;
          letter-spacing: 0.2rem;
          margin-bottom: 1rem;
        }

        .progress-track {
          position: relative;
          height: 30px;
          background: rgba(0, 212, 255, 0.1);
          border-radius: 15px;
          overflow: hidden;
          border: 1px solid rgba(0, 212, 255, 0.3);
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #00ff88, #00d4ff);
          border-radius: 15px;
          transition: width 0.5s ease;
          position: relative;
          box-shadow: 0 0 20px rgba(0, 212, 255, 0.6);
        }

        .progress-pulse {
          position: absolute;
          top: 0;
          right: 0;
          width: 20px;
          height: 100%;
          background: white;
          opacity: 0.3;
          animation: pulse 1.5s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.7; }
        }

        .progress-markers {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          align-items: center;
        }

        .marker {
          position: absolute;
          transform: translateX(-50%);
          color: rgba(255, 255, 255, 0.3);
          transition: color 0.3s;
        }

        .marker.active {
          color: #fff;
        }

        .dmz-achieved {
          margin-top: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          color: #00ff88;
          font-weight: 700;
          font-size: 1rem;
          letter-spacing: 0.1rem;
          animation: celebrate 1s ease-in-out;
        }

        @keyframes celebrate {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        .mission-stations {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
        }

        .station-card {
          background: rgba(10, 14, 26, 0.9);
          border: 2px solid var(--station-color);
          border-radius: 8px;
          padding: 1.5rem;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 1rem;
          backdrop-filter: blur(10px);
          position: relative;
          overflow: hidden;
        }

        .station-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, var(--station-color), transparent);
          opacity: 0;
          transition: opacity 0.3s;
        }

        .station-card:hover::before {
          opacity: 0.1;
        }

        .station-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 5px 30px rgba(var(--station-color), 0.3);
        }

        .station-card.complete {
          border-color: #00ff88;
        }

        .station-icon {
          position: relative;
          color: var(--station-color);
          flex-shrink: 0;
        }

        .complete-badge {
          position: absolute;
          top: -5px;
          right: -5px;
          background: #00ff88;
          border-radius: 50%;
          color: #0a0e1a;
          animation: badgePop 0.3s ease;
        }

        @keyframes badgePop {
          0% { transform: scale(0); }
          50% { transform: scale(1.2); }
          100% { transform: scale(1); }
        }

        .station-info {
          flex-grow: 1;
        }

        .station-name {
          font-size: 1.2rem;
          font-weight: 700;
          color: var(--station-color);
          margin-bottom: 0.3rem;
        }

        .station-category {
          color: #9aa5b5;
          font-size: 0.85rem;
          margin-bottom: 0.5rem;
        }

        .station-progress {
          font-size: 0.75rem;
          color: #7a8fa0;
          letter-spacing: 0.1rem;
        }

        .station-chevron {
          font-size: 2rem;
          color: var(--station-color);
          opacity: 0.5;
        }

        .station-view {
          padding-top: 1rem;
        }

        .station-header {
          display: flex;
          align-items: center;
          gap: 2rem;
          margin-bottom: 2rem;
        }

        .back-button {
          background: rgba(0, 255, 136, 0.1);
          border: 1px solid rgba(0, 255, 136, 0.3);
          color: #00ff88;
          padding: 0.7rem 1.5rem;
          border-radius: 4px;
          cursor: pointer;
          font-family: inherit;
          font-size: 0.85rem;
          letter-spacing: 0.1rem;
          transition: all 0.3s;
        }

        .back-button:hover {
          background: rgba(0, 255, 136, 0.2);
          transform: translateX(-5px);
        }

        .station-title {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .station-title h2 {
          font-size: 2rem;
          margin: 0;
          letter-spacing: 0.2rem;
        }

        .station-subtitle {
          color: #7a8fa0;
          font-size: 0.9rem;
          letter-spacing: 0.1rem;
        }

        .scenarios-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 1.5rem;
        }

        .scenario-card {
          background: rgba(10, 14, 26, 0.95);
          border: 1px solid rgba(0, 255, 136, 0.2);
          border-radius: 8px;
          padding: 1.5rem;
          cursor: pointer;
          transition: all 0.3s;
          backdrop-filter: blur(10px);
        }

        .scenario-card:hover {
          border-color: rgba(0, 255, 136, 0.5);
          transform: translateY(-3px);
          box-shadow: 0 5px 20px rgba(0, 255, 136, 0.2);
        }

        .scenario-card.completed {
          border-color: rgba(0, 255, 136, 0.5);
          background: rgba(0, 255, 136, 0.05);
        }

        .scenario-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1rem;
        }

        .scenario-title {
          font-size: 1.2rem;
          font-weight: 700;
          color: #e0e6f0;
        }

        .complete-icon {
          color: #00ff88;
        }

        .threat-icon {
          color: #ff3366;
          animation: threatBlink 2s ease-in-out infinite;
        }

        @keyframes threatBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        .threat-banner {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background: rgba(255, 51, 102, 0.1);
          border-left: 3px solid #ff3366;
          color: #ff3366;
          font-size: 0.85rem;
          font-weight: 600;
          margin-bottom: 1rem;
          letter-spacing: 0.05rem;
        }

        .scenario-description {
          color: #9aa5b5;
          font-size: 0.9rem;
          line-height: 1.6;
          margin-bottom: 1rem;
        }

        .protocols-list {
          margin-bottom: 1rem;
        }

        .protocols-label {
          font-size: 0.7rem;
          color: #7a8fa0;
          letter-spacing: 0.1rem;
          margin-bottom: 0.5rem;
        }

        .protocol-tag {
          display: inline-block;
          background: rgba(0, 212, 255, 0.1);
          border: 1px solid rgba(0, 212, 255, 0.3);
          color: #00d4ff;
          padding: 0.3rem 0.7rem;
          border-radius: 3px;
          font-size: 0.75rem;
          margin-right: 0.5rem;
          margin-bottom: 0.5rem;
          letter-spacing: 0.05rem;
        }

        .mitigation-result {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.7rem 1rem;
          background: rgba(0, 255, 136, 0.05);
          border-left: 3px solid #00ff88;
          color: #00ff88;
          font-size: 0.85rem;
          font-weight: 600;
          margin-bottom: 1rem;
          letter-spacing: 0.05rem;
        }

        .engage-button {
          width: 100%;
          padding: 0.9rem;
          background: #00ff88;
          border: none;
          border-radius: 4px;
          color: #0a0e1a;
          font-family: inherit;
          font-size: 0.9rem;
          font-weight: 700;
          letter-spacing: 0.2rem;
          cursor: pointer;
          transition: all 0.3s;
        }

        .engage-button:hover {
          transform: scale(1.02);
          box-shadow: 0 5px 20px rgba(0, 255, 136, 0.4);
        }

        .scanning-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.9);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .scan-content {
          text-align: center;
        }

        .scan-icon {
          color: #00d4ff;
          animation: scanRotate 2s linear infinite;
          margin-bottom: 1rem;
        }

        @keyframes scanRotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .scan-text {
          font-size: 1.2rem;
          color: #00d4ff;
          letter-spacing: 0.2rem;
          margin-bottom: 1.5rem;
        }

        .scan-bar {
          width: 300px;
          height: 4px;
          background: rgba(0, 212, 255, 0.2);
          border-radius: 2px;
          overflow: hidden;
        }

        .scan-progress {
          height: 100%;
          background: #00d4ff;
          animation: scanProgress 2s ease-in-out;
          box-shadow: 0 0 10px #00d4ff;
        }

        @keyframes scanProgress {
          from { width: 0%; }
          to { width: 100%; }
        }

        @media (max-width: 768px) {
          .main-title {
            font-size: 2rem;
          }

          .title-prefix {
            font-size: 1rem;
          }

          .scenarios-grid {
            grid-template-columns: 1fr;
          }

          .mission-stations {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default SpaceResumeGame;
