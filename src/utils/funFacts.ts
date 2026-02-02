export function getFunFact(totalDays: number, direction: 'past' | 'future' | 'same'): string {
  if (direction === 'same') return "That's today!";

  const suffix = direction === 'past' ? 'ago' : 'from now';
  const heartbeats = totalDays * 24 * 60 * 72;
  const marsOrbits = totalDays / 687;
  const moonCycles = totalDays / 29.5;

  const facts: string[] = [];

  if (totalDays <= 3) {
    facts.push(`That's just ${totalDays * 24} hours ${suffix}`);
  }

  if (totalDays >= 4 && totalDays < 14) {
    facts.push(`That's about ${totalDays * 24} hours — or ${totalDays * 1440} minutes`);
  }

  if (totalDays >= 270 && totalDays < 450) {
    facts.push(
      direction === 'past'
        ? "A baby born then would now be taking their first steps"
        : "A baby born today would be walking by then"
    );
  }

  if (totalDays >= 365) {
    const orbits = (totalDays / 365.25).toFixed(1);
    facts.push(`Earth completed ${orbits} orbits around the Sun in that time`);
  }

  if (marsOrbits >= 0.5) {
    facts.push(`Mars completed ${marsOrbits.toFixed(1)} orbits around the Sun`);
  }

  if (totalDays >= 30) {
    facts.push(`${Math.round(moonCycles)} full moons have ${direction === 'past' ? 'passed' : 'yet to pass'}`);
  }

  if (totalDays >= 7) {
    facts.push(`~${formatLargeNumber(heartbeats)} heartbeats ${suffix}`);
  }

  if (totalDays >= 14 && totalDays < 365) {
    facts.push(`The Earth rotated ${totalDays.toLocaleString()} times in that span`);
  }

  if (totalDays >= 1000) {
    const lightSeconds = (totalDays * 86400 * 299792.458).toFixed(0);
    facts.push(`Light traveled ~${formatLargeNumber(Number(lightSeconds))} km in that time`);
  }

  if (facts.length === 0) {
    facts.push(`~${formatLargeNumber(heartbeats)} heartbeats ${suffix}`);
  }

  // Deterministic selection based on totalDays
  return facts[totalDays % facts.length];
}

function formatLargeNumber(n: number): string {
  if (n >= 1_000_000_000_000) return (n / 1_000_000_000_000).toFixed(1) + ' trillion';
  if (n >= 1_000_000_000) return (n / 1_000_000_000).toFixed(1) + ' billion';
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + ' million';
  if (n >= 1_000) return Math.round(n / 1_000).toLocaleString() + 'K';
  return n.toLocaleString();
}
