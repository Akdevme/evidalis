/**
 * Evidalis — Evidence & Decision Intelligence Platform
 * Developed by: AkDev (คภкเՇ ɠยקՇค)
 * Portfolio: https://akdevme.netlify.app
 * Search on Google: "ak dev uix"
 */

import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import {
  Radio,
  Network,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Workflow,
  Sparkles,
  Layers,
  Activity,
  FileCheck2,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';
import Badge from '../components/Badge';
import SectionHeading from '../components/SectionHeading';
import BrandLogo from '../components/BrandLogo';
import { markIntroCompleted, hasCompletedIntro } from '../lib/introStorage';

export const IntroPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const bottomRef = useRef(null);
  const heroRef = useRef(null);
  const cardsRef = useRef(null);
  const graphRef = useRef(null);

  const [activePipelineStep, setActivePipelineStep] = useState(1);
  const [activeNode, setActiveNode] = useState('cluster');

  // Check if user arrived intentionally (e.g. from dashboard "View Introduction" button)
  const isIntentionalVisit = new URLSearchParams(location.search).get('view') === 'intro';
  const [shouldRedirect] = useState(() => !isIntentionalVisit && hasCompletedIntro());

  // Prevent flash and redirect returning users
  useEffect(() => {
    if (shouldRedirect) {
      navigate('/dashboard', { replace: true });
    }
  }, [navigate, shouldRedirect]);

  // Mark completion when user reaches bottom
  useEffect(() => {
    if (shouldRedirect) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          markIntroCompleted();
        }
      },
      { threshold: 0.5 }
    );

    if (bottomRef.current) {
      observer.observe(bottomRef.current);
    }

    return () => observer.disconnect();
  }, [shouldRedirect]);

  // GSAP entrance animations with reduced-motion check
  useEffect(() => {
    if (shouldRedirect) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from('.gsap-hero-item', {
        opacity: 0,
        y: 18,
        duration: 0.75,
        stagger: 0.12,
        ease: 'power3.out',
      });

      gsap.from('.gsap-preview-card', {
        opacity: 0,
        y: 24,
        duration: 0.85,
        delay: 0.35,
        ease: 'power3.out',
      });
    }, heroRef);

    return () => ctx.revert();
  }, [shouldRedirect]);

  if (shouldRedirect) {
    return null;
  }

  const handleGoToDashboard = () => {
    markIntroCompleted();
    navigate('/dashboard');
  };

  const handleScrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F5EF] text-[#45433D] bg-subtle-grid selection:bg-[rgba(113,132,154,0.25)] selection:text-[#35332F] animate-page-enter">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 glass-surface border-b border-[#C4BEB2] bg-[#FAF7F2]/90 backdrop-blur-md pt-safe">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <BrandLogo size="md" />

          {/* Navigation Links to Product, Capabilities, and Trust */}
          <nav className="hidden md:flex items-center gap-8 text-sm">
            <button
              onClick={() => handleScrollToSection('product')}
              className="text-[#625D54] hover:text-[#425B72] transition-colors font-medium focus-visible:outline-none focus-visible:text-[#425B72]"
            >
              Product
            </button>
            <button
              onClick={() => handleScrollToSection('capabilities')}
              className="text-[#625D54] hover:text-[#425B72] transition-colors font-medium focus-visible:outline-none focus-visible:text-[#425B72]"
            >
              Capabilities
            </button>
            <button
              onClick={() => handleScrollToSection('trust')}
              className="text-[#625D54] hover:text-[#425B72] transition-colors font-medium focus-visible:outline-none focus-visible:text-[#425B72]"
            >
              Trust
            </button>
          </nav>

          {/* Top Actions: Explore Dashboard */}
          <div className="flex items-center gap-2 sm:gap-4">
            <Button
              variant="primary"
              size="sm"
              iconRight={ArrowRight}
              onClick={handleGoToDashboard}
              className="text-xs"
            >
              <span className="hidden sm:inline">Explore </span>Dashboard
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section with Warm Earth-Tone Gradient */}
      <section
        ref={heroRef}
        className="relative pt-16 sm:pt-24 pb-20 overflow-hidden"
        style={{
          background: 'radial-gradient(80% 80% at 50% 0%, #E8DFD1 0%, #F7F5EF 70%)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="gsap-hero-item inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#ECECEC] border border-[#C4BEB2] text-[#425B72] font-semibold text-xs mb-6 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#2E7D32] animate-pulse" />
              <span>INTELLIGENT FEEDBACK &amp; DECISION PLATFORM</span>
            </div>

            <h1 className="gsap-hero-item text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#35332F] leading-[1.12]">
              Turn customer feedback into{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#425B72] via-[#71849A] to-[#78846A]">
                clear, evidence-backed decisions.
              </span>
            </h1>

            <p className="gsap-hero-item mt-6 text-base sm:text-lg text-[#625D54] leading-relaxed max-w-2xl mx-auto">
              Evidalis connects raw customer feedback to verifiable evidence and actionable decisions.
              <span className="block mt-1 font-semibold text-[#425B72] italic">&ldquo;Every pattern tells a story.&rdquo;</span>
            </p>

            <div className="gsap-hero-item mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                variant="primary"
                size="lg"
                iconRight={ArrowRight}
                onClick={handleGoToDashboard}
                className="w-full sm:w-auto"
              >
                Explore Dashboard
              </Button>
              <Button
                variant="secondary"
                size="lg"
                onClick={() => handleScrollToSection('product')}
                className="w-full sm:w-auto"
              >
                See How It Works
              </Button>
            </div>
          </div>

          {/* Analysis Pipeline Preview */}
          <div id="product" className="gsap-preview-card max-w-4xl mx-auto mt-12">
            <Card className="border-[#C4BEB2] bg-[#ECECEC] shadow-lg overflow-hidden">
              {/* Header */}
              <div className="px-5 py-3.5 bg-[#FAF7F2] border-b border-[#C4BEB2] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#C4BEB2]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#C4BEB2]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#C4BEB2]" />
                  </div>
                  <span className="text-xs text-[#625D54] font-medium">
                    evidalis // analysis-pipeline-engine
                  </span>
                </div>
                <Badge variant="slate" size="sm" dot>
                  Live Stream Ready
                </Badge>
              </div>

              {/* 4 Pipeline Stages */}
              <div className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
                  {[
                    { id: 1, title: '01. Ingestion', desc: '7,001 Pool & CSV Stream', badge: 'Deduplicated' },
                    { id: 2, title: '02. Signal Detection', desc: '4 Core Categories', badge: 'Clustering' },
                    { id: 3, title: '03. Evidence Mapping', desc: 'Bidirectional Lineage', badge: 'Traceable' },
                    { id: 4, title: '04. Decision Action', desc: 'Ranked Resolutions', badge: 'Prioritized' },
                  ].map((step) => (
                    <button
                      key={step.id}
                      onClick={() => setActivePipelineStep(step.id)}
                      className={`text-left p-3.5 rounded-lg border transition-all text-xs cursor-pointer ${
                        activePipelineStep === step.id
                          ? 'bg-[#EAE4D7] border-[#71849A] shadow-xs'
                          : 'bg-[#FAF7F2] border-[#C4BEB2] hover:bg-[#EAE4D7]/60'
                      }`}
                    >
                      <div className={`font-semibold mb-1 ${activePipelineStep === step.id ? 'text-[#425B72]' : 'text-[#625D54]'}`}>
                        {step.title}
                      </div>
                      <div className="text-[#45433D] font-medium mb-1">
                        {step.desc}
                      </div>
                      <div className="text-[11px] text-[#6B655B] font-medium">
                        {step.badge}
                      </div>
                    </button>
                  ))}
                </div>

                {/* Pipeline Context Box */}
                <div className="rounded-lg bg-[#FAF7F2] border border-[#C4BEB2] p-5 text-xs text-[#45433D] leading-relaxed">
                  <div className="flex items-center justify-between text-[#6B655B] border-b border-[#C4BEB2] pb-2.5 mb-3 font-semibold">
                    <span>STAGE {activePipelineStep} OF 4 SPECIFICATION</span>
                    <span className="text-[#2E7D32] text-[11px] font-bold">ACTIVE PROTOCOL</span>
                  </div>

                  {activePipelineStep === 1 && (
                    <div className="space-y-1.5">
                      <p className="text-[#6B655B]">// Ingestion pipeline with 7,001 review pool &amp; CSV parser:</p>
                      <p><span className="text-[#425B72] font-semibold">poolCapacity</span>: 7,001 verified customer entries</p>
                      <p><span className="text-[#425B72] font-semibold">duplicateVerification</span>: Distinguishes raw repeated rows from unique submitters</p>
                      <p><span className="text-[#425B72] font-semibold">persistenceEngine</span>: Base64 browser caching ensures state preservation</p>
                      <p className="text-[#2E7D32] font-semibold mt-2">&gt; Real-time ingestion active with Math.random streaming interval.</p>
                    </div>
                  )}

                  {activePipelineStep === 2 && (
                    <div className="space-y-1.5">
                      <p className="text-[#6B655B]">// 4 Main Category grouping architecture:</p>
                      <p><span className="text-[#425B72] font-semibold">categories</span>: [Product Feedback, Customer Service, Fraud &amp; Scam, Operational Issues]</p>
                      <p><span className="text-[#425B72] font-semibold">clusterIdMapping</span>: PF-101, CS-201, FS-301, OI-401 taxonomy</p>
                      <p><span className="text-[#425B72] font-semibold">noiseIsolation</span>: Statistical confidence filter avoids false clusters</p>
                      <p className="text-[#2E7D32] font-semibold mt-2">&gt; Groups recurring friction points directly into identifiable cluster codes.</p>
                    </div>
                  )}

                  {activePipelineStep === 3 && (
                    <div className="space-y-1.5">
                      <p className="text-[#6B655B]">// Evidence Graph lineage guarantee:</p>
                      <p><span className="text-[#425B72] font-semibold">lineageLink</span>: Original Feedback &lt;===&gt; Issue Cluster &lt;===&gt; Action</p>
                      <p><span className="text-[#425B72] font-semibold">auditQuoteCount</span>: Exact quotes recorded per cluster ID</p>
                      <p><span className="text-[#425B72] font-semibold">hallucinationGuard</span>: Reject assertions without verified customer mentions</p>
                      <p className="text-[#2E7D32] font-semibold mt-2">&gt; Full lineage visible on the interactive category trend chart.</p>
                    </div>
                  )}

                  {activePipelineStep === 4 && (
                    <div className="space-y-1.5">
                      <p className="text-[#6B655B]">// Action matrix impact scoring:</p>
                      <p><span className="text-[#425B72] font-semibold">scoringFormula</span>: (FrequencyWeight * 0.4) + (Severity * 0.35) + (Confidence * 0.25)</p>
                      <p><span className="text-[#425B72] font-semibold">outputFormat</span>: Engineering pull-request scope &amp; product roadmap action</p>
                      <p className="text-[#2E7D32] font-semibold mt-2">&gt; Converts customer frustration into prioritized developer tasks.</p>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section id="capabilities" className="py-20 border-t border-[#C4BEB2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="CAPABILITIES"
            title="Engineered for analytical precision"
            description="Evidalis replaces vague intuition with structured signal detection, transparent lineage, and data quality standards."
          />

          <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {/* Card 1: Signal Detection */}
            <Card hoverEffect className="p-6 flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#FAF7F2] border border-[#C4BEB2] text-[#71849A] flex items-center justify-center mb-5 group-hover:border-[#71849A] transition-all">
                  <Radio className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-[#35332F] mb-2">
                  Signal Detection
                </h3>
                <p className="text-sm text-[#625D54] leading-relaxed mb-6">
                  Identify recurring issues and group similar feedback across Product Feedback, Customer Service, Fraud &amp; Scam, and Operational Issues.
                </p>
              </div>

              <div className="pt-4 border-t border-[#EAE4D7]">
                <ul className="text-xs text-[#45433D] space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#2E7D32]" />
                    <span>4 Core Category taxonomy</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#2E7D32]" />
                    <span>Real-time pool streaming</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#2E7D32]" />
                    <span>Outlier noise filtering</span>
                  </li>
                </ul>
              </div>
            </Card>

            {/* Card 2: Evidence Graph */}
            <Card hoverEffect className="p-6 flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#FAF7F2] border border-[#C4BEB2] text-[#71849A] flex items-center justify-center mb-5 group-hover:border-[#71849A] transition-all">
                  <Network className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-[#35332F] mb-2">
                  Evidence Graph
                </h3>
                <p className="text-sm text-[#625D54] leading-relaxed mb-6">
                  Connect original feedback to detected patterns and recommended actions. Every decision is verifiable back to source quotes.
                </p>
              </div>

              <div className="pt-4 border-t border-[#EAE4D7]">
                <ul className="text-xs text-[#45433D] space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#2E7D32]" />
                    <span>Bidirectional quote lookup</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#2E7D32]" />
                    <span>Interactive cluster ID filtering</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#2E7D32]" />
                    <span>Audit trail verifiability</span>
                  </li>
                </ul>
              </div>
            </Card>

            {/* Card 3: Trust & Data Quality - Spans full width on tablets/foldables (___ ___ / _______) */}
            <Card hoverEffect className="p-6 flex flex-col justify-between group sm:col-span-2 lg:col-span-1">
              <div className="sm:grid sm:grid-cols-2 sm:gap-6 lg:block">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#FAF7F2] border border-[#C4BEB2] text-[#78846A] flex items-center justify-center mb-5 group-hover:border-[#78846A] transition-all">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-[#35332F] mb-2">
                    Trust &amp; Data Quality
                  </h3>
                  <p className="text-sm text-[#625D54] leading-relaxed mb-6 sm:mb-0 lg:mb-6">
                    Surface duplicate patterns, evidence counts, and analysis limitations transparently to prevent unsupported claims.
                  </p>
                </div>

                <div className="pt-4 sm:pt-0 lg:pt-4 border-t sm:border-t-0 sm:border-l sm:pl-6 lg:border-l-0 lg:pl-0 lg:border-t border-[#EAE4D7] flex flex-col justify-center">
                  <ul className="text-xs text-[#45433D] space-y-2.5">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#2E7D32]" />
                      <span>Unique user vs repeat spam checks</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#2E7D32]" />
                      <span>Timestamp temporal validation</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#2E7D32]" />
                      <span>Base64 local storage persistence</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Evidence Graph Preview Section */}
      <section id="evidence-graph" ref={graphRef} className="py-20 border-t border-[#C4BEB2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="EVIDENCE GRAPH PREVIEW"
            title="The Evidence Graph Relationship"
            description="Explore the connected pipeline: Original feedback → Issue cluster → Recommended action. Small connected nodes with understandable lineage."
          />

          <Card className="p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-[#EAE4D7] gap-3">
              <div className="flex items-center gap-2 text-xs text-[#625D54] font-semibold">
                <Workflow className="w-4 h-4 text-[#71849A]" />
                <span>RELATIONSHIP: ORIGINAL FEEDBACK &rarr; ISSUE CLUSTER &rarr; RECOMMENDED ACTION</span>
              </div>
              <Badge variant="slate" size="sm">
                Lineage Architecture
              </Badge>
            </div>

            {/* 3 Connected Nodes */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative">
              {/* Node 1: Original Feedback */}
              <div
                onClick={() => setActiveNode('feedback')}
                className={`p-5 rounded-xl border transition-all cursor-pointer ${
                  activeNode === 'feedback'
                    ? 'bg-[#FAF7F2] border-[#71849A] shadow-md'
                    : 'bg-[#ECECEC] border-[#C4BEB2] hover:border-[#71849A]'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#71849A]" />
                    <span className="text-xs text-[#35332F] font-semibold uppercase">
                      1. Original Feedback
                    </span>
                  </div>
                  <Badge variant="neutral" size="sm">Source Quotes</Badge>
                </div>
                <div className="space-y-2 text-xs text-[#45433D]">
                  <div className="p-2.5 rounded bg-[#FAF7F2] border border-[#C4BEB2]">
                    &ldquo;Checkout crashes every time on Safari mobile when tapping Apple Pay.&rdquo;
                  </div>
                  <div className="p-2.5 rounded bg-[#FAF7F2] border border-[#C4BEB2]">
                    &ldquo;Payment screen keeps spinning, Apple Pay fails.&rdquo;
                  </div>
                  <div className="p-2.5 rounded bg-[#FAF7F2] border border-[#C4BEB2] text-[#6B655B]">
                    &ldquo;Cannot complete purchase on iPhone Safari.&rdquo;
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-[#EAE4D7] text-[11px] text-[#6B655B] font-medium">
                  &bull; Linked to 34 customer quotes in dataset
                </div>
              </div>

              {/* Node 2: Issue Cluster */}
              <div
                onClick={() => setActiveNode('cluster')}
                className={`p-5 rounded-xl border transition-all cursor-pointer ${
                  activeNode === 'cluster'
                    ? 'bg-[#FAF7F2] border-[#71849A] shadow-md'
                    : 'bg-[#ECECEC] border-[#C4BEB2] hover:border-[#71849A]'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#71849A]" />
                    <span className="text-xs text-[#35332F] font-semibold uppercase">
                      2. Issue Cluster
                    </span>
                  </div>
                  <Badge variant="slate" size="sm">PF-101</Badge>
                </div>
                <h4 className="text-sm font-semibold text-[#35332F] mb-1">
                  Mobile Checkout &amp; Payment Flow
                </h4>
                <p className="text-xs text-[#625D54] leading-relaxed mb-4">
                  High-frequency friction localized to iOS WebKit session handshakes during Apple Pay initialization.
                </p>
                <div className="grid grid-cols-2 gap-2 text-[11px] bg-[#FAF7F2] p-2.5 rounded border border-[#C4BEB2]">
                  <div>
                    <span className="text-[#6B655B]">Category: </span>
                    <span className="text-[#35332F] font-bold">Product</span>
                  </div>
                  <div>
                    <span className="text-[#6B655B]">Severity: </span>
                    <span className="text-[#C62828] font-bold">Critical</span>
                  </div>
                </div>
              </div>

              {/* Node 3: Recommended Action */}
              <div
                onClick={() => setActiveNode('action')}
                className={`p-5 rounded-xl border transition-all cursor-pointer ${
                  activeNode === 'action'
                    ? 'bg-[#FAF7F2] border-[#71849A] shadow-md'
                    : 'bg-[#ECECEC] border-[#C4BEB2] hover:border-[#71849A]'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#2E7D32]" />
                    <span className="text-xs text-[#35332F] font-semibold uppercase">
                      3. Recommended Action
                    </span>
                  </div>
                  <Badge variant="danger" size="sm">Priority 1</Badge>
                </div>
                <h4 className="text-sm font-semibold text-[#35332F] mb-1">
                  Refactor WebKit Session Callback
                </h4>
                <p className="text-xs text-[#625D54] leading-relaxed mb-4">
                  Add async timeout catch and render fallback payment modal instead of freezing checkout flow.
                </p>
                <div className="text-[11px] text-[#2E7D32] bg-[#EAF3EA] p-2.5 rounded border border-[#C8E6C9] font-medium">
                  &check; Estimated friction reduction: ~18-24%
                </div>
              </div>
            </div>

            {/* Lineage Info Note */}
            <div className="mt-6 pt-4 border-t border-[#EAE4D7] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#625D54]">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-[#71849A] shrink-0" />
                <span>
                  Every recommendation is bidirectionally linked. Click any node in the dashboard to trace source evidence.
                </span>
              </div>
              <span className="text-[11px] text-[#6B655B] font-medium">
                Pipeline status: Active stream ready
              </span>
            </div>
          </Card>
        </div>
      </section>

      {/* Trust & Data Quality Section */}
      <section id="trust" className="py-20 border-t border-[#C4BEB2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="TRUST & DATA QUALITY"
            title="Rigorous standards against unsupported conclusions"
            description="Evidalis distinguishes raw feedback rows from unique customer patterns and refuses to claim trends without data integrity."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-lg bg-[#FAF7F2] border border-[#C4BEB2] text-[#71849A] shrink-0">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-semibold text-[#35332F] mb-1">
                    Raw Rows vs. Unique Text Patterns
                  </h4>
                  <p className="text-xs sm:text-sm text-[#625D54] leading-relaxed">
                    Repeated text does not prove multiple unique customers. An automated survey script or single repetitive submitter
                    logging 50 identical complaints represents 1 unique issue pattern—not 50 independent customers.
                    Evidalis explicitly separates raw row counts from unique customer signatures.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-lg bg-[#FAF7F2] border border-[#C4BEB2] text-[#71849A] shrink-0">
                  <Activity className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-semibold text-[#35332F] mb-1">
                    Timestamp &amp; Trend Rigor
                  </h4>
                  <p className="text-xs sm:text-sm text-[#625D54] leading-relaxed">
                    Historical trends require valid timestamps. If uploaded feedback lacks timestamp metadata or contains malformed dates,
                    Evidalis explicitly notes that velocity assertions cannot be made.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-lg bg-[#FAF7F2] border border-[#C4BEB2] text-[#2E7D32] shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-semibold text-[#35332F] mb-1">
                    Direct Quote Traceability
                  </h4>
                  <p className="text-xs sm:text-sm text-[#625D54] leading-relaxed">
                    Every cluster and action displays the exact customer quotes that substantiate it.
                    You can audit the evidence behind each finding instead of accepting black-box claims.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-lg bg-[#FAF7F2] border border-[#C4BEB2] text-[#78846A] shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-semibold text-[#35332F] mb-1">
                    Transparent Limitations Disclosure
                  </h4>
                  <p className="text-xs sm:text-sm text-[#625D54] leading-relaxed">
                    Feedback that does not meet statistical clustering thresholds remains clearly marked as &ldquo;Unclustered&rdquo;
                    rather than being forced into inaccurate categories.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Final Call to Action Section */}
      <section ref={bottomRef} className="py-20 border-t border-[#C4BEB2] bg-hero-radial">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Card className="p-8 sm:p-14 relative overflow-hidden">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#ECECEC] border border-[#C4BEB2] text-[#425B72] font-semibold text-xs mb-6">
              <Sparkles className="w-3.5 h-3.5 text-[#71849A]" />
              <span>BUILD BATTLE 2026 EDITION</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#35332F] mb-4">
              Enter the Evidalis Workspace
            </h2>

            <p className="text-sm sm:text-base text-[#625D54] max-w-xl mx-auto mb-8 leading-relaxed">
              Launch the intelligence workspace to analyze feedback datasets, inspect evidence-backed clusters, and dispatch actionable resolutions.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                variant="primary"
                size="lg"
                iconRight={ArrowRight}
                onClick={handleGoToDashboard}
                className="w-full sm:w-auto"
              >
                Launch Evidalis
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 border-t border-[#C4BEB2] bg-[#FAF7F2] text-xs text-[#6B655B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <BrandLogo size="sm" markOnly={false} />
            <span className="font-medium text-[#716A60]">&copy; 2026 Evidalis &bull; <em>Every pattern tells a story.</em></span>
          </div>

          {/* AkDev Signature Accent */}
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 flex-wrap justify-center md:justify-end">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 text-[11px] font-medium shadow-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>AI-Optimized &bull; All code. No clutter.</span>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="https://akdevme.netlify.app"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[#35332F] hover:text-[#425B72] font-bold transition-colors group cursor-pointer hover:underline"
                title="Ak Dev UIX Portfolio • คภкเՇ ɠยקՇค"
              >
                <span>AkDev</span>
                <span className="text-[#6B655B] font-normal tracking-wide">(คภкเՇ ɠยקՇค)</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#71849A] group-hover:text-[#425B72] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              <span className="text-[#C4BEB2]">&bull;</span>

              <a
                href="https://instagram.com/ak.dev_"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#6B655B] hover:text-[#E1306C] font-medium transition-colors"
                title="Instagram @ak.dev_"
              >
                @ak.dev_
              </a>

              <span className="text-[#C4BEB2]">&bull;</span>

              <a
                href="https://github.com/akdevme"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#6B655B] hover:text-[#181717] font-medium transition-colors"
                title="GitHub @akdevme"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default IntroPage;
