import { useState, useEffect } from 'react'
import styles from './SystemDesign.module.css'

interface ArchNode {
    id: string
    layer: string
    label: string
    sub: string
    color: string
    icon: string
    product: string
    desc: string
    why: string
    pro: string
    con: string
    metrics: { v: string; l: string }[]
    chips: string[]
}

const ARCH_NODES: ArchNode[] = [
    {
        id: 'react',
        layer: 'Frontend',
        label: 'React 18/19 + TS',
        sub: 'SPA · MobX · TanStack Query',
        color: '#00e5ff',
        icon: '⚛',
        product: 'All Products',
        desc: 'React 18/19 with TypeScript, MobX Root State for predictable global state, TanStack Query for server-state caching, and WebSocket sync for real-time collaborative workflows. In-house scaffolding system cut dev time by 15%.',
        why: 'TypeScript enforces schema contracts between the frontend and FastAPI — catching integration bugs at compile time rather than in production. MobX Root State provides observable, reactive global state without boilerplate.',
        pro: 'Type safety across 30k+ LOC, zero type-related production bugs, fast HMR with Vite, and predictable state management.',
        con: 'Build configuration overhead; mitigated with esbuild + Vite.',
        metrics: [{ v: '15%', l: 'Dev speed' }, { v: '0', l: 'Type bugs' }, { v: '30k+', l: 'TS LOC' }, { v: 'MobX', l: 'State mgmt' }],
        chips: ['React 18/19', 'TypeScript 5', 'MobX', 'TanStack Query', 'Vite', 'WebSockets'],
    },
    {
        id: 'fastapi',
        layer: 'API Layer',
        label: 'FastAPI + Python',
        sub: 'Async REST · Repository Pattern',
        color: '#818cf8',
        icon: '⚡',
        product: 'All Products',
        desc: 'Core async REST API with Pydantic validation, Repository Pattern for testability, and auto-generated OpenAPI docs. Handles 500+ concurrent requests. Migrated 30+ PostgreSQL stored procedures into EF Core + LINQ, improving API performance by 40%.',
        why: "FastAPI's Pydantic models double as TypeScript type sources — a single schema drives both layers. Async I/O handles bursty workloads without blocking thread pools.",
        pro: '40% perf gain post-migration, auto OpenAPI docs, async I/O, repository pattern enables 95%+ test coverage.',
        con: 'Less mature ecosystem than Django for some middleware; some utilities written from scratch.',
        metrics: [{ v: '40%', l: 'Perf gain' }, { v: '<80ms', l: 'P95 latency' }, { v: '500+', l: 'Concurrent req' }, { v: '95%', l: 'Test coverage' }],
        chips: ['FastAPI', 'Pydantic', 'SQLAlchemy', 'Alembic', 'Python 3.11', 'EF Core + LINQ'],
    },
    {
        id: 'langgraph',
        layer: 'Service Layer (AI)',
        label: 'LangGraph · Multi-LLM',
        sub: 'OpenAI · Anthropic · Gemini',
        color: '#a855f7',
        icon: '🧠',
        product: 'llm-saas',
        desc: 'Production-grade multi-LLM orchestration pipelines built as a standalone internal AI product. Integrates OpenAI, Anthropic, and Gemini with LangGraph stateful graph execution, retry handling, token metering, per-model billing, and LangSmith observability for full traceability.',
        why: "LangGraph's stateful graph model handles complex multi-step AI workflows that simple chains can't manage — essential for interview intelligence and email automation pipelines where intermediate state must be maintained.",
        pro: 'Model-agnostic, full observability via LangSmith, automatic retry + fallback handling, real-time token metering per model.',
        con: 'Graph debugging complexity; LangSmith traces are essential for production correctness.',
        metrics: [{ v: '3', l: 'LLM providers' }, { v: '100%', l: 'Retry coverage' }, { v: 'Real-time', l: 'Token metering' }, { v: 'LangSmith', l: 'Observability' }],
        chips: ['LangGraph', 'OpenAI GPT-4o', 'Anthropic Claude', 'Gemini 1.5', 'LangSmith', 'Stripe Metering'],
    },
    {
        id: 'aws',
        layer: 'Service Layer (Cloud)',
        label: 'AWS Serverless',
        sub: 'Lambda · API Gateway · DynamoDB',
        color: '#818cf8',
        icon: '☁',
        product: 'interview-platform',
        desc: 'FastAPI on AWS Lambda + API Gateway powering the real-time interview intelligence platform built for a client. DynamoDB handles live transcript storage with sub-10ms reads. Supports live transcription, collaborative notes, and analytics dashboards streamed via WebSocket.',
        why: 'Serverless on Lambda means zero idle cost — interview sessions are bursty by nature (spikes during live calls, silence between). DynamoDB single-digit ms reads handle real-time transcript streaming without a connection pool overhead.',
        pro: 'Auto-scaling, pay-per-request pricing, zero server management, native AWS IAM auth.',
        con: 'Cold starts (<200ms); mitigated with provisioned concurrency on frequently-hit Lambda paths.',
        metrics: [{ v: '<10ms', l: 'DynamoDB read' }, { v: '0', l: 'Idle cost' }, { v: 'Auto', l: 'Scale policy' }, { v: 'API GW', l: 'Gateway' }],
        chips: ['AWS Lambda', 'API Gateway', 'DynamoDB', 'AWS IAM', 'CloudWatch', 'WebSockets'],
    },
    {
        id: 'azure',
        layer: 'Service Layer (Cloud)',
        label: 'Azure Infra',
        sub: 'Container Apps · DevOps · ADF',
        color: '#94a3b8',
        icon: '🔷',
        product: 'enterprise-saas',
        desc: 'Azure Container Apps hosts Dockerised FastAPI microservices for the enterprise SaaS stack. Azure DevOps CI/CD improved deployment reliability by 35%. Azure Data Factory powers pharma-client ETL pipelines. Terraform automates all infrastructure as code for reproducibility.',
        why: 'Azure Container Apps provides managed Kubernetes-style horizontal scaling without the operational overhead of running a full cluster — right-sized for microservices that need auto-scale but not full cluster control.',
        pro: 'Managed scaling, integrated DevOps pipelines, Terraform IaC for reproducible environments, zero manual k8s config.',
        con: 'ADF cost grows with data volume; requires careful cost modelling for large-scale ETL at scale.',
        metrics: [{ v: '35%', l: 'Deploy reliability' }, { v: 'Terraform', l: 'IaC' }, { v: 'ADF', l: 'ETL pipeline' }, { v: 'ACA', l: 'Hosting' }],
        chips: ['Azure Container Apps', 'Azure DevOps', 'Azure Data Factory', 'Blob Storage', 'Terraform', 'Databricks'],
    },
    {
        id: 'data',
        layer: 'Data & Infrastructure',
        label: 'PostgreSQL + Redis',
        sub: 'OLTP · Cache · Celery Backend',
        color: '#94a3b8',
        icon: '🗄',
        product: 'All Products',
        desc: 'PostgreSQL is the primary OLTP store managed via Alembic migrations and the Repository Pattern. Redis serves as a caching layer, session store, and Celery result backend. Zero data incidents across 4+ years of production operation.',
        why: 'PostgreSQL ensures ACID compliance — critical for pharma clients with strict data integrity and audit trail requirements. Redis caching absorbs 70%+ of repeated reads, preventing database saturation on hot paths.',
        pro: 'Full ACID compliance, JSON column support, mature ecosystem, Redis eliminates repeated expensive queries.',
        con: 'Vertical scaling limits at extreme throughput; read replica planned for high-volume reporting queries.',
        metrics: [{ v: '0', l: 'Data incidents' }, { v: '<5ms', l: 'Query avg' }, { v: '70%+', l: 'Cache hit rate' }, { v: 'ACID', l: 'Compliance' }],
        chips: ['PostgreSQL 15', 'Redis 7', 'SQLAlchemy', 'Alembic', 'pgBouncer', 'Celery Result Backend'],
    },
    {
        id: 'celery',
        layer: 'Data & Infrastructure',
        label: 'Celery + RabbitMQ',
        sub: 'Async Workers · Background Jobs',
        color: '#818cf8',
        icon: '⚙',
        product: 'All Products',
        desc: 'Long-running ETL jobs, AI pipeline executions, and campaign dispatch are offloaded to Celery workers via RabbitMQ, keeping all API responses under 100ms. Workers auto-scale via Kubernetes HPA based on queue depth.',
        why: 'User-facing API must never block on compute-heavy tasks. Async job dispatch via Celery eliminated API timeout errors entirely — 100% reduction since adoption. RabbitMQ provides durable message queuing with dead-letter handling.',
        pro: 'Non-blocking user experience, automatic retry on failure, horizontal worker scaling via HPA, custom correlation ID tracing across jobs.',
        con: 'Distributed failure debugging requires robust logging; built custom correlation ID + structured logging middleware.',
        metrics: [{ v: '0', l: 'Timeout errors' }, { v: '3×', l: 'Retry policy' }, { v: 'HPA', l: 'Auto-scale' }, { v: 'RMQ', l: 'Message broker' }],
        chips: ['Celery 5', 'RabbitMQ', 'Redis Result Backend', 'Docker', 'Kubernetes HPA', 'Flower Monitor'],
    },
]

