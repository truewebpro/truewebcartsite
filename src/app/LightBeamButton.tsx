"use client";

import React from "react";

interface LightBeamButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

export function LightBeamButton({ children, onClick, className = "", disabled = false }: LightBeamButtonProps) {
  return (
    <>
      <style>{`
        @property --lb-gradient-angle {
          syntax: "<angle>";
          initial-value: 0deg;
          inherits: false;
        }

        .light-beam-btn {
          --lb-gradient-angle: 0deg;
          position: relative;
          overflow: hidden;
          border-radius: 9999px;
          padding: 14px 32px;
          font-size: 16px;
          line-height: 1.2;
          font-weight: 500;
          color: #ffffff;
          background:
            linear-gradient(#0D163F, #0D163F) padding-box,
            conic-gradient(
              from calc(var(--lb-gradient-angle) - 0deg),
              transparent 0%,
              #0D163F 5%,
              #DF081A 15%,
              #0D163F 30%,
              transparent 40%,
              transparent 100%
            ) border-box;
          border: 2px solid transparent;
          box-shadow: inset 0 0 0 1px #1a1919;
          outline: none;
          transition: box-shadow 0.3s, transform 0.2s;
          cursor: pointer;
          isolation: isolate;
          font-family: 'Inter', -apple-system, sans-serif;
          z-index: 0;
          animation: lb-border-spin 2.5s linear infinite;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        .light-beam-btn.disabled {
          opacity: 0.5;
          cursor: not-allowed;
          animation-play-state: paused;
        }

        @keyframes lb-border-spin {
          to {
            --lb-gradient-angle: 360deg;
          }
        }

        .light-beam-btn:active:not(.disabled) {
          transform: translateY(1px) scale(0.98);
        }

        .light-beam-btn::before {
          content: '';
          pointer-events: none;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          z-index: 0;
          --size: calc(100% - 6px);
          --position: 2px;
          --space: 4px;
          width: var(--size);
          height: var(--size);
          background: radial-gradient(circle at var(--position) var(--position), white 0.5px, transparent 0) padding-box;
          background-size: var(--space) var(--space);
          background-repeat: space;
          mask-image: conic-gradient(from calc(var(--lb-gradient-angle) + 45deg), black, transparent 10% 90%, black);
          border-radius: inherit;
          opacity: 0.4;
        }

        .light-beam-btn::after {
          content: '';
          pointer-events: none;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          z-index: 1;
          width: 100%;
          aspect-ratio: 1;
          background: linear-gradient(-50deg, transparent, #DF081A, transparent);
          mask-image: radial-gradient(circle at bottom, transparent 40%, black);
          opacity: 0.6;
          animation: lb-shimmer 4s linear infinite;
        }

        .light-beam-btn.disabled::after {
          animation-play-state: paused;
        }

        .light-beam-btn span {
          position: relative;
          z-index: 2;
        }

        @keyframes lb-shimmer {
          to {
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }
      `}</style>

      <button
        className={`light-beam-btn ${disabled ? "disabled" : ""} ${className}`}
        onClick={onClick}
        disabled={disabled}
      >
        <span>{children}</span>
      </button>
    </>
  );
}

export default LightBeamButton;
