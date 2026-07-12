"use client";
import { MotionConfig } from "framer-motion";

/**
 * Faz todas as animações do framer-motion respeitarem a preferência de
 * "reduzir movimento" do sistema operacional (reducedMotion="user").
 * Os filhos continuam sendo server components — são passados via children.
 */
export default function MotionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
