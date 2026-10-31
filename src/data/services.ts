import { Service } from "@/types";

// TODO(client): stock placeholder photos — replace with the studio's own (incl. a real cupping shot).
const unsplash = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=900&auto=format&fit=crop&q=80`;

// TODO(client): placeholder prices in EUR, approved as placeholders — confirm before launch.
export const services: Service[] = [
  { id: "classic", prices: { 30: 25, 60: 45, 90: 65 }, image: unsplash("1544161515-4ab6ce6db874") },
  { id: "sports", prices: { 30: 30, 60: 50, 90: 70 }, image: unsplash("1611073615830-9f76902c10fe") },
  { id: "therapeutic", prices: { 30: 30, 60: 50, 90: 70 }, image: unsplash("1519824145371-296894a0daa9") },
  { id: "cupping", prices: { 30: 25, 60: 45 }, image: unsplash("1519823551278-64ac92734fb1") },
  { id: "triggerPoint", prices: { 30: 30, 60: 50 }, image: unsplash("1598901986949-f593ff2a31a6") },
];
