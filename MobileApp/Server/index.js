const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const bodyParser = require("body-parser");

app.use(cors());
app.use(express.json());

app.listen(5000, () => {
  console.log("Server has started on port 5000");
});

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

// Dohvati sve predmete studenta
app.get("/predmeti_studenta/:mat_broj", async (req, res) => {
  try {
    const { mat_broj } = req.params;
    const predmeti = await pool.query(
      "SELECT predmet.naziv, predmet.predmet_id AS id FROM predmet JOIN upisan ON upisan.predmet_id = predmet.predmet_id JOIN student ON student.student_id = upisan.student_id WHERE student.mat_broj = $1",
      [mat_broj]
    );

    res.json(predmeti.rows);
  } catch {
    console.error(err.message);
  }
});

// Dohvati sve predmete profesora za određeni dan u tjednu
app.get("/predmeti_profesora/:mat_broj", async (req, res) => {
  try {
    const { mat_broj } = req.params;
    const datum = new Date();
    let redniBroj = datum.getDay();
    let dan;

    switch (redniBroj) {
      case 1:
        dan = "ponedjeljak";
        break;
      case 2:
        dan = "utorak";
        break;
      case 3:
        dan = "srijeda";
        break;
      case 4:
        dan = "četvrtak";
        break;
      case 5:
        dan = "petak";
        break;
    }

    const predmeti = await pool.query(
      "SELECT predmet.naziv AS predmet, nastava.predavaonica, nastava.naziv AS nastava, nastava.termin, nastava.nastava_id FROM predmet JOIN nastava ON predmet.predmet_id = nastava.predmet_id JOIN predaje ON predaje.nastava_id = nastava.nastava_id JOIN profesor ON profesor.profesor_id = predaje.profesor_id WHERE profesor.mat_broj = $1 AND nastava.dan = $2",
      [mat_broj, dan]
    );
    res.json(predmeti.rows);
  } catch {
    console.error(err.message);
  }
});

// Kreiraj novo predavanje
app.post("/predavanje", async (req, res) => {
  try {
    const { mat_broj, nastava_id, bssid } = req.body;
    const nastava = await pool.query(
      "SELECT predaje_id FROM predaje JOIN profesor ON profesor.profesor_id = predaje.profesor_id JOIN nastava ON nastava.nastava_id = predaje.nastava_id WHERE profesor.mat_broj = $1 AND nastava.nastava_id = $2",
      [mat_broj, nastava_id]
    );

    await pool.query(
      "INSERT INTO predavanje (predaje_id, ssid) VALUES ($1, $2)",
      [nastava.rows[0].predaje_id, bssid]
    );

    res.json("Aktivirano je novo predavanje!");
  } catch {
    console.error(err.message);
  }
});

// Prebaci predavanje u neaktivno
app.put("/neaktivno_predavanje", async (req, res) => {
  try {
    const { predavanje_id } = req.body;
    await pool.query(
      "UPDATE predavanje SET aktivno = 'false' WHERE predavanje_id = $1",
      [predavanje_id]
    );

    res.json("Predavanje više nije aktivno!");
  } catch {
    console.error(err.message);
  }
});

// Dohvati trenutno aktivno predavanje
app.get("/aktivno_predavanje/:bssid", async (req, res) => {
  try {
    const bssid = req.params.bssid;
    const predavanje = await pool.query(
      "SELECT predmet.naziv AS predmet, nastava.naziv AS nastava, termin, predavaonica, predavanje.predavanje_id FROM predmet JOIN nastava ON nastava.predmet_id = predmet.predmet_id JOIN predaje ON predaje.nastava_id = nastava.nastava_id JOIN predavanje ON predavanje.predaje_id = predaje.predaje_id WHERE predavanje.ssid = $1 AND predavanje.aktivno = 't'",
      [bssid]
    );

    const predavanje_id = await pool.query(
      "SELECT predavanje_id FROM predavanje WHERE ssid = $1 AND aktivno = 't'",
      [bssid]
    );

    res.json({
      predmet: predavanje.rows[0].predmet,
      nastava: predavanje.rows[0].nastava,
      termin: predavanje.rows[0].termin,
      predavaonica: predavanje.rows[0].predavaonica,
      predavanje_id: predavanje_id.rows[0].predavanje_id,
    });
  } catch {
    console.error(err.message);
  }
});

// Dodaj studentu evidenciju prisutnosti
app.post("/dodaj_prisutnost", async (req, res) => {
  try {
    const { mat_broj, predavanje_id, mobile_id, bssid } = req.body;

    const bssid_predavanje = await pool.query(
      "SELECT ssid FROM predavanje WHERE predavanje_id = $1",
      [predavanje_id]
    );

    if (bssid_predavanje.rows[0].ssid == bssid) {
      const proveri_jedinstvenost = await pool.query(
        "SELECT EXISTS (SELECT * FROM prisutan WHERE mobile_id = $1)",
        [mobile_id]
      );

      if (proveri_jedinstvenost.rows[0].exists) {
        res.json("Greška, student je već evidentiran s ovim ID-em!");
      } else {
        const student = await pool.query(
          "SELECT student_id FROM student WHERE student.mat_broj = $1",
          [mat_broj]
        );
        const student_id = student.rows[0].student_id;

        const nastava = await pool.query(
          "SELECT nastava.nastava_id FROM nastava JOIN predaje ON nastava.nastava_id = predaje.nastava_id JOIN predavanje ON predavanje.predaje_id = predaje.predaje_id WHERE predavanje_id = $1",
          [predavanje_id]
        );

        const nastava_id = nastava.rows[0].nastava_id;
        await pool.query(
          "INSERT INTO prisutan VALUES ($1, $2, $3, $4, 'true')",
          [student_id, predavanje_id, nastava_id, mobile_id]
        );

        res.json("Student je uspješno evidentiran");
      }
    } else {
      res.json("Greška, student nije spojen na mrežu predavaonice!");
    }
  } catch {
    console.error(err.message);
  }
});

