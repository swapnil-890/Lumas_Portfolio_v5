import React from 'react';
import { Mail, MessageSquare, Github, ExternalLink } from 'lucide-react';
import { contacts, socials, siteMeta } from '@/data/meta';
import { Card, CardTitle } from '@/components/ui/Card';
import { CopyButton } from '@/components/ui/CopyButton';
import AskLumas from '@/components/AskLumas';
import { Footer } from '@/components/layout/Footer';

export function DispatchSection() {
  const getIcon = (id: string) => {
    switch (id) {
      case 'whatsapp':
        return MessageSquare;
      case 'email-primary':
      case 'email-academic':
      default:
        return Mail;
    }
  };

  return (
    <section id="dispatch" className="scroll-mt-24 mb-16" aria-label="Dispatch and communication">
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-6 select-none">
        <span className="font-mono text-xs text-accent tracking-widest" aria-hidden="true">
          05 //
        </span>
        <h2 className="font-mono text-xs uppercase tracking-widest text-fg-dim font-medium">
          DISPATCH & COMMS
        </h2>
      </div>

      <div className="space-y-6">
        {/* Verified Channels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {contacts.map((contact) => {
            const Icon = getIcon(contact.id);
            return (
              <Card
                key={contact.id}
                as="div"
                className="border border-border bg-surface flex flex-col justify-between transition-all duration-200 hover:border-border-strong p-4 sm:p-5"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-[11px] text-fg-muted uppercase tracking-wider flex items-center gap-1.5">
                      <Icon className="w-3.5 h-3.5 text-accent" aria-hidden="true" />
                      {contact.label}
                    </span>
                    <span className="font-mono text-[10px] text-emerald-400 border border-emerald-500/20 bg-emerald-500/5 px-1.5 py-0.5 rounded">
                      VERIFIED
                    </span>
                  </div>
                  <CardTitle as="h3" className="font-mono text-sm sm:text-base font-medium text-fg break-all">
                    {contact.value}
                  </CardTitle>
                </div>

                <div className="flex items-center gap-2 mt-4 pt-3 border-t border-border">
                  {contact.actionHref && (
                    <a
                      href={contact.actionHref}
                      target={contact.id === 'whatsapp' ? '_blank' : undefined}
                      rel={contact.id === 'whatsapp' ? 'noopener noreferrer' : undefined}
                      className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded border border-border bg-bg/60 text-xs font-mono text-fg-dim hover:text-accent hover:border-accent transition-colors min-h-[44px] flex-1 text-center"
                    >
                      <span>Connect</span>
                      <ExternalLink className="w-3.5 h-3.5 text-fg-muted" aria-hidden="true" />
                    </a>
                  )}
                  {contact.copyable && (
                    <CopyButton value={contact.value} label={contact.label} />
                  )}
                </div>
              </Card>
            );
          })}

          {/* Social Profiles Card */}
          <Card
            as="div"
            className="border border-border bg-surface flex flex-col justify-between transition-all duration-200 hover:border-border-strong p-4 sm:p-5 md:col-span-2"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-[11px] text-fg-muted uppercase tracking-wider flex items-center gap-1.5">
                  <Github className="w-3.5 h-3.5 text-accent" aria-hidden="true" />
                  Source Telemetry & Accounts
                </span>
                <span className="font-mono text-[10px] text-fg-muted">PUBLIC CHANNELS</span>
              </div>
              <CardTitle as="h3" className="text-sm font-semibold text-fg">
                Code Repositories & Engineering Logs
              </CardTitle>
              <p className="text-xs text-fg-dim mt-1">
                Authoritative source-backed profiles for Swapnil Roy ({siteMeta.name}).
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 mt-4 pt-3 border-t border-border">
              {socials.map((social) => (
                <a
                  key={social.id}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded border border-border bg-bg/60 text-xs font-mono text-fg hover:text-accent hover:border-accent transition-colors min-h-[44px]"
                >
                  <Github className="w-4 h-4 text-accent" aria-hidden="true" />
                  <span>{social.label}</span>
                  <span className="text-[11px] text-fg-muted">(@swapnil-890)</span>
                  <ExternalLink className="w-3 h-3 text-fg-muted ml-1" aria-hidden="true" />
                </a>
              ))}
              <span className="text-[11px] font-mono text-fg-muted italic">
                LinkedIn omitted pending verified profile URL.
              </span>
            </div>
          </Card>
        </div>

        {/* Section Interactive Query Terminal */}
        <div className="pt-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-mono text-xs uppercase tracking-widest text-fg-dim font-medium">
              Interactive Query Console
            </h3>
            <span className="font-mono text-[11px] text-fg-muted">Deterministic Offline Knowledge Graph</span>
          </div>
          <AskLumas />
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </section>
  );
}
