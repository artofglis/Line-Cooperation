-- Startinnhold for forsiden, slik at redigeringsgrensesnittet ikke starter tomt.
-- Trygt å kjøre på nytt (INSERT OR IGNORE), men kjøres normalt kun én gang per ny kunde.

INSERT OR IGNORE INTO sections (id, page, type, position, visible, content) VALUES
  (1, 'hjem', 'hero', 0, 1, '{"quote":"[Kort sitat eller leveregel som fanger kjernen i tilbudet]","lede":"[Kort undertekst — hva tilbyr du, og for hvem]","ctaLabel":"Send forespørsel","ctaHref":"#kontakt","imageKey":""}'),
  (2, 'hjem', 'text', 1, 1, '{"eyebrow":"Om","title":"[Overskrift]","body":"[Kort avsnitt om deg eller tjenesten]"}'),
  (3, 'hjem', 'image_text', 2, 1, '{"eyebrow":"","title":"[Overskrift]","body":"[Kort avsnitt]","imageKey":"","imagePosition":"left"}');

INSERT OR IGNORE INTO settings (key, value) VALUES
  ('theme', '1'),
  ('tilbud_visible', '1');
