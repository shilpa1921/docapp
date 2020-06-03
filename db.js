const spicedPg = require("spiced-pg");
const db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:postgres:postgres@localhost:5432/docapp"
);

module.exports.addDataToPat = (
    first_name,
    last_name,
    dob,
    personal_number,
    emailadd,
    pass,
    pat_insurence
) => {
    return db.query(
        `
    INSERT INTO patient_info (  first_name,
                    last_name,
                    dob,
                    personal_number,
                    email,
                    password,
                    has_insurence)
    VALUES($1, $2, $3, $4,$5,$6, $7) RETURNING id`,
        [
            first_name,
            last_name,
            dob,
            personal_number,
            emailadd,
            pass,
            pat_insurence,
        ]
    );
};
module.exports.getpass = (email) => {
    return db
        .query(`SELECT * FROM patient_info WHERE email = $1;`, [email])
        .then((results) => {
            console.log("result from getpass in db.js", results);
            return results;
        })
        .catch((err) => {
            console.log("errrrrrrr", err);
        });
};
module.exports.getpassdoc = (email) => {
    return db
        .query(`SELECT * FROM doctor_info WHERE email_id = $1;`, [email])
        .then((results) => {
            console.log("result from getpass in db.js", results);
            return results;
        })
        .catch((err) => {
            console.log("errrrrrrr", err);
        });
};

module.exports.addDataToDoctorinfo = (
    first_name,
    last_name,
    emailadd,
    password
) => {
    return db.query(
        `
    INSERT INTO doctor_info (first_name, last_name, email_id, password)
    VALUES($1, $2, $3, $4) RETURNING id`,
        [first_name, last_name, emailadd, password]
    );
};

module.exports.addDataToAppHistroy = (pat_id, doc_id, appDate, appTime) => {
    return db.query(
        `
    INSERT INTO appointment_history (patient_id, doctor_id, app_date, app_timeslot)
    VALUES($1, $2, $3, $4) RETURNING id`,
        [pat_id, doc_id, appDate, appTime]
    );
};
module.exports.addDocAddress = (
    userId,
    street,
    house_no,
    city,
    state,
    country,
    zip_code,
    lat,
    lng
) => {
    return db.query(
        `
    INSERT INTO doctor_address (Doctor_id, street, house_no, city, state, country, pincode, latitude, longitude)
    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id`,
        [userId, street, house_no, city, state, country, zip_code, lat, lng]
    );
};

module.exports.addInfoToAvailbilityDoctor = (
    userId,

    sat_day,
    sun_day,
    from,
    to
) => {
    return db.query(
        `
    INSERT INTO doctor_availability (Doctor_id, availability_saturday, availability_sunday, visiting_hours_from, visiting_hours_to)
    VALUES($1, $2, $3, $4, $5) RETURNING id`,
        [userId, sat_day, sun_day, from, to]
    );
};

module.exports.getDoctorinfo = (id) => {
    return db.query(`SELECT * FROM doctor_info WHERE id = $1;`, [id]);
};
module.exports.getSpecializationList = () => {
    return db.query(`SELECT * FROM specialization ;`);
};
module.exports.saveProfilePic = (user_id, url) => {
    return db.query(
        `UPDATE doctor_info
        SET pic_url = $2
        WHERE id=$1 RETURNING *`,
        [user_id, url]
    );
};

module.exports.updateDocInfo = (
    userId,
    qualification,
    category_id,
    dob,
    office_number,
    personal_number,
    spoken_lang,
    website_link,
    insurence
) => {
    return db.query(
        `UPDATE doctor_info
        SET qualification = $2, specialization_id = $3, dob = $4, office_number = $5, personal_number = $6, languages = $7,  website_link = $8, accept_public_insurence = $9
        WHERE id=$1 RETURNING *`,
        [
            userId,
            qualification,
            category_id,
            dob,
            office_number,
            personal_number,
            spoken_lang,
            website_link,
            insurence,
        ]
    );
};

module.exports.saveProfilePic = (user_id, url) => {
    return db.query(
        `UPDATE doctor_info
        SET pic_url = $2
        WHERE id=$1 RETURNING *`,
        [user_id, url]
    );
};

module.exports.getMatchingDoctors = (val, lat, lng) => {
    return db.query(
        `  SELECT doctor_info.*, doctor_address.*, specialization.specialization_name, ROUND(CAST(SQRT(
    POW(69.1 * (latitude - $2), 2) +
    POW(69.1 * ($3 - longitude) * COS(latitude / 57.3), 2)) as numeric), 2) AS distance 
FROM 
doctor_info INNER JOIN doctor_address ON doctor_info.id = doctor_address.doctor_id 
INNER JOIN specialization ON doctor_info.specialization_id = specialization.id
 WHERE doctor_info.first_name ILIKE $1 OR doctor_info.last_name ILIKE $1;`,
        [val + "%", lat, lng]
    );
};