const PRODUCTS = [
    {
        id: 'llm-saas',
        title: 'Internal AI SaaS Product',
        badge: 'AI Core',
        badgeColor: '#00e5ff',
        desc: 'Multi-LLM orchestration platform built as a standalone internal product. Supports multi-model routing, token metering, and LangGraph observability.',
        nodes: ['react', 'fastapi', 'langgraph', 'data', 'celery'],
        flow: [
            { label: 'React UI dispatches authenticated API call', color: '#00e5ff' },
            { label: 'FastAPI validates Pydantic schema + checks auth', color: '#818cf8' },
            { label: 'AI task dispatched to LangGraph orchestrator', color: '#a855f7' },
            { label: 'LangGraph calls OpenAI/Anthropic with retry logic', color: '#a855f7' },
            { label: 'Token usage metrics persisted to PostgreSQL', color: '#94a3b8' },
        ],
    },
    {
        id: 'interview-platform',
        title: 'Interview Intelligence Platform',
        badge: 'Client Engine',
        badgeColor: '#818cf8',
        desc: 'Real-time interview analytics platform for a client. Live transcription and session analytics built serverless on AWS.',
        nodes: ['react', 'fastapi', 'aws', 'data'],
        flow: [
            { label: 'Live audio stream captured in React UI', color: '#00e5ff' },
            { label: 'FastAPI on Lambda routes request to transcription', color: '#818cf8' },
            { label: 'DynamoDB stores real-time transcript chunks', color: '#818cf8' },
            { label: 'AI summary generated and synced back to UI', color: '#a855f7' },
            { label: 'Analytics dashboard updated with live highlights', color: '#00e5ff' },
        ],
    },
    {
        id: 'enterprise-saas',
        title: 'Enterprise SaaS + ETL',
        badge: 'Enterprise',
        badgeColor: '#94a3b8',
        desc: 'Scalable enterprise SaaS with pharma-client ETL pipelines. Azure Container Apps microservices and ADF ingestion.',
        nodes: ['react', 'fastapi', 'azure', 'data', 'celery'],
        flow: [
            { label: 'Enterprise admin triggers bulk data sync', color: '#00e5ff' },
            { label: 'Azure Data Factory orchestrates ETL pipeline', color: '#94a3b8' },
            { label: 'Databricks processes transformations on Spark', color: '#94a3b8' },
            { label: 'Celery worker syncs results to PostgreSQL', color: '#818cf8' },
            { label: 'Dashboard refreshed with latest verified data', color: '#00e5ff' },
        ],
    },
]

