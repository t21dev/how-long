export function getFunFact(totalDays: number, direction: 'past' | 'future' | 'same'): string {
  if (direction === 'same') return "That's today!";

  const suffix = direction === 'past' ? 'ago' : 'from now';
  const pastVerb = direction === 'past';

  const facts: string[] = [];

  // ── Short durations (< 1 week) ──────────────────────────────
  if (totalDays <= 3) {
    facts.push(`That's just ${totalDays * 24} hours ${suffix}`);
  }

  if (totalDays >= 1 && totalDays < 14) {
    facts.push(`That's about ${(totalDays * 24).toLocaleString()} hours — or ${(totalDays * 1440).toLocaleString()} minutes`);
  }

  // ── Body & Biology ──────────────────────────────────────────
  if (totalDays >= 7) {
    const heartbeats = totalDays * 100_000;
    facts.push(`~${formatLargeNumber(heartbeats)} heartbeats ${suffix}`);
  }

  if (totalDays >= 7) {
    const breaths = totalDays * 22_000;
    facts.push(`You ${pastVerb ? 'took' : 'will take'} ~${formatLargeNumber(breaths)} breaths in that time`);
  }

  if (totalDays >= 14) {
    const blinks = totalDays * 15_000;
    facts.push(`~${formatLargeNumber(blinks)} blinks in that span`);
  }

  if (totalDays >= 30) {
    const hairCm = (totalDays * 0.33) / 10;
    if (hairCm >= 1) {
      facts.push(`Your hair ${pastVerb ? 'grew' : 'will grow'} ~${hairCm.toFixed(1)} cm in that time`);
    }
  }

  if (totalDays >= 90) {
    const nailMm = totalDays * 0.1;
    facts.push(`Your fingernails ${pastVerb ? 'grew' : 'will grow'} ~${nailMm.toFixed(1)} mm`);
  }

  if (totalDays >= 30) {
    const cells = totalDays * 330_000_000_000;
    facts.push(`Your body ${pastVerb ? 'produced' : 'will produce'} ~${formatLargeNumber(cells)} new cells`);
  }

  if (totalDays >= 14) {
    const circuits = totalDays * 2_000;
    facts.push(`Your blood ${pastVerb ? 'circulated' : 'will circulate'} through your body ~${formatLargeNumber(circuits)} times`);
  }

  if (totalDays >= 7) {
    const dreams = Math.round(totalDays * 4.5);
    facts.push(`You may have ${pastVerb ? 'had' : ''} ~${formatLargeNumber(dreams)} dreams${pastVerb ? '' : ' by then'}`);
  }

  // ── Baby milestones ─────────────────────────────────────────
  if (totalDays >= 270 && totalDays < 450) {
    facts.push(
      pastVerb
        ? 'A baby born then would now be taking their first steps'
        : 'A baby born today would be walking by then'
    );
  }

  // ── Astronomy & Space ───────────────────────────────────────
  if (totalDays >= 365) {
    const orbits = (totalDays / 365.25).toFixed(1);
    facts.push(`Earth completed ${orbits} orbits around the Sun in that time`);
  }

  if (totalDays >= 14) {
    const earthKm = totalDays * 2_573_000;
    facts.push(`Earth ${pastVerb ? 'traveled' : 'will travel'} ~${formatLargeNumber(earthKm)} km through its orbit`);
  }

  if (totalDays >= 345) {
    const marsOrbits = totalDays / 687;
    facts.push(`Mars completed ${marsOrbits.toFixed(1)} orbits around the Sun`);
  }

  if (totalDays >= 30) {
    const moonCycles = totalDays / 29.53;
    facts.push(`${Math.round(moonCycles)} full moon${Math.round(moonCycles) === 1 ? '' : 's'} ${pastVerb ? 'passed' : 'will pass'} in that time`);
  }

  if (totalDays >= 7) {
    const issOrbits = totalDays * 15.5;
    facts.push(`The ISS ${pastVerb ? 'completed' : 'will complete'} ~${formatLargeNumber(Math.round(issOrbits))} orbits of Earth`);
  }

  if (totalDays >= 30) {
    const solarKm = totalDays * 19_900_000;
    facts.push(`Our solar system ${pastVerb ? 'traveled' : 'will travel'} ~${formatLargeNumber(solarKm)} km through the Milky Way`);
  }

  if (totalDays >= 1000) {
    const lightKm = totalDays * 25_902_068_371;
    facts.push(`Light traveled ~${formatLargeNumber(lightKm)} km in that time`);
  }

  if (totalDays >= 365) {
    const stars = totalDays / 52;
    if (stars >= 1) {
      facts.push(`~${Math.round(stars)} new star${Math.round(stars) === 1 ? ' was' : 's were'} born in our galaxy`);
    }
  }

  // ── Earth rotations ─────────────────────────────────────────
  if (totalDays >= 14 && totalDays < 365) {
    facts.push(`The Earth rotated ${totalDays.toLocaleString()} times in that span`);
  }

  // ── Nature ──────────────────────────────────────────────────
  if (totalDays >= 7) {
    const wingBeats = totalDays * 2_289_600;
    facts.push(`A hummingbird would flap its wings ~${formatLargeNumber(wingBeats)} times`);
  }

  if (totalDays >= 30) {
    const snailKm = totalDays * 0.025;
    facts.push(`A snail could ${pastVerb ? 'have traveled' : 'travel'} ~${snailKm.toFixed(1)} km at top speed`);
  }

  if (totalDays >= 14) {
    const lightning = totalDays * 8_000_000;
    facts.push(`~${formatLargeNumber(lightning)} lightning bolts ${pastVerb ? 'struck' : 'will strike'} Earth`);
  }

  if (totalDays >= 90) {
    const driftMm = totalDays * 0.04;
    facts.push(`The continents drifted ~${driftMm.toFixed(1)} mm apart`);
  }

  // ── Pop culture & everyday ──────────────────────────────────
  if (totalDays >= 7) {
    const songs = totalDays * 411;
    facts.push(`You could listen to ~${formatLargeNumber(songs)} songs non-stop`);
  }

  if (totalDays >= 30) {
    const books = totalDays * 3;
    facts.push(`A speed reader could finish ~${formatLargeNumber(books)} books in that time`);
  }

  if (totalDays >= 7) {
    const emails = totalDays * 362_000_000_000;
    facts.push(`~${formatLargeNumber(emails)} emails ${pastVerb ? 'were' : 'will be'} sent worldwide`);
  }

  if (totalDays >= 7) {
    const searches = totalDays * 8_500_000_000;
    facts.push(`~${formatLargeNumber(searches)} Google searches ${pastVerb ? 'happened' : 'will happen'}`);
  }

  if (totalDays >= 14) {
    const photos = totalDays * 5_300_000_000;
    facts.push(`~${formatLargeNumber(photos)} photos ${pastVerb ? 'were' : 'will be'} taken worldwide`);
  }

  // ── Fallback ────────────────────────────────────────────────
  if (facts.length === 0) {
    const heartbeats = totalDays * 100_000;
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