// Ukloni studentu evidenciju prisutnosti
app.put("/ukloni_prisutnost", async (req, res) => {
  try {
    const { mat_broj, predavanje_id } = req.body;

    const student = await pool.query(
      "SELECT student_id FROM student WHERE student.mat_broj = $1",
      [mat_broj]
    );
    const student_id = student.rows[0].student_id;

    await pool.query(
      "UPDATE prisutan SET prisutan = 'false' WHERE student_id = $1 AND predavanje_id = $2",
      [student_id, predavanje_id]
    );

    res.json("Pristnost uklonjena!");
  } catch {
    console.error(err.message);
  }
});

// Dohvati statistiku prisutnosti studenta
app.get("/statistika_prisutnosti/:mat_broj/:predmet_id", async (req, res) => {
  try {
    const mat_broj = req.params.mat_broj;
    const predmet_id = req.params.predmet_id;

    const student = await pool.query(
      "SELECT student_id FROM student WHERE mat_broj = $1",
      [mat_broj]
    );
    const student_id = student.rows[0].student_id;

    const tipovi = await pool.query(
      "SELECT nastava.naziv AS nastava FROM nastava JOIN predmet ON predmet.predmet_id = nastava.predmet_id WHERE predmet.predmet_id = $1",
      [predmet_id]
    );

    const tip = tipovi.rows.map((x) => x.nastava);
    let allData = [];

    for (i = 0; i < tip.length; i++) {
      const termin = await pool.query(
        "SELECT broj_termina FROM nastava WHERE naziv = $1",
        [tip[i]]
      );

      const student_prisutan = await pool.query(
        "SELECT COUNT(prisutan.prisutan) FROM prisutan JOIN student ON student.student_id = prisutan.student_id JOIN nastava ON nastava.nastava_id = prisutan.nastava_id WHERE student.student_id = $1 AND prisutan.prisutan = 't' AND nastava.naziv = $2 GROUP BY nastava.naziv",
        [student_id, tip[i]]
      );

      if (student_prisutan.rows.length == 0) {
        let data = {
          nastava: tip[i],
          broj_termina: termin.rows[0].broj_termina,
          student_prisutan: 0,
        };
        allData.push(data);
      } else {
        let data = {
          nastava: tip[i],
          broj_termina: termin.rows[0].broj_termina,
          student_prisutan: student_prisutan.rows[0].count,
        };
        allData.push(data);
      }
    }

    res.json(allData);
  } catch {
    console.error(err.message);
  }
});

// Dohvati sve studente prisutne na predavanju
app.get("/prisutni_studenti/:predavanje_id", async (req, res) => {
  try {
    const predavanje_id = req.params.predavanje_id;

    const studenti = await pool.query(
      "SELECT student.ime, student.prezime, student.mat_broj FROM student JOIN prisutan ON student.student_id = prisutan.student_id JOIN predavanje ON predavanje.predavanje_id = prisutan.predavanje_id WHERE predavanje.predavanje_id = $1 AND prisutan.prisutan = 't'",
      [predavanje_id]
    );

    res.json(studenti.rows);
  } catch {
    console.error(err.message);
  }
});

// Dohvati sve tipove nastave predmeta
app.get("/tip_nastave/:predmet_id", async (req, res) => {
  try {
    const predmet_id = req.params.predmet_id;

    const nastava = await pool.query(
      "SELECT nastava.naziv FROM nastava JOIN predmet ON predmet.predmet_id = nastava.predmet_id WHERE predmet.predmet_id = $1",
      [predmet_id]
    );

    res.json(nastava.rows);
  } catch {
    console.error(err.message);
  }
});

// Dohvati sva održana predavanja profesora
app.get("/odrzana_nastava/:mat_broj", async (req, res) => {
  try {
    const mat_broj = req.params.mat_broj;

    const nastava = await pool.query(
      "SELECT predavanje.predavanje_id, predmet.naziv, nastava.naziv AS nastava, predavanje.datum FROM predmet JOIN nastava ON nastava.predmet_id = predmet.predmet_id JOIN predaje ON predaje.nastava_id = nastava.nastava_id JOIN profesor ON profesor.profesor_id = predaje.profesor_id JOIN predavanje ON predavanje.predaje_id = predaje.predaje_id WHERE profesor.mat_broj = $1",
      [mat_broj]
    );

    res.json(nastava.rows);
  } catch {
    console.error(err.message);
  }
});