const LAYERS = ['Frontend', 'API Layer', 'Service Layer (AI)', 'Service Layer (Cloud)', 'Data & Infrastructure']

export default function SystemDesign() {
    const [selected, setSelected] = useState<ArchNode | null>(null)
    const [activeProduct, setActiveProduct] = useState<string>('llm-saas')
    const [traceStep, setTraceStep] = useState<number>(-1)

    const currentProduct = PRODUCTS.find((p) => p.id === activeProduct)!
    const highlightedNodes = currentProduct.nodes

    useEffect(() => {
        let isMounted = true
        const runTrace = async () => {
            setTraceStep(-1)
            const flow = currentProduct.flow
            for (let i = 0; i < flow.length; i++) {
                if (!isMounted) return
                setTraceStep(i)
                await new Promise((r) => setTimeout(r, 1000))
            }
            if (!isMounted) return
            await new Promise((r) => setTimeout(r, 800))
            setTraceStep(-1)
        }
        runTrace()
        return () => { isMounted = false }
    }, [activeProduct])

    return (
        <section id="system-design" className={styles.section}>
            <div className="section-label">02 — System Design</div>
            <h2 className="section-title reveal">Production <em>Stack</em></h2>
            <p className={styles.subtitle}>
                A specialized architecture designed for scalability. The system shares a core API layer
                but bifurcates into dedicated AI orchestration or cloud serverless environments.
            </p>

            <div className={styles.productTabs}>
                {PRODUCTS.map((p) => (
                    <button
                        key={p.id}
                        className={`${styles.productTab} ${activeProduct === p.id ? styles.productTabActive : ''}`}
                        onClick={() => { setActiveProduct(p.id); setSelected(null) }}
                        style={activeProduct === p.id ? { borderColor: p.badgeColor } : {}}
                    >
                        <span className={styles.productBadge} style={{ background: `${p.badgeColor}22`, color: p.badgeColor }}>
                            {p.badge}
                        </span>
                        <span className={styles.productTabTitle}>{p.title}</span>
                    </button>
                ))}
            </div>

            <div className={styles.mainLayout}>
                {/* Left Column: Architecture View */}
                <div className={styles.archWrapper}>
                    {LAYERS.map((layer, index) => {
                        const layerNodes = ARCH_NODES.filter(n => n.layer === layer)
                        if (layer.includes('Service Layer')) {
                            const hasActiveNode = layerNodes.some(n => highlightedNodes.includes(n.id))
                            if (!hasActiveNode) return null
                        }

                        return (
                            <div key={layer} className={styles.layerGroup} data-layer={layer}>
                                <div className={styles.nodesRow}>
                                    {layerNodes.map(node => {
                                        const isHighlighted = highlightedNodes.includes(node.id)
                                        return (
                                            <button
                                                key={node.id}
                                                className={`${styles.archNode} ${isHighlighted ? styles.nodeHighlighted : styles.nodeDim}`}
                                                style={{ '--node-color': node.color } as React.CSSProperties}
                                                onClick={() => setSelected(node)}
                                            >
                                                <span className={styles.nodeIcon}>{node.icon}</span>
                                                <div>
                                                    <div className={styles.nodeLabel}>{node.label}</div>
                                                    <div className={styles.nodeSub}>{node.sub}</div>
                                                </div>
                                            </button>
                                        )
                                    })}
                                </div>
                                {index < LAYERS.length - 1 && <div className={styles.connector} />}
                            </div>
                        )
                    })}
                </div>

                {/* Right Column: Request Lifecycle Trace */}
                <div className={styles.traceSection}>
                    <div className={styles.traceHeader}>
                        <div className={styles.traceTitle}>// Request Lifecycle Trace</div>
                        <div className={styles.traceSub}>Auto-animated flow for {currentProduct.badge}</div>
                    </div>
                    <div className={styles.traceSteps}>
                        {currentProduct.flow.map((step, i) => (
                            <div
                                key={i}
                                className={`${styles.traceStep} ${traceStep === i ? styles.traceStepActive : ''} ${traceStep > i ? styles.traceStepDone : ''}`}
                            >
                                <span className={styles.traceNum}>[{i + 1}]</span>
                                <span className={styles.traceDot} style={{ background: step.color }} />
                                <span>{step.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Selected Node Detail Overlay */}
            {selected && (
                <div className={styles.detailOverlay} onClick={() => setSelected(null)}>
                    <div className={styles.detailPanel} 
                         onClick={e => e.stopPropagation()}
                         style={{ '--node-color': selected.color } as React.CSSProperties}>
                        <button className={styles.detailClose} onClick={() => setSelected(null)}>✕</button>
                        <div className={styles.detailTitle}>{selected.label}</div>
                        <div className={styles.detailSub}>{selected.sub}</div>

                        <div className={styles.detailSection}>
                            <div className={styles.detailSectionTitle}>Architecture Role</div>
                            <p>{selected.desc}</p>
                        </div>

                        <div className={styles.detailSection}>
                            <div className={styles.detailSectionTitle}>Performance Metrics</div>
                            <div className={styles.metrics}>
                                {selected.metrics.map((m) => (
                                    <div key={m.l} className={styles.metric}>
                                        <div className={styles.metricVal} style={{ color: selected.color }}>{m.v}</div>
                                        <div className={styles.metricLabel}>{m.l}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className={styles.detailSection}>
                            <div className={styles.detailSectionTitle}>Design Decision</div>
                            <p><em>// Why I chose this:</em> {selected.why}</p>
                        </div>

                        <div className={styles.detailSection}>
                            <div className={styles.detailSectionTitle}>Stack Components</div>
                            <div className={styles.detailChips}>
                                {selected.chips.map((c) => <span key={c} className="chip">{c}</span>)}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    )
}
