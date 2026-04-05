import type { ComposeService, ComposeSpec } from "../../shared/compose-types.js";

function indent(lines: readonly string[], spaces: number): string[] {
  return lines.map((line) => `${" ".repeat(spaces)}${line}`);
}

function renderService(service: ComposeService): string[] {
  const lines = [`${service.name}:`];

  if (service.image) {
    lines.push(...indent([`image: ${service.image}`], 2));
  }

  if (service.buildContext) {
    lines.push(...indent([`build: ${service.buildContext}`], 2));
  }

  if (service.command) {
    lines.push(...indent([`command: [${service.command.map((part) => `"${part}"`).join(", ")}]`], 2));
  }

  if (service.ports?.length) {
    lines.push(...indent(["ports:"], 2));
    lines.push(...indent(service.ports.map((port) => `- "${port}"`), 4));
  }

  if (service.environment && Object.keys(service.environment).length > 0) {
    lines.push(...indent(["environment:"], 2));
    lines.push(...indent(Object.entries(service.environment).map(([key, value]) => `${key}: "${value}"`), 4));
  }

  if (service.dependsOn?.length) {
    lines.push(...indent(["depends_on:"], 2));
    lines.push(...indent(service.dependsOn.map((dependency) => `- ${dependency}`), 4));
  }

  if (service.volumes?.length) {
    lines.push(...indent(["volumes:"], 2));
    lines.push(...indent(service.volumes.map((volume) => `- ${volume}`), 4));
  }

  if (service.networks?.length) {
    lines.push(...indent(["networks:"], 2));
    lines.push(...indent(service.networks.map((network) => `- ${network}`), 4));
  }

  return lines;
}

export function renderCompose(spec: ComposeSpec): string {
  const lines = ["services:"];

  for (const service of spec.services) {
    lines.push(...indent(renderService(service), 2));
  }

  if (spec.namedVolumes?.length) {
    lines.push("volumes:");
    lines.push(...indent(spec.namedVolumes.map((volume) => `${volume}: {}`), 2));
  }

  if (spec.networks?.length) {
    lines.push("networks:");
    lines.push(...indent(spec.networks.map((network) => `${network}: {}`), 2));
  }

  return lines.join("\n");
}