module.exports.searchByCategory = (category_id) => {
    return db
        .query(
            `SELECT doctor_info.*, doctor_address.*, specialization.specialization_name 
            FROM doctor_info 
            INNER JOIN doctor_address 
            ON doctor_info.id = doctor_address.doctor_id 
            INNER JOIN specialization 
            ON doctor_info.specialization_id = specialization.id 
            WHERE specialization.id = $1 ;`,
            [category_id]
        )
        .then((results) => {
            console.log("result from getpass in db.js", results);
            return results;
        })
        .catch((err) => {
            console.log("errrrrrrr in category", err);
        });
};

// module.exports.allDoctors = () => {
//     return db.query(
//         `SELECT doctor_info.*, doctor_address.*, specialization.specialization_name FROM doctor_info INNER JOIN doctor_address ON doctor_info.id = doctor_address.doctor_id INNER JOIN specialization ON doctor_info.specialization_id = specialization.id ORDER BY doctor_info.id DESC LIMIT 3 `
//     );
// };

module.exports.allDoctors = (lat, lng) => {
    return db.query(
        `
        SELECT doctor_info.*, doctor_address.*, specialization.specialization_name, ROUND(CAST(SQRT(
    POW(69.1 * (latitude - $1), 2) +
    POW(69.1 * ($2 - longitude) * COS(latitude / 57.3), 2)) as numeric), 2) AS distance 
FROM 
doctor_info INNER JOIN doctor_address ON doctor_info.id = doctor_address.doctor_id 
INNER JOIN specialization ON doctor_info.specialization_id = specialization.id
ORDER BY distance
        `,
        [lat, lng]
    );
};

module.exports.getDoctorinfo = (id) => {
    return db.query(`SELECT * FROM doctor_info WHERE id = $1;`, [id]);
};

module.exports.getDoctor = (id) => {
    return db.query(
        `SELECT doctor_info.*, doctor_address.*, specialization.specialization_name FROM doctor_info INNER JOIN doctor_address ON doctor_info.id = doctor_address.doctor_id INNER JOIN specialization ON doctor_info.specialization_id = specialization.id WHERE doctor_info.id = $1;`,
        [id]
    );
};

module.exports.addCode = (email, code) => {
    return db.query(
        `INSERT INTO reset_codes (email, code) VALUES ($1, $2) RETURNING email;`,
        [email, code]
    );
};
module.exports.addCodeDoc = (email, code) => {
    return db.query(
        `INSERT INTO reset_codes_doc (email, code) VALUES ($1, $2) RETURNING email;`,
        [email, code]
    );
};

module.exports.checkCode = (email) => {
    return db.query(
        `SELECT * FROM reset_codes WHERE (CURRENT_TIMESTAMP - created_at < INTERVAL '10 minutes') AND (email = $1) ORDER BY id DESC LIMIT 1;`,
        [email]
    );
};
module.exports.checkCodeDoc = (email) => {
    return db.query(
        `SELECT * FROM reset_codes_doc WHERE (CURRENT_TIMESTAMP - created_at < INTERVAL '10 minutes') AND (email = $1) ORDER BY id DESC LIMIT 1;`,
        [email]
    );
};
module.exports.updatePassword = (email, password) => {
    return db.query(`UPDATE users SET password = $2 WHERE email = $1;`, [
        email,
        password,
    ]);
};
module.exports.updatePasswordDoc = (email, password) => {
    return db.query(
        `UPDATE doctor_info SET password = $2 WHERE email_id = $1;`,
        [email, password]
    );
};

module.exports.getTimeSlot = (doctor_id, selectedDate) => {
    return db.query(
        `SELECT app_timeslot FROM appointment_history WHERE app_date = $2 AND doctor_id = $1`,
        [doctor_id, selectedDate]
    );
};

module.exports.getMorePost = (id) => {
    return db.query(
        `SELECT doctor_info.*, doctor_address.*, specialization.specialization_name, (
            SELECT id FROM doctor_info ORDER BY id ASC LIMIT 1
        ) AS lowest_id FROM doctor_info INNER JOIN doctor_address ON doctor_info.id = doctor_address.doctor_id INNER JOIN specialization ON doctor_info.specialization_id = specialization.id WHERE doctor_info.id < $1 ORDER BY doctor_info.id DESC LIMIT 3;`,
        [id]
    );
};

module.exports.getDoctorWorkingHours = (doctor_id) => {
    return db.query(
        ` SELECT visiting_hours_from, visiting_hours_to FROM doctor_availability where doctor_id = $1`,
        [doctor_id]
    );
};

module.exports.getEmailId = (pat_id) => {
    return db.query(`SELECT * FROM patient_info WHERE id = $1;`, [pat_id]);
};

module.exports.getInfoDocForMail = (doc_id) => {
    return db.query(
        `SELECT first_name , last_name FROM doctor_info WHERE id = $1;`,
        [doc_id]
    );
};
