import { expect, test } from "vitest";
import { parseMtgoDeckList } from "./DeckList";

test("parseMtgoDeckList", () => {
  const parsed = parseMtgoDeckList(`1 Aetherize
1 An Offer You Can't Refuse
1 Anticipate
1 Archmage Emeritus
1 Bane's Contingency
1 Baral, Chief of Compliance
1 Blue Sun's Zenith
1 Brainstorm
1 Cancel
1 Chemister's Insight
1 Chrome Host Seedshark
1 Cosmic Epiphany
1 Counterspell
1 Curiosity Crafter
1 Curse of the Swine
1 Deekah, Fractal Theorist
1 Deep Analysis
1 Defabricate
1 Deliberate
1 Dig Through Time
1 Disdainful Stroke
1 Dispel
1 Dissipate
1 Dissolve
1 Distant Melody
1 Essence Scatter
1 Extraplanar Lens
1 Fierce Guardianship
1 Frantic Search
1 Gale, Waterdeep Prodigy
1 Gauntlet of Power
1 Guile
1 Haughty Djinn
1 Impulse
28 Island
1 Isochron Scepter
1 Jace's Sanctum
1 Mana Leak
1 Metallurgic Summonings
1 Mission Briefing
1 Murmuring Mystic
1 Mystic Sanctuary
1 Naiad of Hidden Coves
1 Narset's Reversal
1 Negate
1 Opt
1 Ponder
1 Pongify
1 Portent
1 Preordain
1 Rapid Hybridization
1 Ravenform
1 Reality Shift
1 Resculpt
1 Rewind
1 Rhystic Study
1 Sapphire Medallion
1 Saw It Coming
1 Sea Gate Restoration
1 Serum Visions
1 Shark Typhoon
1 Snap
1 Sol Ring
1 Supreme Will
1 Swan Song
1 Teferi's Ageless Insight
1 Think Twice
1 Thirst for Discovery
1 Transcendent Message
1 Unwind
1 Wavebreak Hippocamp
1 Wizard's Retort

1 Talrand, Sky Summoner`);

  expect(parsed.maindeck.reduce((acc, card) => acc + card.count, 0)).toBe(99);
  expect(parsed.sideboard.length).toBe(1);

  const islandEntry = parsed.maindeck.find((card) => card.name === "Island");
  expect(islandEntry?.count).toBe(28);

  expect(parsed.sideboard[0].name).toBe("Talrand, Sky Summoner");
  expect(parsed.sideboard[0].count).toBe(1);
});
