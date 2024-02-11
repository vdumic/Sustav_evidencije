CREATE TABLE student(
    student_id SERIAL PRIMARY KEY,
    ime varchar,
    prezime varchar,
    mat_broj varchar,
    smjer varchar
);

CREATE TABLE predmet(
    predmet_id SERIAL PRIMARY KEY,
    naziv varchar
);

CREATE TABLE nastava(
    nastava_id SERIAL PRIMARY KEY,
    predmet_id INT references predmet(predmet_id),
    naziv varchar,
    dan varchar,
    termin varchar,
    broj_termina INT,
    predavaonica varchar
);

CREATE TABLE profesor(
    profesor_id SERIAL PRIMARY KEY,
    ime varchar,
    prezime varchar,
    mat_broj varchar
);

CREATE TABLE predaje(
    predaje_id SERIAL PRIMARY KEY,
    profesor_id INT references profesor(profesor_id),
    nastava_id INT references nastava(nastava_id)
);

CREATE TABLE upisan(
    upisan_id SERIAL PRIMARY KEY,
    student_id INT references student(student_id),
    predmet_id INT references predmet(predmet_id)
);

CREATE TABLE predavanje(
    predavanje_id SERIAL PRIMARY KEY,
    predaje_id INT references predaje(predaje_id),
    datum timestamp DEFAULT now(),
    SSID varchar,
    aktivno boolean NOT NULL DEFAULT TRUE
);

CREATE TABLE prisutan(
    student_id INT references student(student_id),
    predavanje_id INT references predavanje(predavanje_id),
    nastava_id INT references nastava(nastava_id),
    mobile_id varchar,
    prisutan boolean NOT NULL,
    PRIMARY KEY(student_id, predavanje_id)
);

