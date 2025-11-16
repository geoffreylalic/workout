UPDATE "Exercice" e
SET "position" = sub1.rn
FROM (
  SELECT id, ROW_NUMBER() OVER (PARTITION BY "workoutId") as rn
  FROM "Exercice"
) sub1
WHERE e.id = sub1.id;

UPDATE "Set" s
SET "position" = sub2.rn
FROM (
  SELECT id, ROW_NUMBER() OVER (PARTITION BY "exerciceId") as rn
  FROM "Set"
) sub2
WHERE s.id = sub2.id;
