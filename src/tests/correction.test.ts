import { describe, it, expect } from "vitest";
import { correct, normalize, wordDiff } from "../correction";
describe("corrector determinista", () => {
  it("normaliza espacios, Unicode, puntuación y capitalización", () => {
    expect(correct("  ICH  heiße Anna!! ", ["Ich heiße Anna."]).status).toBe(
      "correct",
    );
    expect(normalize("scho\u0308n")).toBe("schön");
  });
  it("acepta solo variantes preparadas", () => {
    expect(
      correct("Ich gehe heute zum Supermarkt.", [
        "Heute gehe ich zum Supermarkt.",
        "Ich gehe heute zum Supermarkt.",
      ]).status,
    ).toBe("correct");
    expect(
      correct("Ich heute gehe zum Supermarkt.", [
        "Heute gehe ich zum Supermarkt.",
      ]).status,
    ).toBe("incorrect");
  });
  it.each([
    ["der", "die"],
    ["das", "der"],
    ["ein", "eine"],
    ["nicht", "nichts"],
    ["schon", "schön"],
    ["hat", "hast"],
    ["Ich lerne.", "Ich lernt."],
    ["Wir wohnen.", "Wir wohnt."],
    ["Die Mütter kommen.", "Die Mutter kommen."],
    ["Hosen", "Rosen"],
    ["Die Tische sind hier.", "Die Tasche sind hier."],
    ["Das Fenster ist hier.", "Das finster ist hier."],
  ])("rechaza cambio de significado/gramática %s / %s", (a, b) =>
    expect(correct(a, [b]).status).toBe("incorrect"),
  );
  it("acepta una errata interna larga y una transposición conservadora", () => {
    expect(
      correct("Der Supermakrt ist hier.", ["Der Supermarkt ist hier."]).status,
    ).toBe("typo");
    expect(
      correct("Das Fruühstück ist fertig.", ["Das Frühstück ist fertig."])
        .status,
    ).toBe("typo");
  });
  it("rechaza más de una errata, palabras omitidas y añadidas", () => {
    expect(
      correct("Der Supermakrt ist geshlossen.", [
        "Der Supermarkt ist geschlossen.",
      ]).status,
    ).toBe("incorrect");
    expect(correct("Ich Kaffee.", ["Ich trinke Kaffee."]).status).toBe(
      "incorrect",
    );
    expect(
      correct("Ich trinke nicht Kaffee.", ["Ich trinke Kaffee."]).status,
    ).toBe("incorrect");
  });
  it("no elimina diéresis ni transforma ß globalmente", () => {
    expect(correct("schon", ["schön"]).status).toBe("incorrect");
    expect(correct("Masse", ["Maße"]).status).toBe("incorrect");
    expect(
      correct("Ich heisse Anna.", ["Ich heiße Anna."], {
        keyboardVariants: ["Ich heisse Anna."],
      }).status,
    ).toBe("correct");
  });
  it("reconoce el límite del vocabulario conocido", () => {
    expect(
      correct("Das ist eine Rechnung.", ["Das ist eine Richtung."], {
        lexicon: new Set(["rechnung"]),
      }).status,
    ).toBe("incorrect");
  });
  it("respeta ejercicios ortográficos estrictos", () => {
    expect(correct("berlin", ["Berlin"], { caseSensitive: true }).status).toBe(
      "incorrect",
    );
  });
  it("muestra omisiones y adiciones por palabra", () => {
    expect(
      wordDiff("Ich Kaffee.", "Ich trinke Kaffee.").some(
        (x) => x.kind === "missing" && x.expected === "trinke",
      ),
    ).toBe(true);
    expect(
      wordDiff("Ich trinke gern Kaffee.", "Ich trinke Kaffee.").some(
        (x) => x.kind === "added" && x.actual === "gern",
      ),
    ).toBe(true);
  });
});
