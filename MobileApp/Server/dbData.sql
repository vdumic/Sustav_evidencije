INSERT INTO student (ime, prezime, mat_broj, smjer)
VALUES ('Ana', 'Anić', '111-2023', 'Računarstvo'),
('Ivan', 'Ivić', '112-2023', 'Računarstvo');

INSERT INTO predmet (naziv)
VALUES ('Ugradbeni računalni sustavi'),
('Paralelno programiranje'),
('Multimedijski sustavi');

INSERT INTO nastava (predmet_id, naziv, dan, termin, broj_termina, predavaonica)
VALUES (1, 'Predavanja', 'petak', '11:15 13:00', 13, 'A101'),
(2, 'Predavanja', 'srijeda', '14:15 16:00', 13, 'B401'),
(2, 'Laboratorijske vježbe', 'četvrtak', '16:00 17:30', 9, 'B525'),
(3, 'Predavanja', 'petak', '13:15 15:00', 13, 'A101'),
(3, 'Laboratorijske vježbe', 'petak', '17:00 18:30', 10, 'B325');

INSERT INTO profesor (ime, prezime, mat_broj)
VALUES ('Sven', 'Gotovac', '1234'),
('Damir', 'Krstinić', '2345'),
('Mladen', 'Russo', '3456');

INSERT INTO predaje (profesor_id, nastava_id)
VALUES (1, 1), (2, 2), (2, 3), (3, 4), (3, 5);

INSERT INTO upisan (student_id, predmet_id)
VALUES (1, 1), (1, 2), (1, 3), (2, 1), (2, 3);

